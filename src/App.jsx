import { useState, useEffect } from 'react'

export default function App() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: 'All',
    status: 'All',
    maxPrice: 50000,
    supplier: 'All'
  })

  useEffect(() => {
    fetch('/products_database.json')
      .then(r => r.json())
      .then(data => {
        setProducts(data.products)
        setFilteredProducts(data.products)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading products:', err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    let filtered = products

    if (filters.category !== 'All') {
      filtered = filtered.filter(p => p.category === filters.category)
    }

    if (filters.status !== 'All') {
      filtered = filtered.filter(p => p.inventory.status === filters.status)
    }

    if (filters.supplier !== 'All') {
      filtered = filtered.filter(p => p.supplier === filters.supplier)
    }

    filtered = filtered.filter(p => p.pricing.msrp <= filters.maxPrice)

    setFilteredProducts(filtered)
  }, [filters, products])

  const suppliers = [...new Set(products.map(p => p.supplier))]
  const categories = [...new Set(products.map(p => p.category))]

  const handleClearFilters = () => {
    setFilters({
      category: 'All',
      status: 'All',
      maxPrice: 50000,
      supplier: 'All'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900">B2B Wholesale Catalog</h1>
          <p className="text-gray-600 mt-2">Real-time inventory with pre-order capability</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All</option>
                <option value="in_stock">In Stock</option>
                <option value="pre_order">Pre-Order</option>
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Supplier Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Supplier</label>
              <select
                value={filters.supplier}
                onChange={(e) => setFilters({...filters, supplier: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All</option>
                {suppliers.map(sup => (
                  <option key={sup} value={sup}>{sup}</option>
                ))}
              </select>
            </div>

            {/* Clear Button */}
            <div className="flex items-end">
              <button
                onClick={handleClearFilters}
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-6 text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found matching your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
                {/* Image placeholder */}
                <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>

                {/* Stock Badge */}
                {product.inventory.status === 'in_stock' && (
                  <div className="absolute mt-2 ml-4 px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                    ✓ IN STOCK
                  </div>
                )}
                {product.inventory.status === 'pre_order' && (
                  <div className="absolute mt-2 ml-4 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                    📅 PRE-ORDER
                  </div>
                )}

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 line-clamp-2">{product.product_name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{product.supplier}</p>
                  
                  {/* Inventory Info */}
                  <div className="mt-3 text-sm">
                    {product.inventory.status === 'in_stock' && (
                      <p className="text-green-700 font-medium">
                        {product.inventory.total_available_now} in stock
                      </p>
                    )}
                    {product.inventory.status === 'pre_order' && (
                      <p className="text-blue-700 font-medium">
                        Pre-order available
                        <br />
                        ETA: {product.availability.estimated_available_date_display}
                      </p>
                    )}
                  </div>

                  {/* Pricing */}
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-900">
                      \${(product.pricing.msrp * 0.35).toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      \${product.pricing.msrp.toFixed(2)}
                    </span>
                    <span className="text-xs font-semibold text-green-700">65% OFF</span>
                  </div>

                  {/* Button */}
                  <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
