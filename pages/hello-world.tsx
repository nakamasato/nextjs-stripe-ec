import Head from "next/head"
export default function HelloWorld(props: any) {
    return (
        <div>
            <Head>
                <title>Hello World</title>
                <meta name="description" content="description for search engine" />
            </Head>
            <h1>Hello World</h1>
            <pre><code>{JSON.stringify(props, null, 2)}</code></pre>
        </div>
    )
}

export async function getServerSideProps(context: any) {
    try {
        const host = context.req.headers.host || 'localhost:3000'
        const protocol = /^localhost/.test(host) ? 'http' : 'https'
        const products = await fetch(`${protocol}://${host}/api/products`)
            .then(data => data.json())
        return {
            props: {
                products,
            }
        }
    } catch (e) {
        console.log(e)
        return {
            props: {
                products: [],
            }
        }
    }
}
