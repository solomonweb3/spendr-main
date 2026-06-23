// Spendr Logo — triangle mark + wordmark
// color: "white" for dark backgrounds, "black" for light backgrounds

interface LogoProps {
  color?: "white" | "black" | undefined;
  size?: number;
  onClick?: () => void;
}

export default function Logo({ color = "white", size = 22, onClick }: LogoProps) {
  // undefined = uses CSS currentColor (responds to dark/light theme)
  const fill = color === undefined ? "currentColor" : color === "white" ? "#ffffff" : "#0a0a0a";
  const textColor = color === undefined ? "currentColor" : color === "white" ? "rgba(255,255,255,0.9)" : "rgba(10,10,10,0.85)";

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 select-none"
      style={{ background: "none", border: "none", padding: 0 }}
    >
      {/* Triangle mark */}
      <svg
        aria-hidden="true"
        width={size}
        height={size * 0.88}
        viewBox="0 0 100 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="50,2 98,86 2,86"
          fill={fill}
        />
      </svg>

      {/* Wordmark */}
      <span
        style={{
          fontFamily: "'DM Sans', 'Inter', sans-serif",
          fontSize: `${size * 0.68}px`,
          fontWeight: 500,
          letterSpacing: "0.04em",
          color: textColor,
          lineHeight: 1,
        }}
      >
        spendr
      </span>
    </button>
  );
}
