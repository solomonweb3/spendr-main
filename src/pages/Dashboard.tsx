import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User, Sun, Moon, Star, Heart, Search } from "lucide-react";
import { useTheme } from "next-themes";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import Logo from "@/components/Logo";
import { useListings } from "@/hooks/useListings";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  { label: "Stays",            type: "Stay"       },
  { label: "Private Aviation", type: "PrivateJet"  },
  { label: "Exotic Cars",      type: "Rental"      },
  { label: "Experiences",      type: "Experience"  },
];

const CITIES = ["All", "Miami, FL", "Los Angeles, CA", "New York, NY", "Las Vegas, NV"];
const CRYPTOS = ["All", "BTC", "ETH", "SOL", "USDC", "USDT"];

// ─── Card ─────────────────────────────────────────────────────────────────────
function ListingCard({ listing, isFav, onFav }: { listing: any; isFav: boolean; onFav: (id: number) => void }) {
  const navigate = useNavigate();
  return (
    <div className="group flex flex-col" onClick={() => navigate(`/listing/${listing.id}`)} style={{ cursor: "none" }}>
      {/* Image */}
      <div className="relative overflow-hidden rounded-xl mb-4 bg-muted" style={{ aspectRatio: "4/3" }}>
        <img
          src={listing.image}
          alt={listing.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        {listing.tag && (
          <span className="absolute top-3 left-3 bg-background text-foreground text-[11px] font-semibold px-2.5 py-1 rounded-full tracking-wide shadow-sm">
            {listing.tag}
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onFav(listing.id); }}
          className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors shadow-sm"
          style={{ cursor: "none" }}
        >
          <Heart size={14} className={isFav ? "fill-red-500 text-red-500" : "text-muted-foreground"} />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 px-0.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground text-[15px] leading-snug truncate">{listing.name}</h3>
          <div className="flex items-center gap-0.5 flex-shrink-0 mt-0.5">
            <Star size={12} className="fill-foreground text-foreground" />
            <span className="text-[13px] font-medium text-foreground">{listing.rating}</span>
          </div>
        </div>
        <p className="text-muted-foreground text-[13px] truncate">{listing.location}</p>
        <p className="text-foreground text-[13px] font-medium mt-0.5">
          {listing.price} <span className="text-muted-foreground font-normal">· {listing.reviews} reviews</span>
        </p>
        <div className="flex flex-wrap gap-1 mt-1.5">
          {(listing.accepted_crypto || []).slice(0, 3).map((c: string) => (
            <span key={c} className="text-[10px] font-medium bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">{c}</span>
          ))}
          {(listing.accepted_crypto || []).length > 3 && (
            <span className="text-[10px] font-medium bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
              +{listing.accepted_crypto.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [activeType, setActiveType] = useState("Stay");
  const [activeCity, setActiveCity] = useState("All");
  const [activeCrypto, setActiveCrypto] = useState("All");
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { data: listings, isLoading } = useListings();
  const { theme, setTheme } = useTheme();

  const toggleFav = (id: number) =>
    setFavorites((p) => p.includes(id) ? p.filter((f) => f !== id) : [...p, id]);

  const filtered = (listings || []).filter((l) => {
    if (l.type !== activeType) return false;
    if (activeCity !== "All" && !l.location.includes(activeCity.split(",")[0])) return false;
    if (activeCrypto !== "All" && !(l.accepted_crypto || []).includes(activeCrypto)) return false;
    if (search && !l.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}>

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between h-[72px] px-6 md:px-10 lg:px-16">
          <Logo size={20} onClick={() => navigate("/")} />

          <nav className="hidden md:flex items-center h-full">
            {CATEGORIES.map((cat) => {
              const isActive = activeType === cat.type;
              return (
                <button
                  key={cat.type}
                  onClick={() => { setActiveType(cat.type); setActiveCity("All"); }}
                  className={`relative flex items-center justify-center px-5 h-full text-[13px] font-medium transition-colors ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  style={{ cursor: "none" }}
                >
                  {cat.label}
                  {isActive && (
                    <motion.div
                      layoutId="tab-line"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-foreground rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              className="hidden md:flex items-center gap-2 border border-border rounded-full px-4 py-2 text-[13px] font-medium text-foreground hover:shadow-md transition-all"
              style={{ cursor: "none" }}
            >
              List a Business
            </button>
            <Popover>
              <PopoverTrigger asChild>
                <button className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:shadow-md transition-all" style={{ cursor: "none" }}>
                  <User size={15} className="text-muted-foreground" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" sideOffset={8} className="w-56 p-3 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-border">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs font-semibold">
                      {user?.email?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-[13px] font-medium text-foreground truncate">{user?.email}</p>
                </div>
                <div className="space-y-0.5">
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="w-full flex items-center gap-2.5 text-[13px] font-medium text-foreground bg-secondary hover:bg-accent rounded-lg px-3 py-2.5 transition-colors border border-border"
                    style={{ cursor: "none" }}
                  >
                    {theme === "dark" ? <Sun size={14} className="text-foreground" /> : <Moon size={14} className="text-foreground" />}
                    {theme === "dark" ? "Light mode" : "Dark mode"}
                  </button>
                  <button
                    onClick={async () => { await signOut(); navigate("/"); }}
                    className="w-full flex items-center gap-2.5 text-[13px] text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg px-3 py-2 transition-colors"
                    style={{ cursor: "none" }}
                  >
                    <LogOut size={14} /> Sign out
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>

      {/* ── Filter bar ── */}
      <div className="sticky top-[72px] z-40 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="px-6 md:px-10 lg:px-16 py-3 flex flex-wrap items-center gap-3">
          {/* City pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {CITIES.map((city) => (
              <button
                key={city}
                onClick={() => setActiveCity(city)}
                className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                  activeCity === city
                    ? "bg-foreground text-background"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
                }`}
                style={{ cursor: "none" }}
              >
                {city === "All" ? "All Cities" : city.split(",")[0]}
              </button>
            ))}
          </div>

          <div className="w-px h-5 bg-border hidden md:block mx-1" />

          {/* Crypto pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {CRYPTOS.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCrypto(c)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all border ${
                  activeCrypto === c
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted-foreground hover:border-foreground/40"
                }`}
                style={{ cursor: "none" }}
              >
                {c === "All" ? "All Crypto" : c}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="ml-auto relative hidden md:block">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="pl-8 pr-4 py-1.5 rounded-full border border-border bg-background text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground/40 transition-colors w-44"
              style={{ cursor: "none" }}
            />
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <main className="px-6 md:px-10 lg:px-16 py-10">
        <div className="flex items-baseline gap-4 mb-8">
          <h2 className="text-[22px] font-bold text-foreground">
            {CATEGORIES.find((c) => c.type === activeType)?.label}
          </h2>
          {!isLoading && (
            <span className="text-[13px] text-muted-foreground font-medium">{filtered.length} places</span>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="rounded-xl bg-muted mb-4" style={{ aspectRatio: "4/3" }} />
                <div className="h-4 bg-muted rounded mb-2 w-3/4" />
                <div className="h-3 bg-muted/50 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-2xl font-semibold text-muted-foreground mb-2">No listings found</p>
            <p className="text-[14px] text-muted-foreground">Try a different city or filter.</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeType + activeCity + activeCrypto + search}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {filtered.map((listing, i) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                >
                  <ListingCard listing={listing} isFav={favorites.includes(listing.id)} onFav={toggleFav} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}
