import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Star, Car, Home, Plane, User, LogOut, Sun, Moon, MapPin, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import ListingCard from "@/components/ListingCard";
import HorizontalScrollRow from "@/components/HorizontalScrollRow";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import spendrLogo from "@/assets/spendr-logo.png";
import { useListings } from "@/hooks/useListings";
import newportDripLogo from "@/assets/newport-drip-logo.png";
import { listings as mockListings } from "@/data/listings";

const categories = [
  { icon: Home, label: "Stays" },
  { icon: Car, label: "Services" },
  { icon: Plane, label: "Travel" },
];


const Dashboard = () => {
  const [activeCategory, setActiveCategory] = useState("Stays");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>("Los Angeles");
  const [selectedCrypto, setSelectedCrypto] = useState<string>("all");
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { data: dbListings } = useListings();
  const { theme, setTheme } = useTheme();

  // Merge DB listings with mock listings, DB takes priority for Travel
  const allListings = [
    ...(dbListings || []).map((l) => ({
      id: l.id + 10000, // offset to avoid ID collision with mock
      name: l.name,
      location: l.location,
      price: l.price,
      rating: Number(l.rating),
      reviews: l.reviews,
      image: l.image,
      tag: l.tag || undefined,
      description: l.description || "",
      type: l.type,
      acceptedCrypto: l.accepted_crypto || [],
      images: [l.image],
      details: [],
    })),
    ...mockListings,
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl">
        <div className="flex items-center justify-between h-[100px] md:h-[110px] px-10 md:px-14 lg:px-20 xl:px-24">
          {/* Left: Logo */}
          <div className="flex items-center min-w-[160px]">
            <img src={spendrLogo} alt="Spendr" className="h-8 md:h-9 dark:invert-0 invert" />
          </div>

          {/* Center: Category Tabs */}
          <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-6 h-full">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={`relative flex flex-col items-center justify-center gap-1 px-4 md:px-5 h-full transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground/80"
                  }`}
                >
                  <Icon size={24} strokeWidth={isActive ? 2 : 1.5} />
                  <span className="text-[11px] md:text-xs font-medium whitespace-nowrap">{cat.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-foreground rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 min-w-[160px] justify-end">
            <Button
              variant="ghost"
              className="hidden md:flex text-sm font-medium text-foreground hover:bg-secondary rounded-full px-5 py-2"
            >
              List Your Business
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <button className="h-9 w-9 rounded-full border border-border bg-background flex items-center justify-center hover:shadow-md transition-all">
                  <User size={16} className="text-muted-foreground" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" sideOffset={8} className="w-64 p-4 z-[100]">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                      {user?.email?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{user?.email}</p>
                    <p className="text-xs text-muted-foreground">Signed in</p>
                  </div>
                </div>
                <div className="border-t border-border pt-3 space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  >
                    {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                    {theme === "dark" ? "Light mode" : "Dark mode"}
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
                    onClick={handleSignOut}
                  >
                    <LogOut size={16} />
                    Sign out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>

      {/* Location & Crypto Filter */}
      <div className="sticky top-[100px] md:top-[110px] z-40 bg-background/95 backdrop-blur-xl">
        <div className="flex items-center justify-center gap-3 px-10 md:px-14 lg:px-20 xl:px-24 py-3">
          {activeCategory !== "Travel" && ["Miami", "Los Angeles", "New York", "Europe"].map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(selectedCity === city ? null : city)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCity === city
                  ? "bg-foreground text-background"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {city}
            </button>
          ))}
          {activeCategory === "Travel" && (
            <span className="text-sm text-muted-foreground italic px-2">Charter to anywhere in the world</span>
          )}
          <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
            <SelectTrigger className="w-[160px] h-8 rounded-full text-sm">
              <SelectValue placeholder="All Crypto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Crypto</SelectItem>
              <SelectItem value="ETH">ETH</SelectItem>
              <SelectItem value="BTC">BTC</SelectItem>
              <SelectItem value="SOL">SOL</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Listings */}
      <main className="container py-8">
        {(() => {
          const categoryMap: Record<string, string[]> = {
            "Stays": ["Stay"],
            "Services": ["Rental"],
            "Travel": ["PrivateJet"],
          };
          const filtered = allListings.filter((listing) => {
            if (!(categoryMap[activeCategory] || []).includes(listing.type)) return false;
            if (activeCategory !== "Travel") {
              if (!selectedCity) return false;
              if (!listing.location.toLowerCase().includes(selectedCity.toLowerCase())) return false;
            }
            if (selectedCrypto !== "all") {
              return (listing.acceptedCrypto || []).includes(selectedCrypto);
            }
            return true;
          });

          if (filtered.length === 0) {
            return <p className="text-muted-foreground text-center py-12">No listings found for this category and location.</p>;
          }

          const mid = Math.ceil(filtered.length / 2);
          const rows = [filtered.slice(0, mid), filtered.slice(mid)].filter((r) => r.length > 0);

          return (
            <div className="space-y-6">
              {rows.map((row, idx) => (
                <HorizontalScrollRow key={idx}>
                  {row.map((listing) => (
                    <ListingCard
                      key={listing.id}
                      listing={listing}
                      isFavorite={favorites.includes(listing.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </HorizontalScrollRow>
              ))}
            </div>
          );
        })()}
      </main>
    </div>
  );
};

export default Dashboard;
