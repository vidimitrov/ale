import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, Receipt, ArrowUpCircle, Target, UserCircle, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
}

export default function Layout({ children, user }: LayoutProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
            <Link to="/" className="flex items-center text-xl font-bold text-gray-900">
              <Wallet className="w-6 h-6 mr-2" />
              <span>Finance App</span>
            </Link>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-1">
            <Link
              to="/"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive('/') 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Receipt className="w-5 h-5 mr-2" />
              Expenses
            </Link>
            <Link
              to="/income"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive('/income')
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <ArrowUpCircle className="w-5 h-5 mr-2" />
              Income
            </Link>
            <Link
              to="/goals"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive('/goals')
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Target className="w-5 h-5 mr-2" />
              Goals
            </Link>
          </nav>
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600">
                <UserCircle className="w-5 h-5 mr-2" />
                <span className="truncate">{user.email}</span>
              </div>
              <button
                onClick={() => supabase.auth.signOut()}
                className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-100 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 py-8 px-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}