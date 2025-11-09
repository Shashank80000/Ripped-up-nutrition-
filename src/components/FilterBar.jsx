import React from 'react'

export default function FilterBar({ categories, selected, onSelectCategory, search, onSearchChange, sort, onSortChange }) {
  return (
    <div className="filter-bar">
      <div className="search">
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products, e.g. whey, creatine"
          aria-label="Search products"
        />
      </div>

      <div className="categories">
        <button className={selected === null ? 'active' : ''} onClick={() => onSelectCategory(null)}>All</button>
        {categories.map((c) => (
          <button key={c} className={selected === c ? 'active' : ''} onClick={() => onSelectCategory(c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="sort">
        <select value={sort} onChange={(e) => onSortChange(e.target.value)} aria-label="Sort products">
          <option value="popular">Sort: Popular</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </select>
      </div>
    </div>
  )
}
