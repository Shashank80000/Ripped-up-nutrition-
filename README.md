# Ripped Up Nutrition — demo storefront

This small demo is a single-page supplement product site built with Vite + React. It includes:

- Product listing
- Product details
- Cart with quantity controls (client-only, demo checkout)

Quick start

1. Install dependencies

```powershell
npm install
```

2. Start dev server

```powershell
npm run dev
```

The site is a lightweight SPA and doesn't include a backend — cart and checkout are client-only for demo purposes.

Files added/updated

- `src/components/*` — React components (Header, Footer, ProductList, ProductCard, ProductDetail, Cart)
- `src/data/products.js` — sample product data
- `src/assets/*.svg` — simple product SVGs
- `src/App.jsx`, `src/App.css`, `src/index.css` — main app and styling

Next steps (suggestions)

- Add real product images and backend or Stripe checkout
- Add persistent cart (localStorage) and form validation for checkout
