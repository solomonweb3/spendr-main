import { motion, AnimatePresence } from "framer-motion";
import { useCookieConsent } from "@/hooks/useCookieConsent";

const SANS = "'DM Sans', sans-serif";
const OFF_WHITE = "#f0ede6";

export default function CookieConsent() {
  const { showBanner, accept, reject } = useCookieConsent();

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
          style={{ fontFamily: SANS }}
        >
          <div
            role="dialog"
            aria-label="Cookie consent"
            className="max-w-2xl mx-auto border border-white/[0.08] backdrop-blur-xl rounded-sm px-6 py-5 md:px-8 md:py-6 flex flex-col md:flex-row items-start md:items-center gap-5"
            style={{ background: "rgba(5,5,5,0.92)" }}
          >
            {/* Text */}
            <p
              className="text-[13px] font-light leading-relaxed flex-1"
              style={{ color: "rgba(255,255,255,0.70)" }}
            >
              We use cookies for essential site functionality and, with your consent, analytics to
              improve your experience. No tracking scripts run until you accept.{" "}
              <a
                href="/privacy#cookies"
                className="underline underline-offset-4 hover:text-white/80 transition-colors"
                style={{ color: OFF_WHITE }}
              >
                Privacy Policy
              </a>
            </p>

            {/* Buttons — equal visual weight per GDPR */}
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={reject}
                className="text-[11px] tracking-[0.15em] uppercase font-light border border-white/25 px-6 py-2.5 text-white hover:bg-white hover:text-black transition-all duration-300"
                style={{ fontFamily: SANS }}
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="text-[11px] tracking-[0.15em] uppercase font-light border border-white/25 px-6 py-2.5 bg-white text-black hover:bg-transparent hover:text-white transition-all duration-300"
                style={{ fontFamily: SANS }}
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
