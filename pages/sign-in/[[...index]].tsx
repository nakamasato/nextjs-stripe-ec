import { SignIn } from "@clerk/nextjs";
import { Container } from 'react-bootstrap';

export default function SignInPage() {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <SignIn />
    </Container>
  );
}