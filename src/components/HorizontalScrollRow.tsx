import { useRef, useState, useEffect, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HorizontalScrollRowProps {
  children: ReactNode;
}

const HorizontalScrollRow = ({ children }: HorizontalScrollRowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      ro.disconnect();
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="group/scroll relative">
      {/* Left arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-[calc(50%-2rem)] z-10 h-8 w-8 rounded-full bg-background border border-border shadow-lg flex items-center justify-center opacity-0 group-hover/scroll:opacity-100 transition-opacity hover:scale-105"
          aria-label="Scroll left"
        >
          <ChevronLeft size={16} className="text-foreground" />
        </button>
      )}

      {/* Right arrow */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-[calc(50%-2rem)] z-10 h-8 w-8 rounded-full bg-background border border-border shadow-lg flex items-center justify-center opacity-0 group-hover/scroll:opacity-100 transition-opacity hover:scale-105"
          aria-label="Scroll right"
        >
          <ChevronRight size={16} className="text-foreground" />
        </button>
      )}

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {children}
      </div>
    </div>
  );
};

export default HorizontalScrollRow;
