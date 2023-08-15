import Sidebar from '@/components/Sidebar';
import './globals.css';
import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import SupabaseProvider from '@/providers/SupabaseProvider';
import UserProvider from '@/providers/UserProvider';

const font = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Spotify Clone',
    description: 'Listen to music!',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={font.className}>
                <SupabaseProvider>
                    <UserProvider>
                        <Sidebar>{children}</Sidebar>
                    </UserProvider>
                </SupabaseProvider>
            </body>
        </html>
    );
}
