import { SignUp } from "@clerk/nextjs";
import { Container } from 'react-bootstrap';

export default function SignUpPage() {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <SignUp />
    </Container>
  );
}