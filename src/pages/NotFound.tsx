import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SERIF = "'Cormorant Garamond', serif";
const SANS  = "'DM Sans', sans-serif";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-start justify-end px-8 md:px-14 pb-20" style={{ background: "#050505" }}>
      <motion.p
        className="text-[10px] tracking-[0.3em] uppercase mb-6"
        style={{ fontFamily: SANS, color: "rgba(255,255,255,0.25)" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
      >
        Error 404
      </motion.p>
      <div className="overflow-hidden mb-8">
        <motion.h1
          className="font-light leading-[0.9]"
          style={{ fontFamily: SERIF, fontSize: "clamp(80px, 14vw, 180px)", color: "#f0ede6" }}
          initial={{ y: "100%" }} animate={{ y: "0%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Page not<br />found.
        </motion.h1>
      </div>
      <motion.p
        className="font-light text-[15px] mb-10 max-w-sm"
        style={{ fontFamily: SANS, color: "rgba(255,255,255,0.35)" }}
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
      >
        The page you're looking for doesn't exist or has been moved.
      </motion.p>
      <motion.div
        className="flex items-center gap-8"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
      >
        <button
          onClick={() => navigate("/")}
          className="text-[12px] tracking-[0.2em] uppercase border border-white/25 px-8 py-3.5 text-white hover:bg-white hover:text-black transition-all duration-300"
          style={{ fontFamily: SANS, cursor: "none" }}
        >
          Go home
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-[12px] tracking-[0.2em] uppercase text-white/35 hover:text-white transition-colors"
          style={{ fontFamily: SANS, cursor: "none" }}
        >
          Explore →
        </button>
      </motion.div>
    </div>
  );
}
