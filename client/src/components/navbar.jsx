import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { supabase } from "../lib/supabase";
import { useState, useEffect, useRef } from "react";
import {
  Home,
  Search,
  LayoutDashboard,
  LogIn,
  UserPlus,
  LogOut,
  Menu,
  X,
  ChevronDown,
  User,
  Shield,
  Layers,
  ShoppingCart,
} from "lucide-react";

const Navbar = () => {
  const { user, profile } = useAuth();
  const { cartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
    setShowTooltip(false);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSignOut = async () => {
    setProfileOpen(false);
    try {
      await Promise.race([
        supabase.auth.signOut(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 2000)),
      ]);
    } catch (err) {
      console.error("Sign out (forcing clear):", err);
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("sb-")) localStorage.removeItem(key);
      });
    } finally {
      navigate("/login");
      window.location.reload();
    }
  };

  const isActive = (path) => location.pathname === path;

  const NAV_LINKS = [
    { to: "/", label: "Home", icon: Home },
    { to: "/services", label: "Services", icon: Layers },
    { to: "/search", label: "Search", icon: Search },
    ...(user
      ? [{ to: "/dashboard", label: "Dashboard", icon: LayoutDashboard }]
      : []),
  ];

  const displayName = profile?.full_name || user?.email || "Account";
  const userInitial = displayName.charAt(0).toUpperCase();
  const userEmail = user?.email || "";
  const isWorker = profile?.role === "service_worker";
  const roleBadgeText = isWorker ? "Service Worker" : "Customer";
  const roleBadgeClass = isWorker
    ? "bg-violet-500/20 text-violet-300"
    : "bg-blue-500/20 text-blue-300";

  return (
    <>
      <nav
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "shadow-lg shadow-indigo-900/10 border-b border-white/10"
            : "border-b border-transparent"
        }`}
        style={{ background: scrolled
          ? 'rgba(49, 46, 129, 0.97)'
          : 'linear-gradient(135deg, #6366F1, #8B5CF6)'
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" id="navbar-logo" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:bg-white/30 transition-all duration-300">
                <Shield size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">InLocFix</span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  id={`nav-link-${label.toLowerCase()}`}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(to)
                      ? "text-white bg-white/20"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                  {isActive(to) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-white rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Cart */}
            <div className="hidden md:flex items-center">
              <Link
                to="/cart"
                className="relative p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 mr-2"
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] bg-[#F97316] text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-badge-pop">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Auth */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="relative" ref={profileRef}
                  onMouseEnter={() => { if (!profileOpen) setShowTooltip(true); }}
                  onMouseLeave={() => setShowTooltip(false)}>
                  <button
                    id="navbar-profile-btn"
                    onClick={() => { setShowTooltip(false); setProfileOpen(!profileOpen); }}
                    className={`flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
                      profileOpen
                        ? "bg-white/20 border-white/30"
                        : "bg-white/10 border-white/15 hover:border-white/25 hover:bg-white/15"
                    }`}
                  >
                    <div className="w-7 h-7 rounded-full bg-white/25 flex items-center justify-center text-xs font-bold text-white">
                      {userInitial}
                    </div>
                    <span className="text-sm font-medium text-white/90 max-w-[120px] truncate">
                      {profile?.full_name || "Account"}
                    </span>
                    <ChevronDown size={14} className={`text-white/50 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Hover Tooltip */}
                  {showTooltip && !profileOpen && (
                    <div className="absolute right-0 mt-2 min-w-[220px] bg-white border border-gray-100 rounded-xl shadow-xl p-4 pointer-events-none z-50">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm font-bold text-white shrink-0">{userInitial}</div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{displayName}</p>
                          <p className="text-xs text-gray-400 truncate">{userEmail}</p>
                        </div>
                      </div>
                      <span className={`inline-block text-[10px] px-2.5 py-1 rounded-full font-medium ${isWorker ? 'bg-violet-100 text-violet-600' : 'bg-blue-100 text-blue-600'}`}>
                        {isWorker ? "🔧" : "👤"} {roleBadgeText}
                      </span>
                    </div>
                  )}

                  {/* Click Dropdown */}
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-2xl py-1.5 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900 truncate">{displayName}</p>
                        <p className="text-xs text-gray-400 truncate mt-0.5">{userEmail}</p>
                        {profile?.role && (
                          <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full mt-1.5 font-medium ${isWorker ? 'bg-violet-100 text-violet-600' : 'bg-blue-100 text-blue-600'}`}>
                            {isWorker ? "🔧 Worker" : "👤 Customer"}
                          </span>
                        )}
                      </div>
                      <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                        <LayoutDashboard size={15} /> Dashboard
                      </Link>
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button id="navbar-logout-btn" onClick={(e) => { e.stopPropagation(); handleSignOut(); }}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer">
                          <LogOut size={15} /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/login" id="navbar-login-btn"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-all duration-200">
                    <LogIn size={15} /> Login
                  </Link>
                  <Link to="/register" id="navbar-register-btn"
                    className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-indigo-700 bg-white rounded-lg hover:bg-indigo-50 shadow-sm transition-all duration-300">
                    <UserPlus size={15} /> Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button id="navbar-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="px-4 pb-4 pt-2 border-t border-white/10 space-y-1" style={{ background: 'rgba(49, 46, 129, 0.97)' }}>
            {NAV_LINKS.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive(to) ? "text-white bg-white/20" : "text-white/70 hover:text-white hover:bg-white/10"
                }`}>
                <Icon size={18} /> {label}
              </Link>
            ))}
            <div className="border-t border-white/10 pt-3 mt-2">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 mb-2">
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold text-white">{userInitial}</div>
                    <div>
                      <p className="text-sm font-semibold text-white">{displayName}</p>
                      <p className="text-xs text-white/50">{roleBadgeText}</p>
                    </div>
                  </div>
                  <button onClick={handleSignOut}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer">
                    <LogOut size={18} /> Sign Out
                  </button>
                </>
              ) : (
                <div className="flex gap-3">
                  <Link to="/login" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white/80 border border-white/20 rounded-xl hover:bg-white/10 transition-colors">
                    <LogIn size={16} /> Login
                  </Link>
                  <Link to="/register" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-indigo-700 bg-white rounded-xl shadow-sm transition-colors">
                    <UserPlus size={16} /> Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="h-16" />
    </>
  );
};

export default Navbar;