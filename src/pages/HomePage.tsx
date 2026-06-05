import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

const ACCENT = "#E8E0D5";
const TEXT_SHADOW = "0 2px 20px rgba(0,0,0,0.6)";

const sections = [
  {
    id: "stays",
    label: "Luxury Stays",
    heading: "Wake up somewhere\nextraordinary.",
    sub: "Private villas, penthouses, and estates across the world's most coveted destinations — all bookable with crypto.",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1800&h=1200&fit=crop&q=90",
    align: "left",
  },
  {
    id: "aviation",
    label: "Private Aviation",
    heading: "Your runway.\nYour schedule.",
    sub: "Charter a private jet or turboprop to anywhere on the globe. No queues, no compromises.",
    image: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1800&h=1200&fit=crop&q=90",
    align: "right",
  },
  {
    id: "cars",
    label: "Exotic Cars",
    heading: "Drive the car\nyou've earned.",
    sub: "Ferraris, Lamborghinis, Bentleys — rent by the day or the week. Pick up in Miami, LA, Dubai, and beyond.",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1800&h=1200&fit=crop&q=90",
    align: "left",
  },
  {
    id: "experiences",
    label: "Experiences",
    heading: "Spend crypto on\nthe unforgettable.",
    sub: "Michelin-starred dining, superyacht charters, exclusive events, and bespoke concierge services.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1800&h=1200&fit=crop&q=90",
    align: "right",
  },
];

function useInView(threshold = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
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

function SectionBlock({ section }: { section: typeof sections[0] }) {
  const { ref, inView } = useInView(0.2);
  const isLeft = section.align === "left";

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.06 }}
        animate={inView ? { scale: 1 } : { scale: 1.06 }}
        transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <img src={section.image} alt={section.label} className="w-full h-full object-cover" />
        {/* Strong gradient overlay for text legibility */}
        <div className="absolute inset-0" style={{
          background: isLeft
            ? "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.15) 100%)"
            : "linear-gradient(to left, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.15) 100%)"
        }} />
      </motion.div>

      <motion.div
        className="absolute top-10 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-white font-light" style={{ fontFamily: "'DM Sans', sans-serif", textShadow: TEXT_SHADOW }}>
          {section.label}
        </span>
      </motion.div>

      <div className={`absolute inset-0 z-10 flex flex-col justify-center px-12 md:px-20 lg:px-28 ${isLeft ? "items-start text-left" : "items-end text-right"}`}>
        <motion.h2
          className="text-white text-5xl md:text-6xl lg:text-[72px] font-light leading-[1.0] tracking-tight max-w-xl whitespace-pre-line"
          style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: TEXT_SHADOW }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {section.heading}
        </motion.h2>
        <motion.div
          className="mt-5 w-8 h-px"
          style={{ background: ACCENT, originX: isLeft ? 0 : 1 }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.45 }}
        />
        <motion.p
          className="mt-4 text-white text-[15px] leading-relaxed max-w-xs font-light"
          style={{ fontFamily: "'DM Sans', sans-serif", textShadow: "0 1px 12px rgba(0,0,0,0.8)", opacity: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 0.9, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {section.sub}
        </motion.p>
      </div>
    </section>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <div className="bg-[#080808]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-14 py-6">
        <span className="text-white text-[28px] font-light tracking-[0.06em] select-none" style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: TEXT_SHADOW }}>
          Spendr
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/login")}
            className="text-[13px] text-white hover:text-white/70 transition-colors px-4 py-2 font-light tracking-wide"
            style={{ fontFamily: "'DM Sans', sans-serif", textShadow: TEXT_SHADOW }}
          >
            Sign in
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="text-[13px] border border-white/60 text-white px-5 py-2 hover:bg-white hover:text-black transition-all duration-300 font-light tracking-wide backdrop-blur-sm"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Get started
          </button>
        </div>
      </header>

      {/* Hero */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: heroScale, y: heroY }}>
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2400&h=1600&fit=crop&q=90"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          {/* Multi-stop gradient: dark at bottom + vignette on sides */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.75) 100%)"
          }} />
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.4) 100%)"
          }} />
        </motion.div>

        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
          style={{ opacity: heroOpacity }}
        >
          <motion.p
            className="text-[10px] tracking-[0.35em] uppercase text-white mb-8 font-light"
            style={{ fontFamily: "'DM Sans', sans-serif", textShadow: TEXT_SHADOW, opacity: 0.8 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.4, duration: 1.2 }}
          >
            Welcome to Spendr
          </motion.p>
          <motion.h1
            className="text-white text-[64px] md:text-[96px] lg:text-[120px] leading-[0.92] tracking-[-0.02em] font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: "0 4px 30px rgba(0,0,0,0.7)" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Spend crypto
            <br />
            <em style={{ color: ACCENT }} className="not-italic">on the world.</em>
          </motion.h1>
          <motion.p
            className="mt-8 text-white text-[15px] md:text-base leading-relaxed max-w-md font-light tracking-wide"
            style={{ fontFamily: "'DM Sans', sans-serif", textShadow: TEXT_SHADOW, opacity: 0.85 }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 0.85, y: 0 }}
            transition={{ delay: 0.75, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Discover the world's finest stays, cars, jets, and experiences —
            all payable with your crypto.
          </motion.p>
          <motion.div
            className="mt-10 flex items-center gap-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.8 }}
          >
            <button
              onClick={() => navigate("/signup")}
              className="flex items-center gap-2 bg-white text-black text-[13px] font-medium px-8 py-3 hover:bg-white/90 transition-colors tracking-wide"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Request access <ArrowRight size={13} />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="text-[13px] text-white hover:text-white/70 transition-colors tracking-wide font-light border-b border-white/40 pb-px"
              style={{ fontFamily: "'DM Sans', sans-serif", textShadow: TEXT_SHADOW }}
            >
              Sign in
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          style={{ opacity: heroOpacity }}
        >
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/70" style={{ fontFamily: "'DM Sans', sans-serif", textShadow: TEXT_SHADOW }}>Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
            <ArrowDown size={13} className="text-white/70" />
          </motion.div>
        </motion.div>
      </section>

      {/* Intro */}
      <IntroText />

      {/* Feature sections */}
      {sections.map((s) => (
        <SectionBlock key={s.id} section={s} />
      ))}

      {/* Crypto band */}
      <CryptoBand />

      {/* Final CTA */}
      <CTASection navigate={navigate} />

      {/* Footer */}
      <footer className="px-12 md:px-20 py-10 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-white/40 text-lg font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Spendr</span>
        <p className="text-white/25 text-[11px] tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>© {new Date().getFullYear()} Spendr. All rights reserved.</p>
        <div className="flex gap-6 text-[11px] text-white/30" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
          <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
          <a href="#" className="hover:text-white/60 transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}

function IntroText() {
  const { ref, inView } = useInView(0.3);
  return (
    <section ref={ref} className="py-28 md:py-40 px-8 md:px-20 lg:px-32 max-w-5xl mx-auto">
      <motion.p
        className="text-white text-[32px] md:text-[52px] leading-[1.12] font-light tracking-tight"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        Crypto gave you financial freedom.
        <br />
        <span style={{ color: "rgba(255,255,255,0.4)" }}>Spendr gives you somewhere to spend it.</span>
      </motion.p>
      <motion.div
        className="mt-10 w-10 h-px"
        style={{ background: ACCENT, originX: 0 }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.5 }}
      />
    </section>
  );
}

const cryptos = [
  { symbol: "BTC", name: "Bitcoin" },
  { symbol: "ETH", name: "Ethereum" },
  { symbol: "SOL", name: "Solana" },
  { symbol: "USDC", name: "USD Coin" },
  { symbol: "USDT", name: "Tether" },
  { symbol: "BNB", name: "BNB" },
  { symbol: "XRP", name: "XRP" },
  { symbol: "MATIC", name: "Polygon" },
];

function CryptoBand() {
  const { ref, inView } = useInView(0.2);
  return (
    <section ref={ref} className="py-24 border-t border-white/[0.06]">
      <motion.p
        className="text-center text-[10px] tracking-[0.3em] uppercase text-white/50 mb-12 font-light"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        Accepted currencies
      </motion.p>
      <div className="flex flex-wrap justify-center gap-4 px-8">
        {cryptos.map((c, i) => (
          <motion.div
            key={c.symbol}
            className="flex items-center gap-2.5 px-5 py-2.5 border border-white/[0.12]"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.07 }}
          >
            <span className="text-white text-[13px] font-medium tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>{c.symbol}</span>
            <span className="text-white/40 text-[11px] font-light" style={{ fontFamily: "'DM Sans', sans-serif" }}>{c.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CTASection({ navigate }: { navigate: (path: string) => void }) {
  const { ref, inView } = useInView(0.3);
  return (
    <section ref={ref} className="relative h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1800&h=1000&fit=crop&q=90"
          alt="CTA"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.h2
          className="text-white text-[52px] md:text-[80px] leading-[0.95] tracking-tight font-light"
          style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: "0 4px 30px rgba(0,0,0,0.7)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Your next chapter
          <br />
          <em className="not-italic" style={{ color: ACCENT }}>starts here.</em>
        </motion.h2>
        <motion.p
          className="mt-6 text-white text-[14px] max-w-sm leading-relaxed font-light tracking-wide"
          style={{ fontFamily: "'DM Sans', sans-serif", opacity: 0.75 }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.75 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Join the waitlist for beta access. Be among the first to spend your crypto on the world.
        </motion.p>
        <motion.button
          onClick={() => navigate("/signup")}
          className="mt-10 flex items-center gap-2 bg-white text-black text-[13px] font-medium px-8 py-3 hover:bg-white/90 transition-colors tracking-wide"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          Request access <ArrowRight size={13} />
        </motion.button>
      </div>
    </section>
  );
}
