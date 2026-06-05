import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Share2, Star, MapPin, Grid3X3, Phone, Globe, Navigation, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useListing } from "@/hooks/useListings";
import { listings as mockListings } from "@/data/listings";
import { useState, useMemo } from "react";
import newportDripLogo from "@/assets/newport-drip-logo.png";

// Company info registry
const COMPANY_INFO: Record<string, { ids: number[]; name: string; address: string; phone: string; website: string; logo?: string }> = {
  "AMA Selections": {
    ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 31, 32, 33, 34, 35, 36],
    name: "AMA Selections",
    address: "Los Angeles, California, USA",
    phone: "+33 4 97 06 72 39",
    website: "https://amaselections.com",
  },
  "Jatina Group": {
    ids: [37, 38, 39, 40, 41, 42, 43, 44, 45],
    name: "Jatina Group",
    address: "7428 SW 48th St Suite 1, Miami, FL 33155",
    phone: "+1 (305) 351-1548",
    website: "https://jatinagroup.com",
  },
  "Newport Drip": {
    ids: [46, 47, 48, 49, 50, 51],
    name: "Newport Drip",
    address: "1966 Newport Blvd, Costa Mesa, CA 92627",
    phone: "(833) 697-3747",
    website: "https://newportdrip.com",
  },
  "MPH Club": {
    ids: Array.from({ length: 15 }, (_, i) => 52 + i),
    name: "MPH Club",
    address: "2001 NW 167th Street, Miami Gardens, Florida 33056",
    phone: "888-674-4044",
    website: "https://mphclub.com",
  },
  "Mercury Jets": {
    ids: Array.from({ length: 23 }, (_, i) => 226 + i),
    name: "Mercury Jets",
    address: "Global private jet charter — fly anywhere",
    phone: "+1 (212) 840-8000",
    website: "https://www.mercuryjets.com/",
  },
};

const getCompanyInfo = (dbId: number) => {
  for (const company of Object.values(COMPANY_INFO)) {
    if (company.ids.includes(dbId)) return company;
  }
  return null;
};

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const numId = Number(id);
  
  // Try DB listing first (IDs offset by 10000 in dashboard)
  const { data: dbListing } = useListing(numId >= 10000 ? numId - 10000 : numId);
  const mockListing = mockListings.find((l) => l.id === numId);
  
  const listing = numId >= 10000 && dbListing
    ? {
        ...dbListing,
        id: numId,
        rating: Number(dbListing.rating),
        tag: dbListing.tag || undefined,
        description: dbListing.description || "",
        acceptedCrypto: dbListing.accepted_crypto || [],
        images: [dbListing.image],
        details: [],
      }
    : mockListing || null;
    
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Check if this is a Newport Drip listing
  // Check if this is a partner listing
  const realDbId = numId >= 10000 ? numId - 10000 : numId;
  const companyInfo = getCompanyInfo(realDbId);
  const isNewportDrip = companyInfo?.name === "Newport Drip";

  if (!listing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">Listing not found</h1>
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft size={16} /> Back to explore
          </Button>
        </div>
      </div>
    );
  }

  if (showAllPhotos) {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50 py-4">
          <div className="container flex items-center justify-between">
            <Button variant="ghost" onClick={() => setShowAllPhotos(false)}>
              <ArrowLeft size={16} /> Back
            </Button>
            <h2 className="font-display font-semibold text-foreground">{listing.name}</h2>
            <div className="w-20" />
          </div>
        </div>
        <div className="container py-8 space-y-4 max-w-4xl">
          {listing.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${listing.name} photo ${i + 1}`}
              className="w-full rounded-xl object-cover"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">{listing.name}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-foreground/70 hover:text-foreground">
              <Share2 size={16} /> <span className="hidden sm:inline">Share</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-foreground/70 hover:text-foreground"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart size={16} className={isFavorite ? "fill-primary text-primary" : ""} />
              <span className="hidden sm:inline">Save</span>
            </Button>
          </div>
        </div>

        {/* Photo Grid - Airbnb style */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 rounded-2xl overflow-hidden aspect-[2/1] md:aspect-[2.5/1]">
          <div className="md:col-span-2 md:row-span-2">
            <img
              src={listing.images[0]}
              alt={listing.name}
              className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setShowAllPhotos(true)}
            />
          </div>
          {listing.images.slice(1, 5).map((img, i) => (
            <div key={i} className="hidden md:block">
              <img
                src={img}
                alt={`${listing.name} ${i + 2}`}
                className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setShowAllPhotos(true)}
              />
            </div>
          ))}
          <button
            onClick={() => setShowAllPhotos(true)}
            className="absolute bottom-4 right-4 glass-card rounded-lg px-4 py-2 text-sm font-medium text-foreground flex items-center gap-2 hover:bg-secondary/80 transition-colors"
          >
            <Grid3X3 size={14} /> Show all photos
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-10">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-display font-semibold text-foreground">
                {listing.type} in {listing.location}
              </h2>
              <div className="flex items-center gap-3 mt-2 text-muted-foreground text-sm">
                <div className="flex items-center gap-1">
                  <Star size={14} className="fill-foreground text-foreground" />
                  <span className="text-foreground font-medium">{listing.rating}</span>
                </div>
                <span>·</span>
                <span>{listing.reviews} reviews</span>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>{listing.location}</span>
                </div>
              </div>
            </div>

            <div className="h-px bg-border/50" />

            <div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-3">About this place</h3>
              <p className="text-muted-foreground leading-relaxed">{listing.description}</p>
            </div>

            <div className="h-px bg-border/50" />

            <div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-4">What this place offers</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {listing.details.map((detail, i) => (
                  <div key={i} className="flex items-center gap-3 py-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="text-foreground/80 text-sm">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Info */}
            {companyInfo && (
              <>
                <div className="h-px bg-border/50" />
                <div>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                    Provided by
                    {isNewportDrip && <img src={newportDripLogo} alt="Newport Drip" className="h-[1.2em] w-auto inline-block" />}
                    {companyInfo.name}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Address</p>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(companyInfo.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          {companyInfo.address}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone size={18} className="text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Phone</p>
                        <a href={`tel:${companyInfo.phone}`} className="text-sm text-primary hover:underline">
                          {companyInfo.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Globe size={18} className="text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Website</p>
                        <a
                          href={companyInfo.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          {companyInfo.website}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sidebar Card */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl p-6 sticky top-24 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-display font-bold text-foreground">{listing.price}</span>
                  <span className="text-muted-foreground text-sm ml-1">price range</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star size={14} className="fill-foreground text-foreground" />
                  <span className="text-foreground font-medium">{listing.rating}</span>
                  <span className="text-muted-foreground">({listing.reviews})</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3">Accepted Crypto</h4>
                <div className="flex flex-wrap gap-2">
                  {listing.acceptedCrypto.map((coin) => (
                    <span
                      key={coin}
                      className="bg-secondary text-foreground/80 text-xs font-medium px-3 py-1.5 rounded-full"
                    >
                      {coin}
                    </span>
                  ))}
                </div>
              </div>

              {listing.type === "PrivateJet" ? (
                <Button
                  variant="glow"
                  size="lg"
                  className="w-full"
                  onClick={() => companyInfo && window.open(companyInfo.website, '_blank')}
                >
                  <Globe size={16} />
                  Charter This Jet
                </Button>
              ) : (
                <>
                  <Button
                    variant="glow"
                    size="lg"
                    className="w-full"
                    onClick={() => {
                      if (companyInfo) {
                        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(companyInfo.address)}`, '_blank');
                      }
                    }}
                  >
                    <Navigation size={16} />
                    Get Directions
                  </Button>

                  {companyInfo && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                      onClick={() => window.open(companyInfo.website, '_blank')}
                    >
                      <Globe size={16} />
                      Visit Website
                    </Button>
                  )}
                </>
              )}

              <p className="text-center text-xs text-muted-foreground">
                Prices include all fees
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
