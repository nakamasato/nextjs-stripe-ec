import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Navbar, NavbarContent, NavbarBrand, NavbarNav } from '@/components/ui/navbar';
import { ClerkProvider, SignedIn, UserButton } from '@clerk/nextjs';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <SignedIn>
        <Navbar className="bg-slate-900 text-white">
          <Container>
            <NavbarContent>
              <NavbarBrand>
                <Link href="/" className="text-xl font-bold text-white hover:text-gray-200">
                  Hello EC
                </Link>
              </NavbarBrand>
              <NavbarNav>
                <UserButton 
                  afterSignOutUrl="/" 
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10"
                    }
                  }}
                />
              </NavbarNav>
            </NavbarContent>
          </Container>
        </Navbar>
      </SignedIn>
      
      <Component {...pageProps} />
      
    </ClerkProvider>
  );
}
