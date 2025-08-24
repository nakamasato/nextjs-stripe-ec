import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '決済完了 - EC Site',
  description: '決済が完了しました',
}

export default function Success() {
  return (
    <main>
      <Container className="py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <CardTitle className="text-2xl text-green-600">決済完了</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-lg font-medium">ご注文ありがとうございます。</p>
              <p className="text-muted-foreground">決済が正常に完了いたしました。</p>
              <Link href="/">
                <Button className="w-full mt-6">トップページに戻る</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </Container>
    </main>
  )
}