'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/firebaseClient';

export default function ParticipantsPage({
  params,
}: {
  params: { eventId: string };
}) {
  const { eventId } = params;
  const [participants, setParticipants] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const token = await authClient.currentUser!.getIdToken();
      const res = await fetch(`/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      });
      const data = await res.json();
      setParticipants(data.participants || []);
    }
    load();
  }, [eventId]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const token = await authClient.currentUser!.getIdToken();
    await fetch(`/api/events/${eventId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, email }),
    });
    setName('');
    setEmail('');
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleAdd} className="bg-white p-6 rounded shadow space-y-2">
        <h3 className="font-medium">Add Participant</h3>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add
        </button>
      </form>
      <ul className="bg-white p-6 rounded shadow space-y-1">
        {participants.map(p => (
          <li key={p.id}>
            {p.name} &lt;{p.email}&gt;
          </li>
        ))}
      </ul>
    </div>
  );
}