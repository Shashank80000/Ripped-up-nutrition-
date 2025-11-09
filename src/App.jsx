import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import Cart from './components/Cart'
import FilterBar from './components/FilterBar'
import Newsletter from './components/Newsletter'
import Checkout from './components/Checkout'
import productsData from './data/products'

function App() {
  // theme: 'light' (default) or 'dark'
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('site_theme') || 'light'
    } catch (e) {
      return 'light'
    }
  })

  // apply theme to document root and persist
  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('site_theme', theme)
    } catch (e) {}
  }, [theme])

  // simple client-side routing: page = 'home' | 'products' | 'product' | 'cart'
  const [page, setPage] = useState('home')
  const [routeParams, setRouteParams] = useState(null)
  const [cart, setCart] = useState([]) // {id, qty}
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState(null)
  const [sort, setSort] = useState('popular')
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 6

  function navigate(to, params = null) {
    setRouteParams(params)
    setPage(to)
    window.scrollTo(0, 0)
  }

  function addToCart(id, qty = 1) {
    setCart((c) => {
      const found = c.find((x) => x.id === id)
      if (found) return c.map((x) => (x.id === id ? { ...x, qty: x.qty + qty } : x))
      return [...c, { id, qty }]
    })
  }

  // persist cart to localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('rippedup_cart')
      if (raw) setCart(JSON.parse(raw))
    } catch (e) {
      // ignore
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('rippedup_cart', JSON.stringify(cart))
    } catch (e) {}
  }, [cart])

  function removeFromCart(id) {
    setCart((c) => c.filter((x) => x.id !== id))
  }

  function changeQty(id, qty) {
    setCart((c) => c.map((x) => (x.id === id ? { ...x, qty } : x)))
  }

  function currentProduct() {
    if (!routeParams || !routeParams.id) return null
    return productsData.find((p) => p.id === routeParams.id)
  }

  return (
    <div className="app">
      <Header
        onNavigate={navigate}
        cartCount={cart.reduce((s, i) => s + i.qty, 0)}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
      />
      {/* Hero (full-bleed) for home page */}
      {page === 'home' && (
        <section
          className="hero"
          style={{
            backgroundImage: "url('/assets/WhatsApp Image 2025-11-09 at 14.28.36_445bfb4a.jpg')",
          }}
        >
          <div className="container">
            <div>
              {/* hero content intentionally minimal; CTAs moved below the image */}
            </div>
          </div>
        </section>
      )}

      {/* CTA buttons placed below the hero image */}
      {page === 'home' && (
        <div className="hero-ctas">
          <div className="container">
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button className="primary" onClick={() => navigate('products')}>
                Shop Products
              </button>
              <button onClick={() => navigate('cart')}>View Cart</button>
            </div>
          </div>
        </div>
      )}

      <main className="container">
        {page === 'home' && (
          // All products shown on the home page under the hero for quick browsing
          <section style={{ marginTop: 20 }}>
            <h2>All Products</h2>
            <ProductList products={productsData} onView={(id) => navigate('product', { id })} onAdd={addToCart} />
          </section>
        )}

        {page === 'products' && (
          <>
            <h2>Products</h2>
            {/* Filter and search like an e-commerce site */}
            <div style={{marginBottom:12}}>
              <FilterBar
                categories={[...new Set(productsData.map(p=>p.category))]}
                selected={category}
                onSelectCategory={(c) => setCategory(c)}
                search={searchTerm}
                onSearchChange={(s) => setSearchTerm(s)}
                sort={sort}
                onSortChange={(s) => setSort(s)}
              />
            </div>
            {/* compute filtered + sorted list and paginate */}
            {(() => {
              let list = productsData.slice()
              if (category) list = list.filter(p => p.category === category)
              if (searchTerm) {
                const q = searchTerm.trim().toLowerCase()
                list = list.filter(p => (p.name + ' ' + p.short + ' ' + p.description).toLowerCase().includes(q))
              }
              if (sort === 'price-asc') list.sort((a,b)=>a.price-b.price)
              if (sort === 'price-desc') list.sort((a,b)=>b.price-a.price)

              const total = list.length
              const totalPages = Math.max(1, Math.ceil(total / perPage))
              const pageIndex = Math.min(Math.max(1, currentPage), totalPages)
              const start = (pageIndex - 1) * perPage
              const pageItems = list.slice(start, start + perPage)

              return (
                <>
                  <ProductList products={pageItems} onView={(id) => navigate('product', { id })} onAdd={addToCart} />
                  <div className="pagination">
                    <button onClick={() => setCurrentPage(1)} disabled={pageIndex===1}>⟨⟨</button>
                    <button onClick={() => setCurrentPage(p=>Math.max(1,p-1))} disabled={pageIndex===1}>⟨</button>
                    <span>Page {pageIndex} / {totalPages}</span>
                    <button onClick={() => setCurrentPage(p=>Math.min(totalPages,p+1))} disabled={pageIndex===totalPages}>⟩</button>
                    <button onClick={() => setCurrentPage(totalPages)} disabled={pageIndex===totalPages}>⟩⟩</button>
                  </div>
                </>
              )
            })()}
          </>
        )}

        {page === 'product' && (
          <ProductDetail product={currentProduct()} onBack={() => navigate('products')} onAdd={addToCart} />
        )}

        {page === 'cart' && (
          <Cart
            items={cart}
            products={productsData}
            onRemove={removeFromCart}
            onChangeQty={changeQty}
            onCheckout={() => navigate('checkout')}
          />
        )}

        {page === 'checkout' && (
          <Checkout
            items={cart}
            products={productsData}
            onPlaceOrder={() => {
              // clear cart and thank you
              setCart([])
              localStorage.removeItem('rippedup_cart')
              navigate('home')
              alert('Thanks! Your demo order has been placed (client-only).')
            }}
          />
        )}
      </main>

      <Newsletter />
      <Footer />
    </div>
  )
}

export default App
