import { useAuth, Protect } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Container } from '@/components/ui/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, TrendingUp, Users, DollarSign, Lock } from 'lucide-react';

export default function MonitoringPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Mock monitoring data
  const metrics = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Active Users",
      value: "2,543",
      change: "+8.1%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "+0.5%",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Server Uptime",
      value: "99.9%",
      change: "Stable",
      icon: Activity,
      color: "text-orange-600"
    }
  ];

  return (
    <Container className="py-16">
      {/* Show upgrade prompt for users without monitoring feature */}
      <Protect
        condition={(has) => !has({ feature: 'monitoring' })}
        fallback={null}
      >
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-2 border-dashed">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Lock className="h-16 w-16 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl">Monitoring is a Premium Feature</CardTitle>
              <CardDescription className="text-lg mt-2">
                Upgrade to Pro or Max plan to access real-time monitoring and analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                size="lg" 
                onClick={() => router.push('/pricing')}
                className="w-full sm:w-auto"
              >
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </Protect>

      {/* Show monitoring dashboard for users with monitoring feature */}
      <Protect
        condition={(has) => has({ feature: 'monitoring' })}
        fallback={null}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Monitoring Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time monitoring and analytics for your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {metric.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${metric.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {metric.change} from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Your sales performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-muted rounded flex items-center justify-center">
                <p className="text-muted-foreground">Sales Chart Placeholder</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where your visitors come from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-muted rounded flex items-center justify-center">
                <p className="text-muted-foreground">Traffic Chart Placeholder</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest events in your system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4 p-3 bg-muted rounded">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm">System event placeholder {i}</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </Protect>
    </Container>
  );
}