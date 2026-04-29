"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4 py-8 bg-background safe-area-inset">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-3 border-primary shadow-lg shadow-primary/30">
            <Image
              src="/aarya-avatar.jpg"
              alt="Aarya"
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>
          <h1 className="text-2xl font-bold gradient-text">Aarya RK Social Chat</h1>
          <p className="text-muted-foreground mt-1 text-sm">Login karke Aarya se baat karo!</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-destructive/20 text-destructive p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl gradient-bg text-white font-semibold disabled:opacity-50 active:scale-[0.98] transition-transform"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <div className="mt-5 text-center space-y-3">
          <Link href="/auth/forgot-password" className="text-primary hover:underline text-sm block">
            Password bhul gaye?
          </Link>
          <p className="text-muted-foreground text-sm">
            Account nahi hai?{" "}
            <Link href="/auth/signup" className="text-primary font-medium hover:underline">
              Sign up karo
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
