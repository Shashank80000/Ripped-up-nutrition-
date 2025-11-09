import React from 'react'
import formatINR from '../utils/formatCurrency'

export default function ProductDetail({ product, onBack, onAdd }) {
  if (!product) return <p>Product not found.</p>
  return (
    <section className="product-detail">
      <button onClick={onBack} className="back">← Back to products</button>
      <div className="detail-grid">
        <img src={product.image} alt={product.name} />
        <div>
          <h2>{product.name}</h2>
          <p className="price">{formatINR(product.price)}</p>
          <p className="desc">{product.description}</p>
          <div className="detail-actions">
            <button className="primary" onClick={() => onAdd(product.id)}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
