import React, { useState } from 'react'
import formatINR from '../utils/formatCurrency'

export default function Checkout({ items, products, onPlaceOrder }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [paymentMethod] = useState('cod') // only Cash on Delivery supported in demo

  const lines = items.map(it => {
    const p = products.find(x=>x.id===it.id)
    return { ...it, product: p, subtotal: p ? p.price * it.qty : 0 }
  })
  const total = lines.reduce((s,l)=>s+l.subtotal,0)

  function place(e) {
    e.preventDefault()
    if (!name || !email || !address) return alert('Please fill name, email and address')
    onPlaceOrder({ name, email, address, lines, total, paymentMethod })
  }

  return (
    <section className="checkout">
      <h2>Checkout</h2>
      {lines.length===0 && <p>Your cart is empty.</p>}
      {lines.length>0 && (
        <div className="checkout-grid">
          <form className="checkout-form" onSubmit={place}>
            <label>
              Full name
              <input value={name} onChange={e=>setName(e.target.value)} />
            </label>
            <label>
              Email
              <input value={email} onChange={e=>setEmail(e.target.value)} />
            </label>
            <label>
              Shipping address
              <textarea value={address} onChange={e=>setAddress(e.target.value)} />
            </label>
            <div style={{marginBottom:12}}>
              <label style={{display:'block',marginBottom:6}}>Payment method</label>
              <div style={{padding:'8px 12px',borderRadius:8,background:'rgba(0,0,0,0.03)'}}>Cash on Delivery (default)</div>
            </div>
            <button className="primary" type="submit">Place demo order — {formatINR(total)} (Cash on Delivery)</button>
          </form>

          <aside className="checkout-summary">
            <h3>Order summary</h3>
            {lines.map(l=> (
              <div key={l.id} className="summary-line">
                <img src={l.product.image} alt={l.product.name} />
                <div>
                  <div>{l.product.name} × {l.qty}</div>
                  <div>{formatINR(l.subtotal)}</div>
                </div>
              </div>
            ))}
            <div className="summary-total"><strong>Total: {formatINR(total)}</strong></div>
          </aside>
        </div>
      )}
    </section>
  )
}
