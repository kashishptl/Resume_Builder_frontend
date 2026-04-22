'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  Plus,
  User,
  LogOut,
  Menu,
  X,
  Sparkles,
  Moon,
  Sun,
  Settings,
  Loader2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// ----------------------------------------------------------------------
// 1. Custom auth hook – reads user info from localStorage
// ----------------------------------------------------------------------
function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Read stored user data and token
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');

    if (token && (userName || userEmail)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser({
        name: userName || userEmail?.split('@')[0] || 'User',
        email: userEmail || '',
        avatarInitials: (
          userName ? userName.charAt(0) : userEmail?.charAt(0) || 'U'
        ).toUpperCase(),
      });
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    // Clear all authentication-related items
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('guestId');
    localStorage.removeItem('isGuest');
    window.location.href = '/signin';
  };

  return { user, isLoading, logout };
}

// ----------------------------------------------------------------------
// 2. Sidebar component (fully dynamic, plain JS)
// ----------------------------------------------------------------------
export default function Sidebar({ customNavigation }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { user, isLoading, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Default navigation items
  const defaultNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Resumes', href: '/my-resumes', icon: FileText },
    { name: 'Create Resume', href: '/create-resume', icon: Plus },
  ];

  // Admin-only items
  const adminNavigation = [
    { name: 'Admin Panel', href: '/admin', icon: Settings, roles: ['admin'] },
  ];

  // Build final navigation
  let navigation = customNavigation || defaultNavigation;
  if (user?.role === 'admin') {
    navigation = [...navigation, ...adminNavigation];
  }
  // Filter by role if the item defines a 'roles' array
  navigation = navigation.filter(
    (item) => !item.roles || (user?.role && item.roles.includes(user.role))
  );

  const isActive = (href) => pathname === href;
  const handleLinkClick = () => setIsMobileMenuOpen(false);

  // Loading state
  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 z-40 h-screen w-[260px] bg-slate-900/95 backdrop-blur-xl border-r border-slate-700/50 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-white animate-spin" />
      </div>
    );
  }

  // ------------------------------------------------------------------
  // Render UI
  // ------------------------------------------------------------------
  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 w-10 h-10 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center text-white"
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isMobileMenuOpen ? 0 : '-100%' }}
        className="lg:animate-none fixed top-0 left-0 z-40 h-screen w-[260px] bg-slate-900/95 backdrop-blur-xl border-r border-slate-700/50 lg:translate-x-0 transition-transform duration-300"
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white text-lg">Resume AI</h1>
              <p className="text-slate-400 text-xs">Build your future</p>
            </div>
          </div>

          {/* Dynamic navigation */}
          <nav className="flex-1 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    active
                      ? 'bg-gradient-to-r from-blue-500 to-violet-600 text-white shadow-lg shadow-blue-500/25'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User profile & settings */}
          <div className="space-y-2 mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold uppercase">
                    {user?.avatarInitials || user?.name?.charAt(0) || '?'}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-white">
                      {user?.name || 'Guest User'}
                    </p>
                    <p className="text-xs text-slate-400">
                      {user?.email || 'Not signed in'}
                    </p>
                  </div>
                  <Settings className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-56 bg-slate-800 border-slate-700 text-white"
              >
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer hover:bg-slate-700">
                    <User className="w-4 h-4 mr-2" />
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="cursor-pointer hover:bg-slate-700"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-4 h-4 mr-2" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 mr-2" />
                      Dark Mode
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem
                  onClick={() => logout()}
                  className="cursor-pointer hover:bg-slate-700 text-red-400"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.aside>
    </>
  );
}