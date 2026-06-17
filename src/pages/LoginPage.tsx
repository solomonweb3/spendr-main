import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import FluidGradient from "@/components/ui/fluid-gradient";
import Logo from "@/components/Logo";

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
      className="min-h-screen w-full flex"
      style={{ background: "#0e0e0e", fontFamily: "'Inter', 'DM Sans', sans-serif" }}
    >
      {/* ── Left — form ── */}
      <div className="flex-1 flex flex-col px-12 md:px-16 py-8 min-w-0">
        {/* Logo */}
        <div className="mb-auto">
          <Logo color="white" size={20} onClick={() => navigate("/")} />
        </div>

        {/* Form content — vertically centered */}
        <div className="flex-1 flex flex-col justify-center max-w-[340px]">
          <h1 className="text-white font-bold mb-8" style={{ fontSize: "clamp(40px, 5vw, 56px)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Sign in
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-white text-[14px] font-semibold mb-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full rounded-xl px-4 py-3 text-white text-[14px] outline-none transition-colors placeholder:text-white/25"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  cursor: "none",
                }}
                onFocus={(e) => e.target.style.borderColor = "rgba(255,255,255,0.3)"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
              />
            </div>

            <div>
              <label className="block text-white text-[14px] font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full rounded-xl px-4 py-3 text-white text-[14px] outline-none transition-colors placeholder:text-white/25 pr-10"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    cursor: "none",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "rgba(255,255,255,0.3)"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  style={{ cursor: "none" }}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Button row */}
            <div className="flex items-center gap-5 pt-1">
              <button
                type="submit"
                disabled={loading}
                className="rounded-full px-6 py-2.5 text-[14px] font-semibold transition-all disabled:opacity-50"
                style={{
                  background: "rgba(255,255,255,0.9)",
                  color: "#0e0e0e",
                  cursor: "none",
                }}
              >
                {loading ? "Signing in…" : "Sign in"}
              </button>
              <button
                type="button"
                className="text-[14px] font-medium transition-colors"
                style={{ color: "rgba(255,255,255,0.45)", cursor: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
              >
                Forgot password?
              </button>
            </div>
          </form>

          <p className="mt-7 text-[14px]" style={{ color: "rgba(255,255,255,0.35)" }}>
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="font-medium transition-colors"
              style={{ color: "rgba(255,255,255,0.65)", cursor: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
            >
              Sign up
            </button>
          </p>
        </div>

        <div className="mt-auto" />
      </div>

      {/* ── Right — animated fluid gradient ── */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 min-w-0">
        <div
          className="w-full overflow-hidden"
          style={{
            borderRadius: "24px",
            height: "calc(100vh - 64px)",
            maxHeight: "900px",
          }}
        >
          <FluidGradient />
        </div>
      </div>
    </div>
  );
}
