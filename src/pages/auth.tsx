import React from "react";
import { AuthForm } from "@/components/auth/AuthForm";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";

export default function AuthPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="Ale logo"
            width={80}
            height={80}
            className="mb-4"
          />
          <h1 className="text-4xl font-bold text-primary dark:text-primary-light">
            Ale
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Track your expenses and income with ease
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}
