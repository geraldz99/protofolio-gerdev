"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    setLoading(true);

    try {
      if (!supabase) {
        setError(
          "Supabase belum dikonfigurasi. Silakan isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY di berkas .env.local terlebih dahulu."
        );
        return;
      }

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message || "Email atau password tidak sesuai.");
        return;
      }

      if (data.session) {
        window.location.href = "/admin";
      }
    } catch {
      setError("Terjadi kesalahan saat mencoba masuk.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6d4b1] text-[#2b211b] flex flex-col justify-between p-6 md:p-12 relative selection:bg-[#2b211b] selection:text-[#f6d4b1]">
      {/* Top Header */}
      <header className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#2b211b]/70 hover:text-[#c85628] font-mono text-xs font-semibold uppercase tracking-wider transition-colors"
        >
          <ArrowLeft size={15} />
          <span>Kembali</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#2b211b] text-[#f6d4b1] flex items-center justify-center font-mono font-bold text-xs">
            GF
          </div>
          <span className="font-mono text-xs text-[#c85628] font-bold tracking-widest uppercase">
            GERALDINE // ADMIN
          </span>
        </div>
      </header>

      {/* Main Login Form */}
      <main className="w-full max-w-sm mx-auto my-auto space-y-8 p-8 rounded-3xl bg-[#ebd0b5] border border-[#2b211b]/20 shadow-xl">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold font-serif tracking-tight text-[#2b211b] uppercase">
            Masuk Admin
          </h1>
          <p className="text-xs font-mono text-[#2b211b]/60">
            Portofolio & Sistem Administrasi
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600 text-xs font-mono text-center">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#2b211b]/80 block font-semibold">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@domain.com"
              required
              className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] placeholder-[#2b211b]/40 focus:outline-none focus:border-[#c85628] transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#2b211b]/80 block font-semibold">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-4 pr-10 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] placeholder-[#2b211b]/40 focus:outline-none focus:border-[#c85628] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2b211b]/40 hover:text-[#2b211b] transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 bg-[#c85628] text-[#f6d4b1] rounded-xl font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#a8441c] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 shadow-md"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className="text-center font-mono text-[11px] text-[#2b211b]/40">
        © Geraldine Firdaus
      </footer>
    </div>
  );
}
