'use client'
import { useUser } from '@clerk/nextjs';
import { Container } from '@/components/ui/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AccountPage() {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <Container className="py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
        
        <div className="space-y-6">
          {/* Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your account profile information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user.primaryEmailAddress?.emailAddress}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{user.fullName || 'Not set'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Billing Section */}
          <Card>
            <CardHeader>
              <CardTitle>Billing & Subscription</CardTitle>
              <CardDescription>Manage your subscription and billing information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* @ts-expect-error - Clerk Web Component */}
            <clerk-billing-portal />
                <div className="pt-4">
                  <Button 
                    variant="outline"
                    onClick={() => window.location.href = '/pricing'}
                  >
                    View Available Plans
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}