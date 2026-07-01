'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { LogOut, Home, Settings } from 'lucide-react';

export function Header() {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-gradient-to-r from-primary to-secondary text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
          <span>🎨</span>
          Portfolio
        </Link>

        <nav className="flex items-center gap-6">
          {user ? (
            <>
              <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80">
                <Home size={20} />
                Dashboard
              </Link>
              <Link href="/settings" className="flex items-center gap-2 hover:opacity-80">
                <Settings size={20} />
                Settings
              </Link>
              <div className="flex items-center gap-3">
                <span>Welcome, {user.username}</span>
                <button
                  onClick={() => {
                    logout();
                    window.location.href = '/login';
                  }}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:opacity-80">
                Login
              </Link>
              <Link href="/signup" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
