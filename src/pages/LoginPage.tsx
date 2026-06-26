import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import Logo from "@/components/Logo";
import SiteFooter from "@/components/SiteFooter";

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
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 relative"
      style={{ background: "#0e0e0e", fontFamily: "'Inter', 'DM Sans', sans-serif" }}
    >
      <div className="absolute top-8 left-8">
        <Logo color="white" size={20} onClick={() => navigate("/")} />
      </div>

      <main className="flex flex-col w-full max-w-[380px]">
        <h1 className="text-white font-bold mb-8" style={{ fontSize: "clamp(40px, 5vw, 56px)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
          Sign in
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="login-email" className="block text-white text-[14px] font-semibold mb-2">Email address</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full rounded-xl px-4 py-3 text-white text-[14px] transition-colors placeholder:text-white/40 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0e0e]"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", outline: "none" }}
              onFocus={(e) => e.target.style.borderColor = "rgba(255,255,255,0.3)"}
              onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
            />
          </div>

          <div>
            <label htmlFor="login-password" className="block text-white text-[14px] font-semibold mb-2">Password</label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full rounded-xl px-4 py-3 text-white text-[14px] transition-colors placeholder:text-white/40 pr-10 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0e0e]"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", outline: "none" }}
                onFocus={(e) => e.target.style.borderColor = "rgba(255,255,255,0.3)"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
              >
                {showPassword ? <EyeOff size={15} aria-hidden="true" /> : <Eye size={15} aria-hidden="true" />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-5 pt-1">
            <button
              type="submit"
              disabled={loading}
              className="rounded-full px-6 py-2.5 text-[14px] font-semibold transition-all disabled:opacity-50"
              style={{ background: "rgba(255,255,255,0.9)", color: "#0e0e0e" }}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
            <button
              type="button"
              className="text-[14px] font-medium transition-colors"
              style={{ color: "rgba(255,255,255,0.70)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.90)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.70)")}
            >
              Forgot password?
            </button>
          </div>
        </form>

        <p className="mt-7 text-[14px]" style={{ color: "rgba(255,255,255,0.60)" }}>
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="font-medium transition-colors"
            style={{ color: "rgba(255,255,255,0.85)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
          >
            Sign up
          </button>
        </p>
      </main>

      <div className="absolute bottom-0 left-0 right-0">
        <SiteFooter />
      </div>
    </div>
  );
}
