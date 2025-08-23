import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Navbar, NavbarContent, NavbarBrand, NavbarNav } from '@/components/ui/navbar';
import { ClerkProvider, SignedIn, UserButton } from '@clerk/nextjs';
import { ChatSupport } from '@/components/ChatSupport';

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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <NavBar />
      <Component {...pageProps} />
      <SignedIn>
        <ChatSupport />
      </SignedIn>
    </ClerkProvider>
  );
}
