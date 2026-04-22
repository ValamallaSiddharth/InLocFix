// src/pages/Services.jsx — Clean minimal marketplace

import { useState, useMemo, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAllCategories } from '../data/serviceData'
import { useCart } from '../context/CartContext'
import Breadcrumb from '../components/Breadcrumb'
import {
  Search, Star, Clock, Plus, Minus, ShoppingCart,
  ChevronRight, Shield, CheckCircle, BadgePercent,
  Sparkles, SlidersHorizontal, ArrowDownNarrowWide,
  Zap, ChevronDown, X
} from 'lucide-react'

const fakeRating = (id) => {
  const hash = id.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return (4.2 + (hash % 8) / 10).toFixed(1)
}
const fakeReviews = (id) => {
  const hash = id.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return 50 + (hash % 200)
}

const getBadge = (service, index) => {
  if (index === 0) return { label: 'Most Booked', color: 'bg-[#2563EB]' }
  if (index === 2) return { label: 'Popular', color: 'bg-[#F97316]' }
  if (service.price <= 199) return { label: 'Best Value', color: 'bg-emerald-500' }
  return null
}

const SORT_OPTIONS = [
  { id: 'default', label: 'Recommended', icon: Sparkles },
  { id: 'rating', label: 'Top Rated', icon: Star },
  { id: 'price-low', label: 'Lowest Price', icon: ArrowDownNarrowWide },
  { id: 'duration', label: 'Fastest Service', icon: Zap },
]

export default function Services() {
  const allCategories = getAllCategories()
  const { category: urlCategory } = useParams()
  const [activeCategory, setActiveCategory] = useState(allCategories[0]?.id || '')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [showSortMenu, setShowSortMenu] = useState(false)
  const { addToCart, removeFromCart, updateQuantity, getItemQuantity, cartItems, cartCount, cartTotal } = useCart()

  useEffect(() => {
    if (urlCategory && allCategories.find(c => c.id === urlCategory)) {
      setActiveCategory(urlCategory)
    }
  }, [urlCategory])

  const currentCategory = allCategories.find(c => c.id === activeCategory)

  const filteredServices = useMemo(() => {
    if (!currentCategory) return []
    let services = [...currentCategory.services]
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      services = services.filter(s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q))
    }
    switch (sortBy) {
      case 'rating': services.sort((a, b) => parseFloat(fakeRating(b.id)) - parseFloat(fakeRating(a.id))); break
      case 'price-low': services.sort((a, b) => a.price - b.price); break
      case 'duration': services.sort((a, b) => (parseInt(a.duration) || 0) - (parseInt(b.duration) || 0)); break
      default: break
    }
    return services
  }, [currentCategory, searchQuery, sortBy])

  const activeSortLabel = SORT_OPTIONS.find(s => s.id === sortBy)?.label || 'Recommended'

  return (
    <div className="min-h-screen bg-[#F1F5F9]">

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Breadcrumb items={[
            { label: 'Services', to: '/services' },
            ...(currentCategory ? [{ label: currentCategory.name }] : [])
          ]} />
          <Link to="/cart" className="relative flex items-center gap-2 px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all shadow-sm">
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#F97316] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">{cartCount}</span>
            )}
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-8 items-start">

          {/* LEFT SIDEBAR */}
          <aside className="w-56 shrink-0 sticky top-36 hidden lg:block">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-1">Categories</h2>
            <nav className="space-y-1.5">
              {allCategories.map((cat) => (
                <button key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setSearchQuery(''); setSortBy('default') }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 cursor-pointer group ${
                    activeCategory === cat.id
                      ? 'bg-white border border-blue-200 shadow-md shadow-blue-50'
                      : 'hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-sm'
                  }`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                    activeCategory === cat.id ? 'bg-blue-50 scale-105' : 'bg-gray-50 group-hover:bg-blue-50 group-hover:scale-105'
                  }`}>
                    <span className="text-lg">{cat.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <span className={`text-sm font-semibold block ${activeCategory === cat.id ? 'text-[#2563EB]' : 'text-[#1F2937]'}`}>{cat.name}</span>
                    <span className="text-[10px] text-gray-400">{cat.services.length} services</span>
                  </div>
                  {activeCategory === cat.id && <div className="ml-auto w-1 h-6 bg-[#2563EB] rounded-full" />}
                </button>
              ))}
            </nav>

            <div className="mt-8 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-[#1F2937] uppercase tracking-wider">Why InLocFix</h4>
              {[
                { icon: <Shield size={13} />, label: 'Verified Professionals', color: 'text-[#2563EB]' },
                { icon: <CheckCircle size={13} />, label: 'Hassle-Free Booking', color: 'text-emerald-600' },
                { icon: <BadgePercent size={13} />, label: 'Transparent Pricing', color: 'text-[#F97316]' },
              ].map(({ icon, label, color }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <span className={color}>{icon}</span>
                  <span className="text-xs text-gray-500">{label}</span>
                </div>
              ))}
            </div>
          </aside>

          {/* MIDDLE */}
          <main className="flex-1 min-w-0">
            {/* Mobile Categories */}
            <div className="lg:hidden mb-5 -mx-4 px-4">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {allCategories.map((cat) => (
                  <button key={cat.id} onClick={() => { setActiveCategory(cat.id); setSearchQuery(''); setSortBy('default') }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full border whitespace-nowrap text-sm font-medium transition-all cursor-pointer shrink-0 ${
                      activeCategory === cat.id
                        ? 'border-blue-200 bg-white text-[#2563EB] shadow-md shadow-blue-50'
                        : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                    }`}>
                    <span>{cat.icon}</span><span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Header */}
            {currentCategory && (
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                    <span className="text-2xl">{currentCategory.icon}</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-extrabold text-[#1F2937]">{currentCategory.name} Services</h1>
                    <p className="text-gray-500 text-sm">{currentCategory.description}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Search + Sort */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${currentCategory?.name || ''} services...`}
                  className="w-full pl-11 pr-10 py-3 rounded-xl bg-white border border-gray-200 text-[#1F2937] placeholder-gray-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-50 transition text-sm shadow-sm" />
                {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"><X size={14} /></button>}
              </div>
              <div className="relative">
                <button onClick={() => setShowSortMenu(!showSortMenu)}
                  className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-[#1F2937] hover:border-gray-300 transition cursor-pointer shadow-sm w-full sm:w-auto">
                  <SlidersHorizontal size={14} className="text-gray-400" />
                  <span className="font-medium">{activeSortLabel}</span>
                  <ChevronDown size={14} className={`text-gray-400 transition-transform ${showSortMenu ? 'rotate-180' : ''}`} />
                </button>
                {showSortMenu && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowSortMenu(false)} />
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-1">
                      {SORT_OPTIONS.map(({ id, label, icon: Icon }) => (
                        <button key={id} onClick={() => { setSortBy(id); setShowSortMenu(false) }}
                          className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition cursor-pointer ${sortBy === id ? 'text-[#2563EB] bg-blue-50 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                          <Icon size={14} />{label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <p className="text-gray-400 text-xs font-medium mb-5">{filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} available</p>

            {/* Cards */}
            {filteredServices.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <Search size={24} className="text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-[#1F2937] mb-1">No services found</h3>
                <p className="text-gray-400 text-sm">Try a different search or browse other categories</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredServices.map((service, index) => {
                  const qty = getItemQuantity(service.id)
                  const rating = fakeRating(service.id)
                  const reviews = fakeReviews(service.id)
                  const badge = getBadge(service, index)

                  return (
                    <div key={service.id}
                      className="group bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-50 hover:border-blue-100 hover:-translate-y-0.5">
                      <div className="flex">
                        <div className="flex-1 p-6">
                          {badge && (
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 ${badge.color} text-white text-[10px] font-bold rounded-full mb-3`}>
                              {badge.label}
                            </span>
                          )}
                          <div className="flex items-start gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                              <span className="text-lg">{service.icon}</span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="text-[#1F2937] font-bold text-[15px] leading-tight">{service.name}</h3>
                              <div className="flex items-center gap-2 mt-1.5">
                                <div className="flex items-center gap-0.5">
                                  <Star size={12} className="text-amber-400 fill-amber-400" />
                                  <span className="text-[#1F2937] text-xs font-semibold">{rating}</span>
                                </div>
                                <span className="text-gray-300">·</span>
                                <span className="text-gray-400 text-xs">{reviews.toLocaleString()} reviews</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-1 pl-[52px]">{service.description}</p>
                          <div className="flex items-end justify-between pl-[52px]">
                            <div>
                              <span className="text-[#2563EB] font-extrabold text-lg">₹{service.price}</span>
                              <span className="text-gray-400 text-[11px] ml-1">onwards</span>
                              <div className="flex items-center gap-1 text-gray-400 text-[11px] mt-0.5"><Clock size={10} />{service.duration}</div>
                            </div>
                            {qty === 0 ? (
                              <button type="button" onClick={() => addToCart(service, currentCategory)}
                                className="px-6 py-2.5 bg-[#F97316] hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm hover:shadow-md hover:shadow-orange-100 active:scale-95">
                                Book Now
                              </button>
                            ) : (
                              <div className="flex items-center gap-2">
                                <button type="button" onClick={() => qty === 1 ? removeFromCart(service.id) : updateQuantity(service.id, qty - 1)}
                                  className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 text-gray-500 hover:text-red-500 flex items-center justify-center transition cursor-pointer"><Minus size={14} /></button>
                                <span className="w-7 text-center text-[#1F2937] font-bold text-sm">{qty}</span>
                                <button type="button" onClick={() => addToCart(service, currentCategory)}
                                  className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#2563EB] flex items-center justify-center transition cursor-pointer"><Plus size={14} /></button>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="w-28 md:w-36 shrink-0 overflow-hidden flex items-center justify-center bg-gray-50">
                          <span className="text-5xl opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500">{service.icon}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </main>

          {/* RIGHT SIDEBAR */}
          <aside className="w-72 shrink-0 sticky top-36 hidden xl:block space-y-5">
            {/* Offer */}
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <BadgePercent size={18} className="text-[#F97316]" />
                <span className="text-[#F97316] font-bold text-sm">Special Offer</span>
              </div>
              <p className="text-gray-700 text-xs leading-relaxed">
                Get <span className="text-[#F97316] font-bold">15% off</span> on your first booking! Use code{' '}
                <span className="font-mono bg-orange-100 px-1.5 py-0.5 rounded text-[#F97316] text-[11px] font-bold">INLOC15</span>
              </p>
            </div>

            {/* Cart */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <ShoppingCart size={16} className="text-[#2563EB]" />
                  <h3 className="text-[#1F2937] font-bold text-sm">Your Cart</h3>
                </div>
                {cartCount > 0 && <span className="bg-blue-50 text-[#2563EB] text-[10px] font-bold px-2.5 py-0.5 rounded-full">{cartCount} item{cartCount !== 1 ? 's' : ''}</span>}
              </div>
              {cartItems.length === 0 ? (
                <div className="px-5 py-10 text-center">
                  <ShoppingCart size={28} className="text-gray-200 mx-auto mb-2" />
                  <p className="text-gray-400 text-xs">No items in cart</p>
                  <p className="text-gray-300 text-[10px] mt-1">Add services to get started</p>
                </div>
              ) : (
                <>
                  <div className="divide-y divide-gray-50 max-h-64 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="px-5 py-3 flex items-start gap-3 hover:bg-gray-50/50 transition">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0"><span className="text-base">{item.icon}</span></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[#1F2937] text-xs font-medium truncate">{item.name}</p>
                          <p className="text-[#2563EB] text-xs font-bold mt-0.5">₹{item.price * item.quantity}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => item.quantity === 1 ? removeFromCart(item.id) : updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-500 flex items-center justify-center cursor-pointer text-xs transition border border-gray-200 hover:border-red-200"><Minus size={10} /></button>
                          <span className="text-[#1F2937] text-xs font-bold w-5 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded bg-blue-50 hover:bg-blue-100 text-[#2563EB] flex items-center justify-center cursor-pointer text-xs transition border border-blue-200"><Plus size={10} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-5 py-4 border-t border-gray-100 bg-gray-50/50">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-500 text-xs">Total</span>
                      <span className="text-[#1F2937] font-extrabold text-base">₹{cartTotal.toLocaleString()}</span>
                    </div>
                    <Link to="/cart" className="block w-full text-center py-2.5 bg-[#F97316] hover:bg-orange-600 text-white font-bold text-sm rounded-xl transition-all shadow-sm hover:shadow-md">
                      Proceed to Book →
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Trust */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-3.5 shadow-sm">
              <h4 className="text-[#1F2937] font-bold text-xs uppercase tracking-wider">Our Guarantee</h4>
              {[
                { icon: <Shield size={15} />, title: 'Verified Professionals', desc: 'Background checked & certified', color: 'text-[#2563EB]', bg: 'bg-blue-50' },
                { icon: <CheckCircle size={15} />, title: 'Hassle-Free Booking', desc: 'Book in under 2 minutes', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { icon: <BadgePercent size={15} />, title: 'Transparent Pricing', desc: 'No hidden charges, ever', color: 'text-[#F97316]', bg: 'bg-orange-50' },
              ].map(({ icon, title, desc, color, bg }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center shrink-0 ${color}`}>{icon}</div>
                  <div>
                    <p className="text-[#1F2937] text-xs font-medium">{title}</p>
                    <p className="text-gray-400 text-[11px]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile Cart Bar */}
      {cartCount > 0 && (
        <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-2xl shadow-gray-900/10">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-[#1F2937] font-bold text-sm">{cartCount} item{cartCount !== 1 ? 's' : ''} · ₹{cartTotal.toLocaleString()}</p>
              <p className="text-gray-400 text-xs">View cart for details</p>
            </div>
            <Link to="/cart" className="flex items-center gap-2 px-6 py-2.5 bg-[#F97316] text-white font-bold text-sm rounded-xl shadow-sm">
              <ShoppingCart size={16} />View Cart<ChevronRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
