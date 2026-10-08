import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FileText, 
  Crown, 
  Layout, 
  CreditCard, 
  LogOut, 
  User, 
  Menu, 
  X,
  Sparkles,
  PlusCircle
} from 'lucide-react';

export const Navbar = () => {
  const { user, isLoggedIn, isPremium, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur border-b border-slate-200 sticky top-0 z-50 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-slate-900 tracking-tight leading-none group-hover:text-indigo-600 transition-colors">
                ResumeBuilder
              </span>
              <span className="text-[11px] font-medium text-slate-500 tracking-wider uppercase mt-0.5">
                Pro Career Suite
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 font-medium text-sm text-slate-600">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/') ? 'text-indigo-600  font-semibold' : 'hover:text-indigo-600'
              }`}
            >
              Home
            </Link>

            {isLoggedIn && (
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-lg transition-colors ${
                  isActive('/dashboard') ? 'text-indigo-600  font-semibold' : 'hover:text-indigo-600 '
                }`}
              >
                Dashboard
              </Link>
            )}

            <Link
              to="/templates"
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                isActive('/templates') ? 'text-indigo-600  font-semibold' : 'hover:text-indigo-600'
              }`}
            >

              Templates
            </Link>

            <Link
              to="/pricing"
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                isActive('/pricing') ? 'text-indigo-600 font-semibold' : 'hover:text-indigo-600 '
              }`}
            >

              Pricing
            </Link>

            {isLoggedIn && (
              <Link
                to="/payment-history"
                className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                  isActive('/payment-history') ? 'text-indigo-600  font-semibold' : 'hover:text-indigo-600'
                }`}
              >

                Payments
              </Link>
            )}
          </div>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                {/* Plan Badge */}
                {isPremium ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                    <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    PRO
                  </span>
                ) : (
                  <Link
                    to="/pricing"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm hover:opacity-95 transition-opacity"
                  >
                    <Sparkles className="w-3 h-3" />
                    Upgrade to Pro
                  </Link>
                )}

                {/* User avatar & name */}
                <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
                  {user?.profileImageUrl ? (
                    <img
                      src={user.profileImageUrl}
                      alt={user?.name || 'User'}
                      className="w-8 h-8 rounded-full object-cover border border-slate-200"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-slate-800 max-w-[120px] truncate">
                    {user?.name || 'User'}
                  </span>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-200 transition-all hover:shadow"
                >
                  Get Started Free
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 font-medium hover:bg-slate-100"
          >
            Home
          </Link>
          {isLoggedIn && (
            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-slate-700 font-medium hover:bg-slate-100"
            >
              Dashboard
            </Link>
          )}
          <Link
            to="/templates"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 font-medium hover:bg-slate-100"
          >
            Templates
          </Link>
          <Link
            to="/pricing"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 font-medium hover:bg-slate-100"
          >
            Pricing
          </Link>
          {isLoggedIn && (
            <Link
              to="/payment-history"
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-slate-700 font-medium hover:bg-slate-100"
            >
              Payment History
            </Link>
          )}

          <div className="pt-2 border-t border-slate-100">
            {isLoggedIn ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm font-semibold text-slate-800">{user?.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-slate-100">
                    {user?.subscriptionPlan || 'FREE'}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-red-600 font-medium hover:bg-red-50"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center px-3 py-2 rounded-lg text-slate-700 border border-slate-300 font-medium text-sm"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center px-3 py-2 rounded-lg text-white bg-indigo-600 font-medium text-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
