import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Receipt,
  ArrowUpCircle,
  Target,
  UserCircle,
  LogOut,
  Menu,
  Sun,
  Moon,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import type { User } from "@supabase/supabase-js";

interface LayoutProps {
  children: React.ReactNode;
  user: User;
}

export default function Layout({ children, user }: LayoutProps) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const updateTheme = useCallback((isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.body.classList.remove("bg-gray-50");
      document.body.classList.add("bg-gray-900");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-gray-900");
      document.body.classList.add("bg-gray-50");
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const initialDarkMode = savedTheme !== "light";
    setIsDarkMode(initialDarkMode);
    updateTheme(initialDarkMode);
  }, [updateTheme]);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    updateTheme(newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0 w-64" : "translate-x-0 w-20"
        } transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 shadow-lg z-45`}
      >
        <div className="h-full flex flex-col">
          <div
            className={`flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-700 ${
              isSidebarOpen ? "justify-between" : "justify-center"
            }`}
          >
            <img
              src="/src/logo.png"
              alt="Ale logo"
              className={`${
                isSidebarOpen ? "w-8 h-8" : "w-10 h-10"
              } transition-all duration-300`}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            />
            {isSidebarOpen && (
              <>
                <span className="text-xl font-bold text-primary dark:text-primary-light">
                  Ale
                </span>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1 rounded-md hover:bg-primary-light dark:hover:bg-primary-dark"
                  aria-label="Collapse sidebar"
                >
                  <Menu className="w-6 h-6 text-primary dark:text-primary-light" />
                </button>
              </>
            )}
          </div>
          <nav className="flex-1 px-4 py-4 space-y-1">
            {["Expenses", "Income", "Goals"].map((item, index) => (
              <Link
                key={item}
                to={index === 0 ? "/" : `/${item.toLowerCase()}`}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive(index === 0 ? "/" : `/${item.toLowerCase()}`)
                    ? "bg-primary text-white dark:bg-primary-dark"
                    : "text-gray-600 dark:text-gray-300 hover:bg-primary-light dark:hover:bg-primary-dark hover:text-white"
                } ${isSidebarOpen ? "" : "justify-center"}`}
              >
                {index === 0 ? (
                  <Receipt className="w-5 h-5" />
                ) : index === 1 ? (
                  <ArrowUpCircle className="w-5 h-5" />
                ) : (
                  <Target className="w-5 h-5" />
                )}
                {isSidebarOpen && <span className="ml-2">{item}</span>}
              </Link>
            ))}
          </nav>
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div
              className={`flex items-center ${
                isSidebarOpen
                  ? "justify-between"
                  : "justify-center flex-col space-y-4"
              }`}
            >
              {isSidebarOpen && (
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <UserCircle className="w-5 h-5 mr-2" />
                  <span className="truncate">{user.email}</span>
                </div>
              )}
              <div
                className={`flex items-center ${
                  isSidebarOpen ? "space-x-2" : "space-y-2 flex-col"
                }`}
              >
                <button
                  onClick={toggleDarkMode}
                  className="text-primary dark:text-primary-light p-1 rounded-full hover:bg-primary-light dark:hover:bg-primary-dark transition-colors"
                  title={
                    isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                  }
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={() => supabase.auth.signOut()}
                  className="text-primary dark:text-primary-light p-1 rounded-full hover:bg-primary-light dark:hover:bg-primary-dark transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col ${
          isSidebarOpen ? "lg:pl-64" : "lg:pl-20"
        }`}
      >
        <main className="flex-1 py-8 px-6 overflow-y-auto text-gray-900 dark:text-primary-light">
          {children}
        </main>
      </div>
    </div>
  );
}
