import "@/styles/globals.css";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Navbar, NavbarContent, NavbarBrand, NavbarNav } from '@/components/ui/navbar';
import { ClerkProvider, SignedIn, UserButton } from '@clerk/nextjs';
import { ChatSupport } from '@/components/ChatSupport';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hello EC',
  description: 'Demo EC site with Stripe',
}

function NavBar() {
  return (
    <Navbar className="bg-slate-900 text-white">
      <Container>
        <NavbarContent>
          <NavbarBrand>
            <Link href="/" className="text-xl font-bold text-white hover:text-gray-200">
              Hello EC
            </Link>
          </NavbarBrand>
          <NavbarNav>
            <Link href="/" className="text-white hover:text-gray-200 transition-colors">
              Products
            </Link>
            <Link href="/pricing" className="text-white hover:text-gray-200 transition-colors">
              Pricing
            </Link>
            <SignedIn>
              <Link href="/monitoring" className="text-white hover:text-gray-200 transition-colors">
                Monitoring
              </Link>
              <Link href="/account" className="text-white hover:text-gray-200 transition-colors">
                Account
              </Link>
              <UserButton 
                afterSignOutUrl="/" 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10"
                  }
                }}
              />
            </SignedIn>
          </NavbarNav>
        </NavbarContent>
      </Container>
    </Navbar>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ClerkProvider>
          <NavBar />
          {children}
          <SignedIn>
            <ChatSupport />
          </SignedIn>
        </ClerkProvider>
      </body>
    </html>
  );
}