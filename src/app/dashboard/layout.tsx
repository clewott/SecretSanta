import Link from 'next/link';

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <nav className="flex justify-between items-center">
        <Link href="/">Home</Link>
        <Link href="/addevent">Add Event</Link>
      </nav>
      <section>{children}</section>
    </div>
  );
}