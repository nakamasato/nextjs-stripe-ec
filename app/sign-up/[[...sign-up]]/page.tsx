import { SignUp } from "@clerk/nextjs";
import { Container } from '@/components/ui/container';

export default function SignUpPage() {
  return (
    <Container className="flex justify-center items-center min-h-[80vh]">
      <SignUp />
    </Container>
  );
}