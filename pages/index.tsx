import Head from 'next/head'
import { Button, Col, Container, Image, Row, Stack } from "react-bootstrap"
import { loadStripe } from '@stripe/stripe-js'
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs'

export async function getStaticProps() {
  const products = await fetch('http://localhost:3000/api/products')
    .then(response => response.json())
  return {
    props: {
      products
    },
    revalidate: 1 * 60
  }
}

export default function Home({ products }) {
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
        <div className="hero-section">
          <Container className="h-100 d-flex align-items-center justify-content-center">
            <div className="text-center">
              <h1 className="hero-title mb-4">Hello EC</h1>
              <p className="hero-subtitle mb-5">プレミアム商品をお得にお買い物</p>
              <div className="hero-buttons">
                <SignUpButton mode="modal">
                  <Button variant="primary" size="lg" className="me-3 px-5 py-3">
                    新規登録
                  </Button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <Button variant="outline-primary" size="lg" className="px-5 py-3">
                    ログイン
                  </Button>
                </SignInButton>
              </div>
              <div className="hero-features mt-5">
                <Row className="g-4">
                  <Col md={4}>
                    <div className="feature-item">
                      <h5>🔒 安全な決済</h5>
                      <p>Stripeによる安全な決済システム</p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="feature-item">
                      <h5>🚀 即座にお届け</h5>
                      <p>迅速で確実な配送サービス</p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="feature-item">
                      <h5>⭐ プレミアム品質</h5>
                      <p>厳選された高品質な商品</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Container>
        </div>
      </SignedOut>

      <SignedIn>
        <Container>
          <div className="my-4">
            <h2 className="mb-4">商品一覧</h2>
            <Stack gap={3}>
              {products.map(product => {
                return (
                  <Row key={product.id} className="product-item p-3 border rounded">
                    <Col xs={4}>
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        style={{ maxWidth: '100%' }}
                        className="rounded"
                      />
                    </Col>
                    <Col>
                      <Stack gap={3}>
                        <h3>{product.name}</h3>
                        <p className="text-muted">{product.description}</p>
                      </Stack>
                      <Stack direction="horizontal">
                        {product.prices.map(price => {
                          return (
                            <dl key={price.id}>
                              <dt>価格</dt>
                              <dd>
                                <span className="h5 text-primary">
                                  {price.unit_amount.toLocaleString()} {price.currency.toLocaleUpperCase()}
                                </span>
                                {price.transform_quantity ? <small className="text-muted">({price.transform_quantity.divide_by}アイテム毎)</small> : null}
                              </dd>
                              <dd>
                                <Button 
                                  variant="success" 
                                  size="lg" 
                                  onClick={() => handleCheckout(price.id)}
                                  className="px-4"
                                >
                                  いますぐ注文する
                                </Button>
                              </dd>
                            </dl>
                          )
                        })}
                      </Stack>
                    </Col>
                  </Row>
                )
              })}
            </Stack>
          </div>
        </Container>
      </SignedIn>

      <style jsx>{`
        .hero-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 85vh;
          color: white;
        }
        .hero-title {
          font-size: 4rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        .hero-subtitle {
          font-size: 1.5rem;
          opacity: 0.9;
        }
        .hero-buttons {
          margin: 2rem 0;
        }
        .feature-item {
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          backdrop-filter: blur(10px);
        }
        .feature-item h5 {
          margin-bottom: 0.5rem;
        }
        .feature-item p {
          margin: 0;
          opacity: 0.9;
        }
        .product-item {
          transition: all 0.3s ease;
          background: #f8f9fa;
        }
        .product-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
      `}</style>
    </main>
  )
}
