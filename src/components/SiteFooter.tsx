import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";

const SANS = "'DM Sans', sans-serif";

interface SiteFooterProps {
  /** Use "light" on dark backgrounds (#050505), "themed" on bg-background pages */
  variant?: "light" | "themed";
}

export default function SiteFooter({ variant = "light" }: SiteFooterProps) {
  const navigate = useNavigate();

  const isThemed = variant === "themed";

  const borderClass = isThemed
    ? "border-t border-border"
    : "border-t border-white/[0.07]";

  const copyrightStyle = isThemed
    ? { fontFamily: SANS }
    : { fontFamily: SANS, color: "rgba(255,255,255,0.55)" };

  const copyrightClass = isThemed
    ? "text-[11px] tracking-[0.15em] font-light text-muted-foreground"
    : "text-[11px] tracking-[0.15em] font-light";

  const linkClass = isThemed
    ? "hover:text-foreground transition-colors text-muted-foreground"
    : "hover:text-white/80 transition-colors text-white/60";

  return (
    <footer
      className={`${borderClass} px-8 md:px-14 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6`}
    >
      <Logo
        color={isThemed ? undefined : "white"}
        size={16}
        onClick={() => navigate("/")}
      />
      <p className={copyrightClass} style={copyrightStyle}>
        © {new Date().getFullYear()} Spendr — All rights reserved
      </p>
      <nav aria-label="Footer" className="flex gap-8 text-[11px] tracking-[0.15em] uppercase font-light" style={{ fontFamily: SANS }}>
        <Link to="/privacy" className={linkClass}>Privacy</Link>
        <Link to="/terms" className={linkClass}>Terms</Link>
        <Link to="/terms#affiliate" className={linkClass}>Affiliate Disclosure</Link>
      </nav>
    </footer>
  );
}
