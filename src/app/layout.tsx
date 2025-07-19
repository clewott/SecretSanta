import { AuthProvider } from '@/contexts/AuthProvider';
import AuthStatus from '@/components/AuthStatus';
// import Image from 'next/image';

export const metadata = {
  title: 'Secret Santa',
  description: 'Manage Secret Santa events and participants',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 font-sans">
        <AuthProvider>
          <header className="bg-white shadow p-4 flex justify-between items-center">
            {/* <Image src="https://fakeimage.png" alt="Secret Santa Logo" width={50} height={50} /> */}
            <AuthStatus />
          </header>
          <main className="p-6">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}