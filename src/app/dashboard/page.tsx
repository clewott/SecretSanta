'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthProvider';

interface EventSummary {
  id: string;
  name: string;
  date?: { seconds: number };
}

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [events, setEvents] = useState<EventSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user === null) return; // still initializing
    if (!user) {
      router.push('/login');
      return;
    }

    async function loadMyEvents() {
      const token = await user.getIdToken();
      const authHeader = { Authorization: `Bearer ${token}` };

      // Fetch all events, then filter by participation
      const resAll = await fetch('/api/events', { headers: authHeader });
      if (!resAll.ok) {
        setLoading(false);
        return;
      }
      const allEvents: EventSummary[] = await resAll.json();
      const myEvents: EventSummary[] = [];

      for (const ev of allEvents) {
        const resEv = await fetch(`/api/events/${ev.id}`, { headers: authHeader });
        if (resEv.ok) {
          const detail = await resEv.json();
          const participants: { email: string }[] = detail.participants || [];
          if (participants.some(p => p.email === user.email)) {
            myEvents.push(ev);
          }
        }
      }

      setEvents(myEvents);
      setLoading(false);
    }

    loadMyEvents();
  }, [user, router]);

  if (loading) return <div className="p-4">Loading your events...</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link href="/addevent">
          <button className="px-4 py-2 bg-green-600 text-white rounded">Add Event</button>
        </Link>
      </div>

      {events.length === 0 ? (
        <p>You’re not a participant in any events yet.</p>
      ) : (
        <ul className="space-y-4">
          {events.map(ev => (
            <li
              key={ev.id}
              className="p-4 bg-white rounded shadow flex justify-between items-center"
            >
              <Link href={`/dashboard/${ev.id}`} className="font-medium">
                {ev.name}
              </Link>
              {ev.date && (
                <span>
                  {new Date(ev.date.seconds * 1000).toLocaleDateString()}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}