import { useState, useEffect } from 'react'

export default function App() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [imageMapping, setImageMapping] = useState({})
  const [loading, setLoading] = useState(true)
  const [wishlist, setWishlist] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [filters, setFilters] = useState({
    category: 'All',
    status: 'All',
    maxPrice: 50000,
    supplier: 'All'
  })

  useEffect(() => {
    // Load products database
    fetch('/products_database.json')
      .then(r => r.json())
      .then(data => {
        setProducts(data.products)
        setFilteredProducts(data.products)
      })
      .catch(err => console.error('Error loading products:', err))
    
    // Load image mapping
    fetch('/image_mapping.json')
      .then(r => r.json())
      .then(data => {
        setImageMapping(data.products_images || {})
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading image mapping:', err)
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

  const toggleWishlist = (productId) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const isInWishlist = (productId) => wishlist.includes(productId)

  const getProductImage = (supplierStyleId) => {
    const imagePath = imageMapping[supplierStyleId]
    if (imagePath) {
      return imagePath
    }
    return null
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
        <div className="max-w-7xl mx-auto px-4 py-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">B2B Wholesale Catalog</h1>
            <p className="text-gray-600 mt-2">Real-time inventory with pre-order capability</p>
          </div>
          <div className="text-right">
            <div className="text-2xl">❤️ {wishlist.length}</div>
            <p className="text-sm text-gray-600">Wishlist</p>
          </div>
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
            {filteredProducts.map(product => {
              const imageUrl = getProductImage(product.supplier_style_id)
              return (
                <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col h-full">
                  {/* Image Container with wishlist button */}
                  <div className="relative">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.product_name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-t-lg">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                    
                    {/* Wishlist Button - Top Right */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white shadow hover:bg-gray-50 transition"
                    >
                      <span className="text-2xl">
                        {isInWishlist(product.id) ? '❤️' : '🤍'}
                      </span>
                    </button>
                  </div>

                  {/* Stock Badge - Below image, full width */}
                  <div className="px-4 pt-3">
                    {product.inventory.status === 'in_stock' && (
                      <div className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                        ✓ IN STOCK
                      </div>
                    )}
                    {product.inventory.status === 'pre_order' && (
                      <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                        📅 PRE-ORDER
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">{product.product_name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{product.supplier}</p>
                    
                    {/* Inventory Info */}
                    <div className="mt-2 text-sm mb-4">
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
                    <div className="mt-auto mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">
                          \${(product.pricing.msrp * 0.35).toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          \${product.pricing.msrp.toFixed(2)}
                        </span>
                        <span className="text-xs font-semibold text-green-700">65% OFF</span>
                      </div>
                    </div>

                    {/* Button */}
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.product_name}</h2>
                <p className="text-gray-600 mt-1">{selectedProduct.supplier}</p>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-2xl text-gray-500 hover:text-gray-700 font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Specifications */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
                <div className="bg-gray-50 p-4 rounded space-y-2">
                  {selectedProduct.specifications.color && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Color:</span>
                      <span className="font-medium">{selectedProduct.specifications.color}</span>
                    </div>
                  )}
                  {selectedProduct.specifications.size && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Size:</span>
                      <span className="font-medium">{selectedProduct.specifications.size}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Supplier Style ID:</span>
                    <span className="font-medium">{selectedProduct.supplier_style_id}</span>
                  </div>
                </div>
              </div>

              {/* Inventory */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Inventory Status</h3>
                <div className="bg-gray-50 p-4 rounded space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Available:</span>
                    <span className="font-bold text-lg">{selectedProduct.inventory.total_all} units</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available Now:</span>
                    <span className="font-medium">{selectedProduct.inventory.total_available_now} units</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium capitalize">{selectedProduct.inventory.status.replace('_', ' ')}</span>
                  </div>
                  {selectedProduct.inventory.next_arrival && (
                    <div className="border-t pt-3">
                      <p className="text-sm text-gray-600">Next Arrival:</p>
                      <p className="font-medium">{selectedProduct.inventory.next_arrival.date_display}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Pricing Tiers */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Volume Pricing</h3>
                <div className="space-y-2">
                  {selectedProduct.pricing.tiers.map((tier, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                      <div>
                        <p className="font-medium text-gray-900">{tier.quantity_description}</p>
                        <p className="text-sm text-gray-600">{tier.discount_percent}% OFF</p>
                      </div>
                      <p className="text-xl font-bold text-gray-900">\${tier.wholesale_price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* MSRP Info */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">MSRP (Unit Retail):</span>
                  <span className="text-2xl font-bold text-gray-900">\${selectedProduct.pricing.msrp.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 p-6 border-t flex gap-3">
              <button
                onClick={() => setSelectedProduct(null)}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium"
              >
                Close
              </button>
              <button
                onClick={() => {
                  toggleWishlist(selectedProduct.id)
                }}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
              >
                {isInWishlist(selectedProduct.id) ? '❤️ Remove from Wishlist' : '🤍 Add to Wishlist'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
