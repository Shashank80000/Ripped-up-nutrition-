import React, { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function subscribe(e) {
    e.preventDefault()
  if (!email.includes('@')) return alert('Please enter a valid email')
  try { localStorage.setItem('rippedup_newsletter', email) } catch(e){}
    setSent(true)
  }

  return (
    <section className="newsletter">
      <div className="container">
        <h3>Join our newsletter</h3>
        <p>Get deals, training tips and product guides — straight to your inbox.</p>
        {!sent ? (
          <form onSubmit={subscribe} className="newsletter-form">
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" aria-label="Newsletter email" />
            <button className="primary" type="submit">Subscribe</button>
          </form>
        ) : (
          <p>Thanks — we'll keep you posted.</p>
        )}
      </div>
    </section>
  )
}
