import { useEffect, useRef } from "react";

export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (ring.current) {
        ring.current.style.transform = `translate(${e.clientX - 18}px, ${e.clientY - 18}px)`;
      }
    };

    const onEnter = () => {
      if (ring.current) {
        ring.current.style.transform += " scale(1.8)";
        ring.current.style.opacity = "0.4";
      }
    };
    const onLeave = () => {
      if (ring.current) {
        ring.current.style.opacity = "1";
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.querySelectorAll("a, button, input").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ring}
      className="fixed top-0 left-0 w-[36px] h-[36px] rounded-full z-[9999] pointer-events-none"
      style={{
        // mix-blend-mode: difference inverts the color against any background
        // white circle → appears dark on light bg, light on dark bg
        border: "1.5px solid white",
        mixBlendMode: "difference",
        transition: "opacity 0.15s ease, transform 0s",
      }}
    />
  );
}
