'use client'
import { useEffect, useState } from 'react'

interface Product {
    id: string;
    name: string;
    description: string;
    images: string[];
}

export default function HelloWorld() {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('/api/products')
                const data = await response.json()
                setProducts(data)
            } catch (e) {
                console.log(e)
                setProducts([])
            }
        }
        
        fetchProducts()
    }, [])

    return (
        <div>
            <h1>Hello World</h1>
            <pre><code>{JSON.stringify({ products }, null, 2)}</code></pre>
        </div>
    )
}