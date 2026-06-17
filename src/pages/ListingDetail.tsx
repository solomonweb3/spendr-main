import { useParams, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { ArrowLeft, Star, MapPin, Globe, Phone, Heart } from "lucide-react";
import { useListing } from "@/hooks/useListings";
import { useState } from "react";
import { motion } from "framer-motion";

const SERIF = "'Cormorant Garamond', serif";
const SANS  = "'DM Sans', sans-serif";
const OFF_WHITE = "#f0ede6";

const TYPE_LABELS: Record<string, string> = {
  Stay:        "Luxury Stay",
  PrivateJet:  "Private Aviation",
  Rental:      "Exotic Car",
  Experience:  "Experience",
};

export default function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: listing, isLoading } = useListing(Number(id));
  const [isFav, setIsFav] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#050505" }}>
        <div className="w-8 h-8 border border-white/20 rounded-full animate-spin border-t-white/60" />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ background: "#050505" }}>
        <p className="font-light text-white/30" style={{ fontFamily: SERIF, fontSize: "48px" }}>Not found.</p>
        <button onClick={() => navigate("/dashboard")} className="text-[12px] tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors border-b border-white/20 pb-px" style={{ fontFamily: SANS }}>
          ← Back to explore
        </button>
      </div>
    );
  }

  const typeLabel = TYPE_LABELS[listing.type] || listing.type;
  const crypto = listing.accepted_crypto || [];

  return (
    <div className="min-h-screen" style={{ background: "#050505", color: OFF_WHITE, fontFamily: SANS }}>

      {/* ── Nav ── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-14 py-5"
        style={{ background: "rgba(5,5,5,0.9)", backdropFilter: "blur(12px)" }}>
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-3 text-white/40 hover:text-white transition-colors text-[12px] tracking-[0.15em] uppercase"
          style={{ fontFamily: SANS, cursor: "none" }}
        >
          <ArrowLeft size={14} /> Back
        </button>
        <Logo color="white" size={18} onClick={() => navigate("/")} />
        <button
          onClick={() => setIsFav(!isFav)}
          className="flex items-center gap-2 text-[12px] tracking-[0.15em] uppercase text-white/40 hover:text-white transition-colors"
          style={{ fontFamily: SANS, cursor: "none" }}
        >
          <Heart size={14} className={isFav ? "fill-white text-white" : ""} /> Save
        </button>
      </header>

      {/* ── Hero image ── */}
      <div className="relative w-full overflow-hidden" style={{ height: "70vh", marginTop: 0 }}>
        <motion.img
          src={listing.image}
          alt={listing.name}
          className="w-full h-full object-cover"
          initial={{ scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(5,5,5,0.2) 0%, rgba(5,5,5,0) 40%, rgba(5,5,5,0.8) 100%)" }} />

        {/* Overlay info */}
        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-14 pb-10">
          <motion.p
            className="text-[10px] tracking-[0.3em] uppercase text-white/50 mb-3"
            style={{ fontFamily: SANS }}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          >
            {typeLabel}
          </motion.p>
          <motion.h1
            className="font-light leading-[0.93] tracking-tight"
            style={{ fontFamily: SERIF, fontSize: "clamp(40px, 6vw, 80px)", color: OFF_WHITE, textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {listing.name}
          </motion.h1>
          <motion.div
            className="flex items-center gap-4 mt-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-1.5">
              <Star size={12} className="fill-white/60 text-white/60" />
              <span className="text-white/70 text-[13px]" style={{ fontFamily: SANS }}>{listing.rating} · {listing.reviews} reviews</span>
            </div>
            <span className="text-white/20">·</span>
            <div className="flex items-center gap-1.5 text-white/50 text-[13px]" style={{ fontFamily: SANS }}>
              <MapPin size={12} />
              {listing.location}
            </div>
            {listing.tag && (
              <>
                <span className="text-white/20">·</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/50 border border-white/20 px-2 py-0.5" style={{ fontFamily: SANS }}>{listing.tag}</span>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="px-8 md:px-14 lg:px-20 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16 max-w-7xl mx-auto">

        {/* Left — main info */}
        <div className="lg:col-span-2 space-y-12">

          {/* Description */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/25 mb-5" style={{ fontFamily: SANS }}>About</p>
            <p className="font-light leading-[1.8] text-white/60 text-[15px]" style={{ fontFamily: SANS }}>
              {listing.description || `${listing.name} is a premier ${typeLabel.toLowerCase()} service accepting cryptocurrency payments.`}
            </p>
          </motion.div>

          <div className="w-full h-px bg-white/[0.07]" />

          {/* Accepted crypto */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/25 mb-5" style={{ fontFamily: SANS }}>Accepted currencies</p>
            <div className="flex flex-wrap gap-3">
              {crypto.map((c) => (
                <div
                  key={c}
                  className="border border-white/[0.12] px-5 py-2.5"
                >
                  <span className="text-[13px] tracking-[0.15em] font-light text-white/70" style={{ fontFamily: SANS }}>{c}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="w-full h-px bg-white/[0.07]" />

          {/* Details grid */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/25 mb-5" style={{ fontFamily: SANS }}>Details</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { label: "Category", value: typeLabel },
                { label: "Location", value: listing.location },
                { label: "Price Range", value: listing.price },
                { label: "Rating", value: `${listing.rating} / 5.0` },
                { label: "Reviews", value: `${listing.reviews} verified` },
                { label: "Cryptos", value: `${crypto.length} accepted` },
              ].map((d) => (
                <div key={d.label}>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-white/25 mb-1.5" style={{ fontFamily: SANS }}>{d.label}</p>
                  <p className="font-light text-white/70 text-[14px]" style={{ fontFamily: SANS }}>{d.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right — booking card */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="sticky top-24 border border-white/[0.08] p-8 space-y-8">
            {/* Price */}
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/25 mb-3" style={{ fontFamily: SANS }}>Price range</p>
              <p className="font-light" style={{ fontFamily: SERIF, fontSize: "48px", color: OFF_WHITE, lineHeight: 1 }}>{listing.price}</p>
            </div>

            <div className="w-full h-px bg-white/[0.07]" />

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Star size={14} className="fill-white/50 text-white/50" />
                <span className="text-white/70 text-[15px] font-light" style={{ fontFamily: SANS }}>{listing.rating}</span>
              </div>
              <span className="text-white/20">·</span>
              <span className="text-white/35 text-[13px]" style={{ fontFamily: SANS }}>{listing.reviews} reviews</span>
            </div>

            <div className="w-full h-px bg-white/[0.07]" />

            {/* Crypto */}
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/25 mb-4" style={{ fontFamily: SANS }}>Pay with</p>
              <div className="flex flex-wrap gap-2">
                {crypto.map((c) => (
                  <span key={c} className="text-[11px] tracking-[0.15em] uppercase border border-white/[0.1] text-white/50 px-3 py-1.5" style={{ fontFamily: SANS }}>{c}</span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              className="w-full py-4 bg-white text-black text-[12px] tracking-[0.2em] uppercase font-medium hover:bg-white/90 transition-colors"
              style={{ fontFamily: SANS, cursor: "none" }}
              onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(listing.name)}`, "_blank")}
            >
              Book / Enquire →
            </button>

            <p className="text-center text-[11px] text-white/20 font-light" style={{ fontFamily: SANS }}>
              You'll be directed to the provider's website
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
