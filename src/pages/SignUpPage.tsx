import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import Logo from "@/components/Logo";
import SiteFooter from "@/components/SiteFooter";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast({ title: "Please agree to the Terms of Use", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await signUp(email, password);
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Check your email", description: "We sent you a confirmation link." });
      navigate("/login");
    }
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 relative"
      style={{ background: "#0e0e0e", fontFamily: "'Inter', 'DM Sans', sans-serif" }}
    >
      {/* Logo */}
      <div className="absolute top-8 left-8">
        <Logo color="white" size={20} onClick={() => navigate("/")} />
      </div>

        {/* Form content */}
        <main className="flex flex-col w-full max-w-[380px]">
          <h1 className="text-white font-bold mb-8" style={{ fontSize: "clamp(36px, 4.5vw, 52px)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Create account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="signup-name" className="block text-white text-[14px] font-semibold mb-2">Full name</label>
              <input
                id="signup-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-xl px-4 py-3 text-white text-[14px] placeholder:text-white/40 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0e0e]"
                style={{ ...inputStyle, outline: "none" }}
                onFocus={(e) => e.target.style.borderColor = "rgba(255,255,255,0.3)"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
              />
            </div>

            <div>
              <label htmlFor="signup-email" className="block text-white text-[14px] font-semibold mb-2">Email address</label>
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full rounded-xl px-4 py-3 text-white text-[14px] placeholder:text-white/40 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0e0e]"
                style={{ ...inputStyle, outline: "none" }}
                onFocus={(e) => e.target.style.borderColor = "rgba(255,255,255,0.3)"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
              />
            </div>

            <div>
              <label htmlFor="signup-password" className="block text-white text-[14px] font-semibold mb-2">Password</label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Min. 9 characters"
                  className="w-full rounded-xl px-4 py-3 text-white text-[14px] placeholder:text-white/40 pr-10 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0e0e]"
                  style={{ ...inputStyle, outline: "none" }}
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

            {/* Terms checkbox */}
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                role="checkbox"
                aria-checked={agreed}
                aria-label="I agree to the Terms of Use"
                onClick={() => setAgreed(!agreed)}
                className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center transition-all border focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0e0e]"
                style={{
                  background: agreed ? "white" : "transparent",
                  borderColor: agreed ? "white" : "rgba(255,255,255,0.2)",
                }}
              >
                {agreed && <span className="text-black text-[10px] font-bold" aria-hidden="true">✓</span>}
              </button>
              <span className="text-[13px]" style={{ color: "rgba(255,255,255,0.60)" }}>
                I agree to the{" "}
                <a href="/terms" className="underline" style={{ color: "rgba(255,255,255,0.85)" }}>Terms of Use</a>
              </span>
            </div>

            {/* Button row */}
            <div className="flex items-center gap-5 pt-1">
              <button
                type="submit"
                disabled={loading}
                className="rounded-full px-6 py-2.5 text-[14px] font-semibold transition-all disabled:opacity-50"
                style={{ background: "rgba(255,255,255,0.9)", color: "#0e0e0e" }}
              >
                {loading ? "Creating…" : "Create account"}
              </button>
            </div>
          </form>

          <p className="mt-6 text-[14px]" style={{ color: "rgba(255,255,255,0.60)" }}>
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-medium"
              style={{ color: "rgba(255,255,255,0.85)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
            >
              Sign in
            </button>
          </p>
        </main>

      <div className="absolute bottom-0 left-0 right-0">
        <SiteFooter />
      </div>
    </div>
  );
}
