import React from 'react'
import ProductCard from './ProductCard'

export default function ProductList({ products, onView, onAdd }) {
  return (
    <section className="product-list">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onView={onView} onAdd={onAdd} />
      ))}
    </section>
  )
}
