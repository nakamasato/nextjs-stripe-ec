import { PricingTable } from '@clerk/nextjs';
import { Container } from '@/components/ui/container';

export default function PricingPage() {
  return (
    <Container className="py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Select the perfect plan for your team. All plans include a 14-day free trial.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <PricingTable />
      </div>

      <div className="mt-16 text-center">
        <p className="text-muted-foreground mb-4">
          All plans include a 14-day free trial. No credit card required.
        </p>
        <p className="text-sm text-muted-foreground">
          Need a custom plan?{' '}
          <a href="mailto:sales@example.com" className="text-primary hover:underline">
            Contact our sales team
          </a>
        </p>
      </div>
    </Container>
  );
}