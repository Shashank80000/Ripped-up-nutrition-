import React from 'react'
import formatINR from '../utils/formatCurrency'

function Stars({ value }) {
  const full = Math.floor(value || 0)
  const half = (value - full) >= 0.5
  return (
    <div className="stars" aria-hidden>
      {Array.from({length:full}).map((_,i)=>(<span key={i}>★</span>))}
      {half && <span>☆</span>}
      {Array.from({length: Math.max(0,5-full-(half?1:0))}).map((_,i)=>(<span key={i+full}>☆</span>))}
    </div>
  )
}

export default function ProductCard({ product, onView, onAdd }) {
  return (
    <div className="product-card">
      <div className="media">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.onSale && <div className="badge">Sale</div>}
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <div className="meta">
          <Stars value={product.rating} />
          <small className="reviews">({product.reviews})</small>
        </div>
        <p className="short">{product.short}</p>
        <div className="price-row">
          {product.onSale ? (
            <>
              <span className="sale">{formatINR(product.salePrice)}</span>
              <span className="orig">{formatINR(product.price)}</span>
            </>
          ) : (
            <span className="price">{formatINR(product.price)}</span>
          )}
        </div>
        <div className="actions">
          <button onClick={() => onView(product.id)}>View</button>
          <button className="primary" onClick={() => onAdd(product.id)}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}
