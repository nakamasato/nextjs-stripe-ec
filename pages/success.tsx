import Head from 'next/head'
import { Container } from 'react-bootstrap'
import Link from 'next/link'

export default function Success() {
  return (
    <main>
      <Head>
        <title>決済完了 - EC Site</title>
        <meta name="description" content="決済が完了しました" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container className="text-center py-5">
        <h1 className="text-success mb-4">決済完了</h1>
        <p className="lead">ご注文ありがとうございます。</p>
        <p>決済が正常に完了いたしました。</p>
        <Link href="/" className="btn btn-primary">トップページに戻る</Link>
      </Container>
    </main>
  )
}