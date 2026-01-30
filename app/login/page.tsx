"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter(); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
      } else {
        router.push("/dashboard"); 
      }
    } catch (error) {
      setMessage("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-950 via-blue-950 to-gray-950 text-white overflow-hidden relative">
      {/* Login container */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-linear-to-br from-gray-900/90 to-gray-950/90 backdrop-blur-xl p-8 rounded-2xl border border-gray-800/50 shadow-2xl shadow-purple-900/20">
          {/* Luxury header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-purple-600 to-indigo-700 mb-4 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-purple-300 to-indigo-200 bg-clip-text text-transparent">
              Admin Portal
            </h1>
            <p className="text-gray-400 mt-2 text-sm">Access your exclusive dashboard</p>
            
            {/* Decorative divider */}
            <div className="flex items-center justify-center mt-6">
              <div className="h-px w-12 bg-linear-to-r from-transparent to-gray-700"></div>
              <div className="mx-3 text-gray-600">✧</div>
              <div className="h-px w-12 bg-linear-to-l from-transparent to-gray-700"></div>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 p-3 rounded-lg bg-gray-900/70 border border-gray-700/50 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-900/30 focus:outline-none transition-all duration-300"
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {username && (
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 p-3 rounded-lg bg-gray-900/70 border border-gray-700/50 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-900/30 focus:outline-none transition-all duration-300"
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {password && (
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Error/Success message */}
            {message && (
              <div className={`p-3 rounded-lg border ${message.includes("error") || message.includes("invalid") ? "bg-red-900/20 border-red-800/50" : "bg-blue-900/20 border-blue-800/50"}`}>
                <div className="flex items-center">
                  <svg className={`h-5 w-5 mr-2 ${message.includes("error") || message.includes("invalid") ? "text-red-400" : "text-blue-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm">{message}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg bg-linear-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-purple-900/50 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 font-medium shadow-lg shadow-purple-900/30 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating...
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Luxury footer note */}
          <div className="mt-8 pt-6 border-t border-gray-800/50 text-center">
            <p className="text-xs text-gray-500">
              Secure access to privileged content • Powered by Next.js
            </p>
            <div className="flex justify-center space-x-3 mt-4">
              <div className="h-1 w-1 rounded-full bg-gray-700"></div>
              <div className="h-1 w-1 rounded-full bg-gray-700"></div>
              <div className="h-1 w-1 rounded-full bg-purple-500"></div>
              <div className="h-1 w-1 rounded-full bg-gray-700"></div>
              <div className="h-1 w-1 rounded-full bg-gray-700"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animation styles */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </main>
  );
}