import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';
import '@/lib/firebase';

async function requireAuth(request: Request) {
  const authHeader = request.headers.get('authorization') || '';
  if (!authHeader.startsWith('Bearer ')) throw new Error('Unauthorized');
  const token = authHeader.split(' ')[1];
  await getAdminAuth().verifyIdToken(token);
}

export async function GET(_: Request, { params }: { params: { eventId: string } }) {
  try {
    await requireAuth(_ as Request);
    const ref = db.collection('events').doc(params.eventId);
    const doc = await ref.get();
    if (!doc.exists) return NextResponse.json(null, { status: 404 });
    const data = doc.data()!;
    const parts = await ref.collection('participants').get();
    const participants = parts.docs.map(d => ({ id: d.id, ...d.data() }));
    return NextResponse.json({ id: doc.id, ...data, participants });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: Request, { params }: { params: { eventId: string } }) {
  try {
    await requireAuth(request);
    const { name, email } = await request.json();
    const participant = { name, email, createdAt: new Date() };
    const ref = await db.collection('events').doc(params.eventId).collection('participants').add(participant);
    return NextResponse.json({ id: ref.id, ...participant });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function DELETE(_: Request, { params }: { params: { eventId: string } }) {
  try {
    await requireAuth(_ as Request);
    const eventRef = db.collection('events').doc(params.eventId);
    const parts = await eventRef.collection('participants').get();
    const batch = db.batch();
    parts.docs.forEach(d => batch.delete(d.ref));
    batch.delete(eventRef);
    await batch.commit();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}