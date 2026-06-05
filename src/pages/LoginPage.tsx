import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Left — form */}
      <div className="flex flex-col bg-[#080808] px-10 md:px-16 lg:px-20 py-10">
        {/* Nav */}
        <div className="flex items-center justify-between mb-16">
          <button
            onClick={() => navigate("/")}
            className="text-white text-[24px] font-light tracking-[0.06em]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Spendr
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="text-[13px] text-white/50 hover:text-white transition-colors tracking-wide font-light"
          >
            No account? <span className="text-white border-b border-white/40 pb-px ml-1">Sign up</span>
          </button>
        </div>

        {/* Form */}
        <motion.div
          className="flex-1 flex flex-col justify-center max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-[11px] tracking-[0.28em] uppercase text-white/40 mb-5 font-light">Welcome back</p>
          <h1
            className="text-white text-[48px] md:text-[60px] leading-[0.95] font-light tracking-tight mb-10"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Sign in.
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase text-white/40 mb-3 font-light">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-12 bg-transparent border-b border-white/20 text-white text-[15px] font-light outline-none focus:border-white/60 transition-colors placeholder:text-white/20"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase text-white/40 mb-3 font-light">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-12 bg-transparent border-b border-white/20 text-white text-[15px] font-light outline-none focus:border-white/60 transition-colors placeholder:text-white/20 pr-10"
                  placeholder="••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <button
                type="button"
                className="mt-3 text-[12px] text-white/30 hover:text-white/60 transition-colors tracking-wide font-light"
              >
                Forgot password?
              </button>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-white text-black text-[13px] font-medium px-8 py-3 hover:bg-white/90 transition-colors tracking-wide disabled:opacity-50"
              >
                {loading ? "Signing in…" : "Sign in"} {!loading && <ArrowRight size={13} />}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Right — image */}
      <div className="hidden lg:block relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&h=1600&fit=crop&q=90"
          alt="Spendr"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to right, rgba(8,8,8,0.3) 0%, rgba(0,0,0,0) 50%)"
        }} />
        <div className="absolute bottom-12 left-12 right-12">
          <p
            className="text-white text-[28px] font-light leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}
          >
            "The world's first platform built for spending crypto on the extraordinary."
          </p>
        </div>
      </div>
    </div>
  );
}
