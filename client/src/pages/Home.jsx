import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Shield, Star, Zap, ChevronRight, Sparkles, ArrowRight, MapPin } from 'lucide-react'
import { getAllCategories, SERVICE_CATEGORIES } from '../data/serviceData'

const STEPS = [
  { step: '01', title: 'Choose a Service', desc: 'Browse categories and pick the services you need.', icon: '🔍' },
  { step: '02', title: 'Add to Cart', desc: 'Select multiple services and build your booking.', icon: '🛒' },
  { step: '03', title: 'Book a Professional', desc: 'Find verified workers near you and schedule instantly.', icon: '📅' },
  { step: '04', title: 'Rate & Review', desc: 'After the job, leave a review to help the community.', icon: '⭐' },
]

const POPULAR_SERVICES = [
  { icon: '🔌', name: 'Switchboard Repair', price: 199, tag: 'Most Booked', slug: 'electrician' },
  { icon: '🚰', name: 'Tap Installation', price: 249, tag: null, slug: 'plumber' },
  { icon: '🧊', name: 'AC Service', price: 499, tag: 'Popular', slug: 'ac-repair' },
  { icon: '🚪', name: 'Door Repair', price: 299, tag: null, slug: 'carpenter' },
  { icon: '🏠', name: '1 Room Painting', price: 2499, tag: 'Premium', slug: 'painter' },
  { icon: '📺', name: 'TV Mounting', price: 499, tag: null, slug: 'technician' },
]

export default function Home() {
  const allCategories = getAllCategories()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState(false)

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (!query.trim()) { setSearchResults([]); setShowResults(false); return }
    const q = query.toLowerCase()
    const results = []
    Object.entries(SERVICE_CATEGORIES).forEach(([slug, cat]) => {
      if (cat.name.toLowerCase().includes(q))
        results.push({ type: 'category', name: cat.name, icon: cat.icon, slug, desc: cat.description })
      cat.services.forEach(svc => {
        if (svc.name.toLowerCase().includes(q) || svc.description.toLowerCase().includes(q))
          results.push({ type: 'service', name: svc.name, icon: svc.icon, slug, categoryName: cat.name, price: svc.price })
      })
    })
    setSearchResults(results.slice(0, 8))
    setShowResults(true)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    const q = searchQuery.toLowerCase()
    const match = Object.entries(SERVICE_CATEGORIES).find(([slug, cat]) =>
      cat.name.toLowerCase().includes(q) || slug.includes(q)
    )
    navigate(match ? `/services/${match[0]}` : '/services')
    setShowResults(false)
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ===== HERO — Indigo/Violet Gradient ===== */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}>
        <div className="absolute top-[-100px] right-[-80px] w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-60px] left-[-40px] w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 text-sm text-white/90 font-medium mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Trusted by 10,000+ customers across India
            </div>
            <h1 className="text-4xl md:text-[56px] font-extrabold text-white leading-[1.15] mb-6 tracking-tight">
              Find Trusted<br />
              <span className="text-amber-300">Home Services</span><br />
              Near You
            </h1>
            <p className="text-white/70 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
              Connect with verified professionals for all your home needs. Quality service, fair prices.
            </p>
          </div>

          {/* Search */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow-lg shadow-gray-200/50 border border-gray-200">
                  <Search size={20} className="text-gray-400 shrink-0" />
                  <input type="text" value={searchQuery} onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => searchQuery && setShowResults(true)}
                    placeholder="Try 'plumber', 'AC repair', 'electrician'..."
                    className="flex-1 outline-none text-[#1F2937] text-sm bg-transparent placeholder-gray-400 font-medium" />
                  {searchQuery && (
                    <button type="button" onClick={() => { setSearchQuery(''); setShowResults(false) }}
                      className="text-gray-400 hover:text-gray-600 cursor-pointer text-xs font-medium">Clear</button>
                  )}
                </div>

                {/* Search Dropdown */}
                {showResults && searchResults.length > 0 && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowResults(false)} />
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl shadow-gray-200/60 border border-gray-100 z-20 py-2 max-h-80 overflow-y-auto">
                      {searchResults.map((result, i) => (
                        <Link key={i} to={`/services/${result.slug}`} onClick={() => setShowResults(false)}
                          className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
                          <span className="text-xl w-8 text-center">{result.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[#1F2937] truncate">{result.name}</p>
                            <p className="text-xs text-gray-400">
                              {result.type === 'category' ? result.desc : `in ${result.categoryName} · ₹${result.price}`}
                            </p>
                          </div>
                          <ChevronRight size={14} className="text-gray-300" />
                        </Link>
                      ))}
                    </div>
                  </>
                )}
                {showResults && searchQuery && searchResults.length === 0 && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowResults(false)} />
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-20 p-6 text-center">
                      <p className="text-gray-500 text-sm">No services found for "{searchQuery}"</p>
                      <Link to="/services" className="text-[#2563EB] text-sm font-medium mt-1 inline-block" onClick={() => setShowResults(false)}>Browse all services →</Link>
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow-lg shadow-gray-200/50 border border-gray-200">
                <MapPin size={16} className="text-[#2563EB]" />
                <input type="text" placeholder="Your city" className="w-28 outline-none text-[#1F2937] text-sm bg-transparent placeholder-gray-400 font-medium" />
              </div>
              <button type="submit" className="flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-700 transition-all rounded-2xl px-8 py-4 font-bold text-sm text-white shadow-lg shadow-blue-600/20 hover:shadow-blue-700/30 active:scale-[0.98] cursor-pointer">
                Search <ChevronRight size={16} />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ===== Service Categories ===== */}
      <section className="bg-[#F8FAFC] py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1F2937] mb-2">Browse by Service</h2>
              <p className="text-gray-500 text-sm">Pick what you need — verified professionals ready to help.</p>
            </div>
            <Link to="/services" className="hidden sm:flex items-center gap-1 text-[#2563EB] hover:text-blue-700 text-sm font-semibold transition">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {allCategories.map((cat, i) => (
              <Link key={cat.id} to={`/services/${cat.id}`}
                className="group flex flex-col items-center gap-4 p-7 rounded-2xl bg-white border border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 cursor-pointer hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
                  <span className="text-2xl">{cat.icon}</span>
                </div>
                <div className="text-center">
                  <span className="text-sm font-semibold text-[#1F2937] group-hover:text-[#2563EB] transition-colors">{cat.name}</span>
                  <span className="block text-[11px] text-gray-400 mt-0.5">{cat.services.length} services</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="sm:hidden mt-6 text-center">
            <Link to="/services" className="inline-flex items-center gap-1 text-[#2563EB] text-sm font-semibold">View All Services <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      {/* ===== Popular Services ===== */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={18} className="text-[#F97316]" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1F2937]">Popular Services</h2>
          </div>
          <p className="text-gray-500 text-sm mb-10">Most booked services this month</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {POPULAR_SERVICES.map((svc, i) => (
              <Link key={svc.name} to={`/services/${svc.slug}`}
                className="group relative flex flex-col items-center p-6 rounded-2xl bg-white border border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 text-center hover:-translate-y-1">
                {svc.tag && (
                  <span className="absolute -top-2.5 right-2 bg-[#F97316] text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">{svc.tag}</span>
                )}
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-3 group-hover:bg-orange-100 group-hover:scale-110 transition-all">
                  <span className="text-2xl">{svc.icon}</span>
                </div>
                <span className="text-xs font-semibold text-[#1F2937] mb-1 line-clamp-1 group-hover:text-[#2563EB] transition-colors">{svc.name}</span>
                <span className="text-[#2563EB] text-xs font-bold">₹{svc.price}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== How It Works ===== */}
      <section className="bg-[#F8FAFC] py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1F2937] mb-2 text-center">How InLocFix Works</h2>
          <p className="text-gray-500 mb-14 text-center text-sm">Simple. Safe. Fast.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map(({ step, title, desc, icon }) => (
              <div key={step} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 hover:-translate-y-1 group">
                <div className="w-12 h-12 rounded-xl bg-[#2563EB] flex items-center justify-center mb-5 shadow-md shadow-blue-600/15 group-hover:scale-105 transition-transform">
                  <span className="text-xl">{icon}</span>
                </div>
                <div className="text-3xl font-black text-[#2563EB] mb-3">{step}</div>
                <h3 className="font-bold text-[#1F2937] mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Trust ===== */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Shield size={22} className="text-[#2563EB]" />, bg: 'bg-blue-50', title: 'Verified Workers', desc: 'Background checked & certified professionals.' },
              { icon: <Star size={22} className="text-amber-500" />, bg: 'bg-amber-50', title: 'Real Reviews', desc: 'Only customers who booked can leave reviews.' },
              { icon: <Zap size={22} className="text-[#2563EB]" />, bg: 'bg-blue-50', title: 'Fast Booking', desc: 'Book in under 2 minutes. Workers respond quickly.' },
            ].map(({ icon, bg, title, desc }) => (
              <div key={title} className="flex items-start gap-5 p-7 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 hover:-translate-y-1">
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center shrink-0`}>{icon}</div>
                <div>
                  <h3 className="font-bold text-[#1F2937] mb-1">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Are you a Service Worker?</h2>
          <p className="text-indigo-100 mb-10 text-lg">Create your free profile and start getting jobs from customers near you.</p>
          <Link to="/register" className="inline-flex items-center gap-2 bg-white text-indigo-700 hover:bg-indigo-50 transition-all font-bold px-8 py-4 rounded-2xl shadow-xl shadow-indigo-900/15 hover:scale-[1.02] active:scale-[0.98]">
            Register as a Worker <ChevronRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}