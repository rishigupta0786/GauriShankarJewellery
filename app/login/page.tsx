"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter(); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

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
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-900 p-6 rounded-xl w-80 space-y-4"
      >
        <h1 className="text-xl font-semibold text-center">Admin Login</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          required
        />

        <button className="w-full bg-indigo-600 py-2 rounded">
          Login
        </button>

        {message && (
          <p className="text-center text-sm mt-2">{message}</p>
        )}
      </form>
    </main>
  );
}
