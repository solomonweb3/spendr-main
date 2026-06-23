import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Logo from "@/components/Logo";
import heroImg from "@/assets/hero.jpg";
import aviationImg from "@/assets/cars.webp";
import experiencesImg from "@/assets/experiences.jpg";

// ─── Constants ────────────────────────────────────────────────────────────────
const SERIF = "'Cormorant Garamond', serif";
const SANS  = "'DM Sans', sans-serif";
const OFF_WHITE = "#f0ede6";

// ─── Intersection hook ────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Line reveal (text clips up from bottom) ─────────────────────────────────
function LineReveal({
  children,
  delay = 0,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { ref, inView } = useInView(0.1);
  return (
    <div ref={ref as React.Ref<HTMLDivElement>} className="overflow-hidden">
      <motion.div
        className={className}
        style={style}
        initial={{ y: "100%", opacity: 0 }}
        animate={inView ? { y: "0%", opacity: 1 } : {}}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── Scroll progress bar ──────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-px bg-white/30 z-[100] origin-left"
      style={{ scaleX }}
    />
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav({ navigate }: { navigate: (p: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-14 py-7 transition-all duration-500"
      style={{ background: scrolled ? "rgba(5,5,5,0.9)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none" }}
    >
      <Logo color="white" size={20} onClick={() => navigate("/")} />
      <div className="flex items-center gap-6">
        <button
          onClick={() => navigate("/login")}
          className="text-[12px] tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors font-light"
          style={{ fontFamily: SANS }}
        >
          Sign in
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="text-[12px] tracking-[0.15em] uppercase text-white border border-white/30 px-5 py-2.5 hover:bg-white hover:text-black transition-all duration-300 font-light"
          style={{ fontFamily: SANS }}
        >
          Join
        </button>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y       = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  // Staggered word reveal on load
  const words = ["Spend", "crypto", "on", "the", "world."];

  return (
    <section ref={ref} className="relative h-screen w-full flex flex-col justify-end pb-20 px-8 md:px-14 overflow-hidden">
      {/* Background image with parallax */}
      {/* Single image — scroll parallax + slow cloud drift combined */}
      <div className="absolute inset-0 z-0 bg-black" />

      <motion.div className="relative z-10" style={{ opacity }}>
        {/* Eyebrow */}
        <motion.p
          className="text-[10px] tracking-[0.4em] uppercase mb-8 font-light"
          style={{ fontFamily: SANS, color: "rgba(255,255,255,0.4)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Est. 2026 — Beta
        </motion.p>

        {/* Main headline — word by word */}
        <div className="overflow-hidden">
          <div className="flex flex-wrap gap-x-[0.25em]" style={{ fontFamily: SERIF, fontSize: "clamp(64px, 10vw, 148px)", lineHeight: 0.92, fontWeight: 300, color: OFF_WHITE }}>
            {words.map((word, i) => (
              <motion.span
                key={word}
                className="inline-block"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.5 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <motion.div
          className="mt-10 flex items-end justify-between"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <p
            className="text-[13px] font-light leading-relaxed max-w-xs"
            style={{ fontFamily: SANS, color: "rgba(255,255,255,0.45)" }}
          >
            Luxury stays, private jets, yacht charters &<br />the world's finest — paid with your crypto.
          </p>
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <div className="w-px h-12 bg-white/20" />
            <span className="text-[9px] tracking-[0.3em] uppercase text-white/30" style={{ fontFamily: SANS }}>Scroll</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Count-up hook ────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 600, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    setCount(0);
    const steps = 40;
    const stepTime = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      setCount(Math.round((target * current) / steps));
      if (current >= steps) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [started, target, duration]);
  return count;
}

function StatItem({ target, suffix, label, delay, started }: { target: number; suffix?: string; label: string; delay: number; started: boolean }) {
  const count = useCountUp(target, 500, started);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={started ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <p className="font-light leading-none mb-2" style={{ fontFamily: SERIF, fontSize: "clamp(36px, 4vw, 56px)", color: OFF_WHITE }}>
        {started ? count : 0}{suffix}
      </p>
      <p className="text-[11px] tracking-[0.2em] uppercase font-light text-white/30" style={{ fontFamily: SANS }}>{label}</p>
    </motion.div>
  );
}

// ─── Stats band ───────────────────────────────────────────────────────────────
function StatsBand() {
  const { ref, inView } = useInView(0.3);
  const stats = [
    { target: 4,   suffix: "",    label: "Categories" },
    { target: 8,   suffix: "",    label: "Cities" },
    { target: 300, suffix: "+",   label: "Destinations" },
    { target: 8,   suffix: "",    label: "Cryptos accepted" },
  ];
  return (
    <section ref={ref as React.Ref<HTMLElement>} className="border-t border-b border-white/[0.07] py-10 px-8 md:px-14">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <StatItem key={s.label} {...s} delay={i * 0.08} started={inView} />
        ))}
      </div>
    </section>
  );
}

// ─── Category sections ────────────────────────────────────────────────────────
const categories = [
  {
    num: "01",
    label: "Luxury Stays",
    sub: "Private villas, penthouses, and estates across the world's most coveted destinations.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&h=1000&fit=crop&q=90",
    focal: "center",
  },
  {
    num: "02",
    label: "Private Aviation",
    sub: "Charter a private jet or turboprop to any destination on the globe. Your schedule.",
    image: aviationImg,
    focal: "center",
  },
  {
    num: "03",
    label: "Charters",
    sub: "Private superyacht charters across the Mediterranean, Caribbean, and beyond — by the week or day.",
    image: experiencesImg,
    focal: "center",
  },
];

function CategorySection({ cat, index }: { cat: typeof categories[0]; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { inView } = useInView(0.15);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <section ref={ref} className="px-8 md:px-14 py-20 md:py-28 border-b border-white/[0.06]">
      <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-12 md:gap-16 items-start`}>
        {/* Image */}
        <div className="flex-[1.4] overflow-hidden" style={{ borderRadius: "2px" }}>
          <motion.div
            className="w-full"
            style={{ aspectRatio: "16/10" }}
            initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.06 }}
            animate={visible ? { clipPath: "inset(0% 0% 0% 0%)", scale: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={cat.image} alt={cat.label} className="w-full h-full object-cover" style={{ objectPosition: cat.focal }} />
          </motion.div>
        </div>

        {/* Text */}
        <div className={`flex-1 flex flex-col justify-between pt-2 ${isEven ? "" : ""}`} style={{ minHeight: "200px" }}>
          <div>
            <motion.p
              className="text-[10px] tracking-[0.35em] uppercase font-light mb-8"
              style={{ fontFamily: SANS, color: "rgba(255,255,255,0.25)" }}
              initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {cat.num}
            </motion.p>

            <div className="overflow-hidden mb-6">
              <motion.h2
                className="font-light leading-[0.95] tracking-tight"
                style={{ fontFamily: SERIF, fontSize: "clamp(42px, 5vw, 72px)", color: OFF_WHITE }}
                initial={{ y: "100%" }}
                animate={visible ? { y: "0%" } : {}}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {cat.label}
              </motion.h2>
            </div>

            <motion.div
              className="w-6 h-px mb-6"
              style={{ background: "rgba(255,255,255,0.2)", originX: 0 }}
              initial={{ scaleX: 0 }} animate={visible ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
            />

            <motion.p
              className="text-[14px] font-light leading-relaxed max-w-xs"
              style={{ fontFamily: SANS, color: "rgba(255,255,255,0.4)" }}
              initial={{ opacity: 0, y: 8 }} animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              {cat.sub}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Marquee band ─────────────────────────────────────────────────────────────
function MarqueeBand() {
  const items = ["BTC", "ETH", "SOL", "USDC", "USDT", "BNB", "XRP", "MATIC", "BTC", "ETH", "SOL", "USDC", "USDT", "BNB", "XRP", "MATIC"];
  return (
    <div className="border-t border-b border-white/[0.06] py-5 overflow-hidden">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {items.map((sym, i) => (
          <span key={i} className="text-[11px] tracking-[0.3em] uppercase font-light text-white/25 flex-shrink-0" style={{ fontFamily: SANS }}>
            {sym}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function CTASection({ navigate }: { navigate: (p: string) => void }) {
  const { ref, inView } = useInView(0.2);
  return (
    <section ref={ref as React.Ref<HTMLElement>} className="px-8 md:px-14 py-32 md:py-48 flex flex-col items-start">
      <LineReveal delay={0.1} className="text-[10px] tracking-[0.35em] uppercase font-light mb-10" style={{ fontFamily: SANS, color: "rgba(255,255,255,0.3)" }}>
        Ready to begin
      </LineReveal>

      <div className="overflow-hidden mb-12">
        <motion.h2
          className="font-light leading-[0.9] tracking-tight"
          style={{ fontFamily: SERIF, fontSize: "clamp(56px, 9vw, 140px)", color: OFF_WHITE }}
          initial={{ y: "100%" }}
          animate={inView ? { y: "0%" } : {}}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Your next chapter<br />starts here.
        </motion.h2>
      </div>

      <motion.button
        onClick={() => navigate("/signup")}
        className="group flex items-center gap-4 text-[13px] tracking-[0.15em] uppercase font-light border border-white/25 px-8 py-4 hover:bg-white hover:text-black transition-all duration-400"
        style={{ fontFamily: SANS, color: OFF_WHITE }}
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        Create account
        <motion.span
          className="inline-block"
          animate={{ x: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          →
        </motion.span>
      </motion.button>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ navigate }: { navigate: (p: string) => void }) {
  return (
    <footer className="border-t border-white/[0.07] px-8 md:px-14 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <Logo color="white" size={16} onClick={() => navigate("/")} />
      <p className="text-[11px] tracking-[0.15em] font-light text-white/20" style={{ fontFamily: SANS }}>
        © {new Date().getFullYear()} — All rights reserved
      </p>
      <div className="flex gap-8 text-[11px] tracking-[0.15em] uppercase font-light text-white/25" style={{ fontFamily: SANS }}>
        {["Privacy", "Terms", "Contact"].map((l) => (
          <a key={l} href="#" className="hover:text-white/60 transition-colors">{l}</a>
        ))}
      </div>
    </footer>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#050505", color: OFF_WHITE, fontFamily: SANS }}>
      <ScrollProgress />
      <Nav navigate={navigate} />
      <Hero />
      <StatsBand />
      {categories.map((cat, i) => (
        <CategorySection key={cat.num} cat={cat} index={i} />
      ))}
      <MarqueeBand />
      <CTASection navigate={navigate} />
      <Footer navigate={navigate} />
    </div>
  );
}
