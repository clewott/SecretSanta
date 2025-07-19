import Link from 'next/link';

export default function EventLayout({ children, params }: { children: React.ReactNode; params: { eventId: string } }) {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <nav className="flex justify-between">
        <Link href="/dashboard">← Back to Dashboard</Link>
        <Link href={`/dashboard/${params.eventId}/participants`}>Participants</Link>
      </nav>
      {children}
    </div>
  );
}