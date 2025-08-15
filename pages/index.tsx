import Head from 'next/head'
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { loadStripe } from '@stripe/stripe-js'
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs'
import type { GetServerSideProps } from 'next'
import Image from 'next/image'

interface Price {
  id: string
  currency: string
  transform_quantity?: {
    divide_by: number
  }
  unit_amount: number
}

interface Product {
  id: string
  description: string
  name: string
  images: string[]
  unit_label?: string
  prices: Price[]
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const apiUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_API_URL
      : 'http://localhost:3000'
    
    if (!apiUrl) {
      throw new Error('NEXT_PUBLIC_API_URL environment variable is required in production')
    }
    
    const response = await fetch(`${apiUrl}/api/products`)
    const products = await response.json()
    
    return {
      props: {
        products: products || []
      }
    }
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return {
      props: {
        products: []
      }
    }
  }
}

export default function Home({ products }: { products: Product[] }) {
  const handleCheckout = async (priceId: string) => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_API_KEY!)
    if (!stripe) return
    
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId })
    })
    
    const { sessionId } = await response.json()
    await stripe.redirectToCheckout({ sessionId })
  }

  return (
    <main>
      <Head>
        <title>Hello EC - Premium Online Store</title>
        <meta name="description" content="Premium products with secure checkout" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SignedOut>
        <div className="min-h-[85vh] bg-background flex items-center justify-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-muted/20 via-background to-muted/10"></div>
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239333ea' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat'
            }}
          ></div>
          
          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-12">
              {/* Hero Section */}
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
                  <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Hello EC
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  プレミアム商品をお得にお買い物
                </p>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <SignUpButton mode="modal">
                  <Button size="lg" className="px-8 py-4 text-lg font-medium shadow-lg">
                    新規登録
                  </Button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-medium">
                    ログイン
                  </Button>
                </SignInButton>
              </div>
              
              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <CardTitle className="text-lg">安全な決済</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Stripeによる安全な決済システムで、お客様の情報を確実に保護します</p>
                  </CardContent>
                </Card>
                
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <CardTitle className="text-lg">即座にお届け</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">迅速で確実な配送サービスで、ご注文から最短でお届けします</p>
                  </CardContent>
                </Card>
                
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <CardTitle className="text-lg">プレミアム品質</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">厳選された高品質な商品のみを取り扱っています</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Container>
        </div>
      </SignedOut>

      <SignedIn>
        <Container className="py-8">
          <h2 className="text-3xl font-bold mb-8">商品一覧</h2>
          <div className="space-y-6">
            {products.map((product: Product) => {
              return (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-1">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={300}
                          height={200}
                          className="rounded-lg object-cover w-full h-48"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <div className="space-y-4">
                          <div>
                            <CardTitle className="text-2xl">{product.name}</CardTitle>
                            <CardDescription className="text-base mt-2">{product.description}</CardDescription>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-4">
                            {product.prices.map((price: Price) => {
                              return (
                                <div key={price.id} className="space-y-3">
                                  <div>
                                    <span className="text-sm font-medium text-muted-foreground">価格</span>
                                    <div className="text-2xl font-bold text-primary">
                                      {price.unit_amount.toLocaleString()} {price.currency.toUpperCase()}
                                      {price.transform_quantity && (
                                        <span className="text-sm text-muted-foreground ml-2">
                                          ({price.transform_quantity.divide_by}アイテム毎)
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <Button 
                                    size="lg" 
                                    onClick={() => handleCheckout(price.id)}
                                    className="w-full sm:w-auto"
                                  >
                                    いますぐ注文する
                                  </Button>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </SignedIn>

    </main>
  )
}
