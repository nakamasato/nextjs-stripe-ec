import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from "next/app";
import { Container, Navbar, Nav } from 'react-bootstrap';
import { ClerkProvider, SignedIn, UserButton } from '@clerk/nextjs';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <SignedIn>
        <Navbar bg="dark" variant="dark" className="navbar-custom">
          <Container>
            <Navbar.Brand href="/" className="brand-custom">
              <strong>Hello EC</strong>
            </Navbar.Brand>
            <Nav className="ms-auto">
              <div className="d-flex align-items-center">
                <UserButton 
                  afterSignOutUrl="/" 
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10"
                    }
                  }}
                />
              </div>
            </Nav>
          </Container>
        </Navbar>
      </SignedIn>
      
      <Component {...pageProps} />
      
      <style jsx global>{`
        .navbar-custom {
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          background: linear-gradient(90deg, #343a40 0%, #495057 100%) !important;
        }
        .brand-custom {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff !important;
          text-decoration: none;
        }
        .brand-custom:hover {
          color: #f8f9fa !important;
        }
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </ClerkProvider>
  );
}
