import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Receipt,
  ArrowUpCircle,
  Target,
  UserCircle,
  LogOut,
  Menu,
  Sun,
  Moon,
  Landmark,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import type { User } from "@supabase/supabase-js";

interface LayoutProps {
  user: User | null;
  children: React.ReactNode;
}

export default function Layout({ children, user }: LayoutProps) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const userMenuRef = useRef<HTMLDivElement>(null);

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

    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [updateTheme]);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    updateTheme(newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 shadow-lg z-50 grid grid-cols-3 items-center px-4">
        <div className="flex items-center">
          <Image src="/logo.png" alt="Ale logo" width={32} height={32} />
        </div>
        <div className="flex items-center justify-center">
          <span className="text-xl font-bold text-black dark:text-white">
            Ale
          </span>
        </div>
        <div className="relative flex justify-end" ref={userMenuRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="p-2 rounded-full hover:bg-primary-light dark:hover:bg-primary-dark"
          >
            <UserCircle className="w-6 h-6 text-primary dark:text-primary-light" />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
                  {user?.email || "Guest"}
                </div>
                <button
                  onClick={toggleDarkMode}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                >
                  {isDarkMode ? (
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
                </button>
                <button
                  onClick={() => supabase.auth.signOut()}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 shadow-lg z-50">
        <nav className="h-full flex items-center justify-around">
          {["Expenses", "Income", "Goals", "Wealth"].map((item, index) => (
            <Link
              key={item}
              href={index === 0 ? "/" : `/${item.toLowerCase()}`}
              className={`flex flex-col items-center justify-center px-3 py-2 text-sm font-medium ${
                isActive(index === 0 ? "/" : `/${item.toLowerCase()}`)
                  ? "text-primary dark:text-primary"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {index === 0 ? (
                <Receipt className="w-5 h-5" />
              ) : index === 1 ? (
                <ArrowUpCircle className="w-5 h-5" />
              ) : index === 2 ? (
                <Target className="w-5 h-5" />
              ) : (
                <Landmark className="w-5 h-5" />
              )}
              <span className="mt-1 text-xs">{item}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:block fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0 w-64" : "translate-x-0 w-20"
        } transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 shadow-lg z-45`}
      >
        <div className="h-full flex flex-col">
          <div
            className={`flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-700 ${
              isSidebarOpen ? "justify-between" : "justify-center"
            }`}
          >
            <Image
              src="/logo.png"
              alt="Ale logo"
              width={isSidebarOpen ? 32 : 40}
              height={isSidebarOpen ? 32 : 40}
              className="transition-all duration-300"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            />
            {isSidebarOpen && (
              <>
                <span className="text-xl font-bold text-black dark:text-white">
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
            {["Expenses", "Income", "Goals", "Wealth"].map((item, index) => (
              <Link
                key={item}
                href={index === 0 ? "/" : `/${item.toLowerCase()}`}
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
                ) : index === 2 ? (
                  <Target className="w-5 h-5" />
                ) : (
                  <Landmark className="w-5 h-5" />
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
                  <span className="truncate">{user?.email || "Guest"}</span>
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
        <main className="flex-1 py-8 px-6 overflow-y-auto text-gray-900 dark:text-primary-light mt-16 mb-16 lg:mt-0 lg:mb-0">
          {children}
        </main>
      </div>
    </div>
  );
}
