import React from 'react'

export default function Header({ onNavigate, cartCount, theme, onToggleTheme }) {
  return (
    <header className="site-header">
      <div className="brand" onClick={() => onNavigate('home')}>
        <h1>Ripped Up Nutrition</h1>
        <small>Your training partner</small>
      </div>
      <nav className="nav">
        <button onClick={() => onNavigate('home')}>Home</button>
        <button onClick={() => onNavigate('products')}>Products</button>
        <button onClick={() => onNavigate('cart')}>Cart ({cartCount})</button>
        <button
          aria-pressed={theme === 'dark'}
          title="Toggle theme"
          onClick={onToggleTheme}
          style={{marginLeft:12}}
        >
          {theme === 'light' ? '🌞 Light' : '🌙 Dark'}
        </button>
      </nav>
    </header>
  )
}
