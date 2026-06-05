import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShimmerButton } from "@/components/ui/shimmer-button";

function Hero() {
  const navigate = useNavigate();
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["hotels", "stores", "cars", "restaurants", "experiences"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-12 lg:py-16 items-center justify-center flex-col">
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-display">
              <span className="text-black font-serif italic">
                using your crypto for
              </span>
              <span className="relative flex w-full justify-center overflow-hidden text-center h-[1.2em] md:h-[1.3em]">
                <AnimatePresence mode="wait">
                  {titles.map((title, index) =>
                    index === titleNumber ? (
                      <motion.span
                        key={index}
                        className="absolute font-serif italic text-hero-gold"
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{
                          type: "spring",
                          stiffness: 150,
                          damping: 20,
                        }}
                      >
                        {title}
                      </motion.span>
                    ) : null
                  )}
                </AnimatePresence>
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-black/60 max-w-2xl text-center">
              Sign up for beta access to discover locations worldwide where you
              can spend your crypto
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export { Hero };
