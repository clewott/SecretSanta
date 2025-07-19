import { notFound } from 'next/navigation';
import { db } from '@/lib/firebase';

export default async function EventPage({ params }: { params: { eventId: string } }) {
  const doc = await db.collection('events').doc(params.eventId).get();
  if (!doc.exists) notFound();

  const data = doc.data()!;
  return (
    <div className="space-y-2 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold">{data.name}</h2>
      <p>{data.description}</p>
      {data.date && <p>Date: {new Date(data.date.seconds * 1000).toLocaleDateString()}</p>}
    </div>
  );
}