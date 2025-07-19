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

export async function GET(request: Request) {
  try {
    await requireAuth(request);
    const snap = await db.collection('events').get();
    const events = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    return NextResponse.json(events);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAuth(request);
    const { name, description, date } = await request.json();
    const created = { name, description, date: date || null, createdAt: new Date() };
    const ref = await db.collection('events').add(created);
    return NextResponse.json({ id: ref.id, ...created });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}