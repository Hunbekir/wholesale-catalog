import React, { useState, useMemo, useCallback } from 'react';
import { Heart, ShoppingCart, Download, Filter, X, ChevronDown, Calendar, DollarSign, Package, AlertCircle, Clock, TrendingUp } from 'lucide-react';

export default function AdvancedWholesaleCatalog() {
  // Sample data WITH REAL INVENTORY
  const [products] = useState([
    {
      id: "a1b2c3d4",
      supplier: "Mariner Home",
      supplier_style_id: "MH-ALK-201",
      product_name: "Mariner Home Round Mango Strip Chest/Coffee Table",
      category: "Furniture",
      subcategory: "Tables & Storage",
      description: "Handcrafted mango wood chest featuring round-strip design with natural finish.",
      specifications: {
        size: "90x40x40 cm",
        composition: "Solid Mango Wood",
        color: "Natural",
      },
      pricing: {
        msrp: 460,
        tiers: [
          { discount_percent: 65, min_quantity: 1, quantity_description: "1+ units", wholesale_price: 161.00 },
          { discount_percent: 68, min_quantity: 5, quantity_description: "5+ units", wholesale_price: 147.20 },
          { discount_percent: 70, min_quantity: 10, quantity_description: "10+ units", wholesale_price: 138.00 },
          { discount_percent: 72, min_quantity: 20, quantity_description: "20+ units", wholesale_price: 128.80 },
        ],
        default_tier: 0,
        currency: "USD"
      },
      availability: {
        moq: 1,
        case_pack: 1,
        estimated_available_date_iso: "2025-08-15",
        estimated_available_date_display: "August 2025"
      },
      // NEW: Real inventory from supplier file
      inventory: {
        batches: [
          { batch_id: "b1", quantity: 8, arrival_date_iso: "2025-05-22", arrival_date_display: "May 2025", status: "in_stock", is_preorder: false }
        ],
        total_available_now: 8,
        total_available_future: 0,
        total_all: 8,
        status: "in_stock",
        status_label: "IN STOCK",
        can_order_now: true,
        can_preorder: false,
        next_arrival: null,
        all_batches_summary: [
          { quantity: 8, arrival_date_display: "May 2025", status: "Available" }
        ]
      },
      supplier_info: {
        vendor_country: "India",
        lead_time_days: 60
      },
      image_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop",
      tags: ["furniture", "wood"],
      created_at: "2025-05-22"
    },
    {
      id: "e5f6g7h8",
      supplier: "Palm Lane",
      supplier_style_id: "PL00178-DRIFT3-018",
      product_name: "DRIFT 3-SEATER SLIP-COVERED SOFA",
      category: "Furniture",
      subcategory: "Sofas & Seating",
      description: "Softly structured slip-covered sofa with modern aesthetic.",
      specifications: {
        size: "226x104x86 cm",
        composition: "100% Linen",
        color: "White",
      },
      pricing: {
        msrp: 5000,
        tiers: [
          { discount_percent: 65, min_quantity: 1, quantity_description: "1+ units", wholesale_price: 1750.00 },
          { discount_percent: 68, min_quantity: 5, quantity_description: "5+ units", wholesale_price: 1600.00 },
          { discount_percent: 70, min_quantity: 10, quantity_description: "10+ units", wholesale_price: 1500.00 },
          { discount_percent: 72, min_quantity: 20, quantity_description: "20+ units", wholesale_price: 1400.00 },
        ],
        default_tier: 0,
        currency: "USD"
      },
      availability: {
        moq: 5,
        case_pack: 1,
        estimated_available_date_iso: "2025-08-15",
        estimated_available_date_display: "August 2025"
      },
      // INVENTORY: Out of stock now, pre-order available
      inventory: {
        batches: [
          { batch_id: "b1", quantity: 0, arrival_date_iso: "2025-08-15", arrival_date_display: "August 2025", status: "pre_order", is_preorder: true }
        ],
        total_available_now: 0,
        total_available_future: 15,
        total_all: 15,
        status: "pre_order",
        status_label: "PRE-ORDER AVAILABLE",
        can_order_now: false,
        can_preorder: true,
        next_arrival: { date_iso: "2025-08-15", date_display: "August 2025", quantity: 15 },
        all_batches_summary: [
          { quantity: 15, arrival_date_display: "August 2025", status: "Pre-Order" }
        ]
      },
      supplier_info: {
        vendor_country: "India",
        lead_time_days: 60
      },
      image_url: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&h=500&fit=crop",
      tags: ["furniture", "sofa"],
      created_at: "2025-05-22"
    },
    {
      id: "i9j0k1l2",
      supplier: "Palm Lane Rugs",
      supplier_style_id: "PL-DJ-22",
      product_name: "PALM LANE HAND-WOVEN RUG",
      category: "Rugs & Textiles",
      subcategory: "Area Rugs",
      description: "Premium hand-woven area rug with sophisticated pattern.",
      specifications: {
        size: "6 x 9 ft",
        color: "Ivory Camel",
        material: "Natural fibers"
      },
      pricing: {
        msrp: 1800,
        tiers: [
          { discount_percent: 65, min_quantity: 1, quantity_description: "1+ units", wholesale_price: 630.00 },
          { discount_percent: 68, min_quantity: 5, quantity_description: "5+ units", wholesale_price: 576.00 },
          { discount_percent: 70, min_quantity: 10, quantity_description: "10+ units", wholesale_price: 540.00 },
          { discount_percent: 72, min_quantity: 20, quantity_description: "20+ units", wholesale_price: 504.00 },
        ],
        default_tier: 0,
        currency: "USD"
      },
      availability: {
        moq: 1,
        case_pack: 1,
        estimated_available_date_iso: "2025-08-15",
        estimated_available_date_display: "August 2025"
      },
      // INVENTORY: Low stock (less than 2x MOQ)
      inventory: {
        batches: [
          { batch_id: "b1", quantity: 1, arrival_date_iso: "2025-05-22", arrival_date_display: "May 2025", status: "in_stock", is_preorder: false },
          { batch_id: "b2", quantity: 12, arrival_date_iso: "2025-07-15", arrival_date_display: "July 2025", status: "pre_order", is_preorder: true }
        ],
        total_available_now: 1,
        total_available_future: 12,
        total_all: 13,
        status: "low_stock",
        status_label: "LOW STOCK",
        can_order_now: true,
        can_preorder: true,
        next_arrival: { date_iso: "2025-07-15", date_display: "July 2025", quantity: 12 },
        all_batches_summary: [
          { quantity: 1, arrival_date_display: "May 2025", status: "Available" },
          { quantity: 12, arrival_date_display: "July 2025", status: "Pre-Order" }
        ]
      },
      supplier_info: {
        vendor_country: "India",
        lead_time_days: 60
      },
      image_url: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop",
      tags: ["rugs", "textiles"],
      created_at: "2025-05-22"
    }
  ]);

  // State
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartQuantities, setCartQuantities] = useState({});
  const [filters, setFilters] = useState({
    category: '',
    stockStatus: '', // NEW: filter by stock status
    priceMax: 50000,
    supplier: '',
  });

  const categories = [...new Set(products.map(p => p.category))];
  const suppliers = [...new Set(products.map(p => p.supplier))];

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const meetsCategory = !filters.category || product.category === filters.category;
      const meetsPrice = product.pricing.msrp <= filters.priceMax;
      const meetsSupplier = !filters.supplier || product.supplier === filters.supplier;
      
      // NEW: Stock status filter
      const meetsStock = !filters.stockStatus || product.inventory.status === filters.stockStatus;
      
      return meetsCategory && meetsPrice && meetsSupplier && meetsStock;
    });
  }, [filters, products]);

  const toggleWishlist = useCallback((productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const getEffectivePrice = (product, quantity = 1) => {
    const tier = product.pricing.tiers.find(t => quantity >= t.min_quantity) ||
                 product.pricing.tiers[product.pricing.tiers.length - 1];
    return tier.wholesale_price;
  };

  const exportWishlist = () => {
    const wishlistItems = products.filter(p => wishlist.includes(p.id));
    const csv = generateCSV(wishlistItems);
    downloadFile(csv, 'wholesale_wishlist.csv', 'text/csv');
  };

  const generatePO = () => {
    const wishlistItems = products.filter(p => wishlist.includes(p.id));
    const po = generatePOText(wishlistItems);
    downloadFile(po, 'purchase_order.txt', 'text/plain');
  };

  const generateCSV = (items) => {
    const headers = ['Supplier', 'Style #', 'Product Name', 'Quantity', 'Unit Price', 'Line Total', 'Stock Status', 'ETA'];
    const rows = items.map(p => {
      const qty = cartQuantities[p.id] || p.availability.moq;
      const price = getEffectivePrice(p, qty);
      const total = price * qty;
      
      return [
        p.supplier,
        p.supplier_style_id,
        p.product_name,
        qty,
        `$${price.toFixed(2)}`,
        `$${total.toFixed(2)}`,
        p.inventory.status_label,
        p.inventory.next_arrival?.date_display || p.availability.estimated_available_date_display || 'N/A'
      ];
    });
    
    return [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  };

  const generatePOText = (items) => {
    let total = 0;
    const lineItems = items.map((p, idx) => {
      const qty = cartQuantities[p.id] || p.availability.moq;
      const price = getEffectivePrice(p, qty);
      const lineTotal = price * qty;
      total += lineTotal;
      
      const stockNote = p.inventory.can_order_now ? 'READY TO SHIP' : `PRE-ORDER - ETA ${p.inventory.next_arrival?.date_display || 'TBD'}`;
      
      return `${idx + 1}. ${p.product_name}\n   Supplier: ${p.supplier} | Style #: ${p.supplier_style_id}\n   Qty: ${qty} × $${price.toFixed(2)} = $${lineTotal.toFixed(2)}\n   Status: ${stockNote}`;
    }).join('\n\n');
    
    return `PURCHASE ORDER\n${'='.repeat(70)}\nGenerated: ${new Date().toLocaleDateString()}\n\nLINE ITEMS:\n${lineItems}\n\n${'='.repeat(70)}\nESTIMATED TOTAL: $${total.toFixed(2)}\n\nNOTE: Pre-orders will be shipped on their respective ETAs`;
  };

  const downloadFile = (content, filename, type) => {
    const element = document.createElement('a');
    element.setAttribute('href', `data:${type};charset=utf-8,${encodeURIComponent(content)}`);
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getStockBadgeColor = (status) => {
    switch(status) {
      case 'in_stock': return 'bg-green-100 text-green-800';
      case 'low_stock': return 'bg-yellow-100 text-yellow-800';
      case 'pre_order': return 'bg-blue-100 text-blue-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockIcon = (status) => {
    switch(status) {
      case 'in_stock': return '✓';
      case 'low_stock': return '⚠️';
      case 'pre_order': return '📅';
      case 'out_of_stock': return '✕';
      default: return '?';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">B2B Wholesale Catalog</h1>
              <p className="text-sm text-slate-500 mt-1">Real-time inventory with pre-order capability</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={exportWishlist}
                disabled={wishlist.length === 0}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                <Download size={18} />
                <span>CSV ({wishlist.length})</span>
              </button>
              <button
                onClick={generatePO}
                disabled={wishlist.length === 0}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                <ShoppingCart size={18} />
                <span>PO</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* NEW: Stock Status Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Stock Status</label>
                <select
                  value={filters.stockStatus}
                  onChange={(e) => setFilters({...filters, stockStatus: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All</option>
                  <option value="in_stock">In Stock</option>
                  <option value="low_stock">Low Stock</option>
                  <option value="pre_order">Pre-Order</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Max Price</label>
                <input
                  type="number"
                  value={filters.priceMax}
                  onChange={(e) => setFilters({...filters, priceMax: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Supplier</label>
                <select
                  value={filters.supplier}
                  onChange={(e) => setFilters({...filters, supplier: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All</option>
                  {suppliers.map(sup => (
                    <option key={sup} value={sup}>{sup}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => setFilters({category: '', stockStatus: '', priceMax: 50000, supplier: ''})}
                  className="w-full px-4 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all"
            >
              {/* Image */}
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img
                  src={product.image_url}
                  alt={product.product_name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm ${
                    wishlist.includes(product.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/80 text-slate-700'
                  }`}
                >
                  <Heart size={18} fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} />
                </button>
                
                {/* STOCK BADGE - NEW */}
                <div className={`absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-semibold ${getStockBadgeColor(product.inventory.status)}`}>
                  {getStockIcon(product.inventory.status)} {product.inventory.status_label}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-slate-900 text-sm line-clamp-2 mb-1">
                  {product.product_name}
                </h3>

                {/* INVENTORY DISPLAY - NEW */}
                <div className="mb-3 p-2 bg-slate-50 rounded border border-slate-200 text-xs">
                  {product.inventory.can_order_now ? (
                    <>
                      <p className="font-medium text-green-700 flex items-center gap-1">
                        <Package size={14} /> {product.inventory.total_available_now} in stock
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-medium text-blue-700 flex items-center gap-1">
                        <Clock size={14} /> Pre-order available
                      </p>
                      {product.inventory.next_arrival && (
                        <p className="text-slate-600 mt-1">
                          ETA: {product.inventory.next_arrival.date_display}
                        </p>
                      )}
                    </>
                  )}
                </div>

                {/* Pricing */}
                <div className="mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-slate-900">
                      ${getEffectivePrice(product).toFixed(2)}
                    </span>
                    <span className="text-sm text-slate-500 line-through">${product.pricing.msrp}</span>
                  </div>
                  <p className="text-xs text-green-600 font-medium">65% OFF</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`px-3 py-2 rounded-lg ${
                      wishlist.includes(product.id)
                        ? 'bg-red-100 text-red-600'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {wishlist.includes(product.id) ? '✓' : '+'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full my-8">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">{selectedProduct.product_name}</h2>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-slate-500 hover:text-slate-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <img
                src={selectedProduct.image_url}
                alt={selectedProduct.product_name}
                className="w-full h-96 object-cover rounded-lg"
              />

              {/* INVENTORY SECTION - NEW */}
              <div className={`p-4 rounded-lg border-2 ${
                selectedProduct.inventory.can_order_now 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-blue-50 border-blue-200'
              }`}>
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  {selectedProduct.inventory.can_order_now ? (
                    <>✓ Stock Status</> 
                  ) : (
                    <>📅 Pre-Order Information</>
                  )}
                </h3>
                
                {selectedProduct.inventory.can_order_now ? (
                  <p className="text-sm font-medium text-green-900 mb-3">
                    ✓ {selectedProduct.inventory.total_available_now} units ready to ship now
                  </p>
                ) : (
                  <p className="text-sm font-medium text-blue-900 mb-3">
                    This item is currently out of stock but available for pre-order.
                  </p>
                )}

                {/* Batch Summary */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-700">Availability:</p>
                  {selectedProduct.inventory.all_batches_summary.map((batch, idx) => (
                    <div key={idx} className="text-sm text-slate-600 flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        batch.status === 'Available' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {batch.status}
                      </span>
                      <span>{batch.quantity} units - {batch.arrival_date_display}</span>
                    </div>
                  ))}
                </div>

                {selectedProduct.inventory.next_arrival && !selectedProduct.inventory.can_order_now && (
                  <div className="mt-3 p-3 bg-white/60 rounded border border-blue-200">
                    <p className="text-sm text-blue-900">
                      <strong>Next arrival:</strong> {selectedProduct.inventory.next_arrival.date_display}
                    </p>
                    <p className="text-xs text-blue-800 mt-1">
                      You can place a pre-order now for {selectedProduct.inventory.next_arrival.quantity} units arriving {selectedProduct.inventory.next_arrival.date_display}
                    </p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Description</h3>
                <p className="text-slate-700">{selectedProduct.description}</p>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Specifications</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-slate-600 capitalize">{key}</p>
                      <p className="font-medium text-slate-900">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Volume Pricing */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                <h3 className="font-semibold text-slate-900 mb-4">Volume Pricing</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-blue-200">
                      <th className="text-left py-2 px-2 font-medium">Qty</th>
                      <th className="text-left py-2 px-2 font-medium">Discount</th>
                      <th className="text-right py-2 px-2 font-medium">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedProduct.pricing.tiers.map(tier => (
                      <tr key={tier.min_quantity} className="border-b border-blue-100">
                        <td className="py-2 px-2">{tier.quantity_description}</td>
                        <td className="py-2 px-2 font-medium text-green-600">{tier.discount_percent}% OFF</td>
                        <td className="py-2 px-2 text-right font-medium">${tier.wholesale_price.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Quantity Selector */}
              <div className="border-t border-slate-200 pt-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Order Quantity</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={selectedProduct.availability.moq}
                    value={cartQuantities[selectedProduct.id] || selectedProduct.availability.moq}
                    onChange={(e) => setCartQuantities({
                      ...cartQuantities,
                      [selectedProduct.id]: Math.max(selectedProduct.availability.moq, parseInt(e.target.value) || 0)
                    })}
                    className="w-24 px-3 py-2 border border-slate-300 rounded-lg"
                  />
                  <span className="text-sm text-slate-600">
                    @ ${getEffectivePrice(selectedProduct, cartQuantities[selectedProduct.id] || selectedProduct.availability.moq).toFixed(2)}/unit
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    toggleWishlist(selectedProduct.id);
                    setSelectedProduct(null);
                  }}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium ${
                    wishlist.includes(selectedProduct.id)
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {wishlist.includes(selectedProduct.id) ? 'Remove from List' : 'Add to Wish List'}
                </button>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-3 border border-slate-300 rounded-lg font-medium hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Actions */}
      {wishlist.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-white border-t border-slate-200 p-4 flex gap-2">
          <button
            onClick={exportWishlist}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium"
          >
            CSV
          </button>
          <button
            onClick={generatePO}
            className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-medium"
          >
            PO
          </button>
        </div>
      )}
    </div>
  );
}