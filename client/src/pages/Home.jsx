import { Link } from 'react-router-dom'
import { Search, Shield, Star, Zap, ChevronRight, Sparkles, ArrowRight, MapPin } from 'lucide-react'
import { getAllCategories } from '../data/serviceData'

const STEPS = [
  { step: '01', title: 'Choose a Service', desc: 'Browse categories and pick the services you need.', icon: '🔍' },
  { step: '02', title: 'Add to Cart', desc: 'Select multiple services and build your booking.', icon: '🛒' },
  { step: '03', title: 'Book a Professional', desc: 'Find verified workers near you and schedule instantly.', icon: '📅' },
  { step: '04', title: 'Rate & Review', desc: 'After the job, leave a review to help the community.', icon: '⭐' },
]

const POPULAR_SERVICES = [
  { icon: '🔌', name: 'Switchboard Repair', price: 199, tag: 'Most Booked' },
  { icon: '🚰', name: 'Tap Installation', price: 249, tag: null },
  { icon: '🧊', name: 'AC Service', price: 499, tag: 'Popular' },
  { icon: '🚪', name: 'Door Repair', price: 299, tag: null },
  { icon: '🏠', name: '1 Room Painting', price: 2499, tag: 'Premium' },
  { icon: '📺', name: 'TV Mounting', price: 499, tag: null },
]

export default function Home() {
  const allCategories = getAllCategories()

  return (
    <div className="min-h-screen">

      {/* ===== HERO with Gradient ===== */}
      <section className="relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
      }}>
        {/* Decorative blobs */}
        <div className="absolute top-[-100px] right-[-60px] w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-80px] left-[-40px] w-64 h-64 bg-purple-300/20 rounded-full blur-3xl" />
        <div className="absolute top-20 left-1/3 w-40 h-40 bg-blue-300/10 rounded-full blur-2xl" />

        <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 text-sm text-white mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Trusted by 10,000+ customers across India
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5">
              Find Trusted
              <span className="block bg-clip-text text-transparent" style={{
                backgroundImage: 'linear-gradient(90deg, #ffd700, #ffaa00, #ff8c00)'
              }}>Home Services</span>
              <span className="block">Near You</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Connect with verified professionals for all your home needs.
              Quality service. Fair prices. Every time.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 flex items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow-xl shadow-purple-900/20">
                <Search size={20} className="text-gray-400 shrink-0" />
                <input type="text" placeholder="What service do you need?" className="flex-1 outline-none text-gray-800 text-sm bg-transparent placeholder-gray-400 font-medium" />
              </div>
              <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl px-5 py-4">
                <MapPin size={16} className="text-white/80" />
                <input type="text" placeholder="Your city" className="w-28 outline-none text-white text-sm bg-transparent placeholder-white/60 font-medium" />
              </div>
              <Link to="/services" className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 transition-all rounded-2xl px-8 py-4 font-bold text-sm text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-95">
                Search <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 40L48 36C96 32 192 24 288 28C384 32 480 48 576 52C672 56 768 48 864 40C960 32 1056 24 1152 28C1248 32 1344 48 1392 56L1440 64V80H0V40Z" fill="#f0f4ff"/>
          </svg>
        </div>
      </section>

      {/* ===== Service Categories ===== */}
      <section style={{ background: 'linear-gradient(180deg, #f0f4ff 0%, #e8ecf8 100%)' }} className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">Browse by Service</h2>
              <p className="text-gray-500 text-sm">Pick what you need — verified professionals ready to help.</p>
            </div>
            <Link to="/services" className="hidden sm:flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-semibold transition">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 stagger-children">
            {allCategories.map((cat) => (
              <Link
                key={cat.id}
                to="/services"
                className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 cursor-pointer hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <span className="text-2xl">{cat.icon}</span>
                </div>
                <div className="text-center">
                  <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{cat.name}</span>
                  <span className="block text-[10px] text-gray-400 mt-0.5">{cat.services.length} services</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="sm:hidden mt-5 text-center">
            <Link to="/services" className="inline-flex items-center gap-1 text-blue-600 text-sm font-semibold">
              View All Services <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Popular Services ===== */}
      <section style={{ background: 'linear-gradient(180deg, #e8ecf8 0%, #f5f0ff 100%)' }} className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={18} className="text-orange-500" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Popular Services</h2>
          </div>
          <p className="text-gray-500 text-sm mb-8">Most booked services this month</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 stagger-children">
            {POPULAR_SERVICES.map((svc) => (
              <Link
                key={svc.name}
                to="/services"
                className="group relative flex flex-col items-center p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300 text-center hover:-translate-y-1"
              >
                {svc.tag && (
                  <span className="absolute -top-2 right-2 bg-orange-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {svc.tag}
                  </span>
                )}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">{svc.icon}</span>
                </div>
                <span className="text-xs font-semibold text-gray-800 mb-1 line-clamp-1">{svc.name}</span>
                <span className="text-blue-600 text-xs font-bold">₹{svc.price}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== How It Works ===== */}
      <section style={{ background: 'linear-gradient(180deg, #f5f0ff 0%, #ede7f6 100%)' }} className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 text-center">How InLocFix Works</h2>
          <p className="text-gray-500 mb-12 text-center text-sm">Simple. Safe. Fast.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
            {STEPS.map(({ step, title, desc, icon }) => (
              <div key={step} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-purple-100/40 transition-all duration-300 hover:-translate-y-1 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                  <span className="text-xl">{icon}</span>
                </div>
                <div className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-2">{step}</div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Trust Indicators ===== */}
      <section style={{ background: 'linear-gradient(180deg, #ede7f6 0%, #e8ecf8 100%)' }} className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: <Shield size={22} className="text-blue-600" />, bg: 'from-blue-50 to-blue-100', shadow: 'shadow-blue-100/50', title: 'Verified Workers', desc: 'Background checked & certified professionals.' },
              { icon: <Star size={22} className="text-amber-500" />, bg: 'from-amber-50 to-amber-100', shadow: 'shadow-amber-100/50', title: 'Real Reviews', desc: 'Only customers who booked can leave reviews.' },
              { icon: <Zap size={22} className="text-purple-500" />, bg: 'from-purple-50 to-purple-100', shadow: 'shadow-purple-100/50', title: 'Fast Booking', desc: 'Book in under 2 minutes. Workers respond quickly.' },
            ].map(({ icon, bg, shadow, title, desc }) => (
              <div key={title} className={`flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:${shadow} transition-all duration-300 hover:-translate-y-1`}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${bg} flex items-center justify-center shrink-0 shadow-sm`}>{icon}</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">{title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative overflow-hidden py-20" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div className="absolute top-[-60px] right-[-40px] w-60 h-60 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-40px] left-[-30px] w-48 h-48 bg-purple-300/15 rounded-full blur-2xl" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Are you a Service Worker?</h2>
          <p className="text-white/80 mb-8 text-lg">Create your free profile and start getting jobs from customers near you.</p>
          <Link to="/register" className="inline-flex items-center gap-2 bg-white text-purple-700 hover:bg-purple-50 transition-all font-bold px-8 py-4 rounded-2xl shadow-xl shadow-purple-900/20 hover:scale-[1.02] active:scale-95">
            Register as a Worker <ChevronRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}