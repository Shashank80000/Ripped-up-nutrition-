import React from 'react'
import formatINR from '../utils/formatCurrency'

export default function Cart({ items, products, onRemove, onChangeQty, onCheckout }) {
  const lines = items.map((it) => {
    const p = products.find((x) => x.id === it.id)
    return {
      ...it,
      product: p,
      lineTotal: p ? p.price * it.qty : 0,
    }
  })

  const total = lines.reduce((s, l) => s + l.lineTotal, 0)

  return (
    <section className="cart">
      <h2>Your Cart</h2>
      {lines.length === 0 && <p>Your cart is empty.</p>}
      {lines.map((l) => (
        <div className="cart-line" key={l.id}>
          <img src={l.product.image} alt={l.product.name} />
          <div className="info">
            <strong>{l.product.name}</strong>
            <p>{formatINR(l.product.price)} each</p>
            <div className="qty">
              <button onClick={() => onChangeQty(l.id, Math.max(1, l.qty - 1))}>−</button>
              <span>{l.qty}</span>
              <button onClick={() => onChangeQty(l.id, l.qty + 1)}>+</button>
            </div>
          </div>
          <div className="line-right">
            <p>{formatINR(l.lineTotal)}</p>
            <button className="remove" onClick={() => onRemove(l.id)}>Remove</button>
          </div>
        </div>
      ))}
      {lines.length > 0 && (
        <div className="cart-footer">
          <strong>Total: {formatINR(total)}</strong>
          <button className="primary" onClick={onCheckout}>Checkout</button>
        </div>
      )}
    </section>
  )
}
