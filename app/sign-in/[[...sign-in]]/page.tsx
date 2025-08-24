import { SignIn } from "@clerk/nextjs";
import { Container } from '@/components/ui/container';

export default function SignInPage() {
  return (
    <Container className="flex justify-center items-center min-h-[80vh]">
      <SignIn />
    </Container>
  );
}