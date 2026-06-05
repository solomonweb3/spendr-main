import { Heart, Star, BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ListingCardProps {
  listing: {
    id: number;
    name: string;
    location: string;
    price: string;
    rating: number;
    reviews: number;
    image: string;
    tag?: string;
  };
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

const ListingCard = ({ listing, isFavorite, onToggleFavorite }: ListingCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="group cursor-pointer flex-shrink-0 w-[260px] sm:w-[270px] md:w-[280px]"
      onClick={() => navigate(`/listing/${listing.id}`)}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-2">
        <img
          src={listing.image}
          alt={listing.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {/* Favorite */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(listing.id);
          }}
          className="absolute top-2 right-2 p-1 rounded-full hover:scale-110 transition-transform"
        >
          <Heart
            size={18}
            className={
              isFavorite
                ? "fill-primary text-primary"
                : "text-foreground/80 drop-shadow-md"
            }
          />
        </button>
      </div>
      {/* Info */}
      <div className="space-y-0.5 px-0.5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground truncate pr-1 flex items-center gap-1">
            {listing.name}
            <BadgeCheck size={14} className="fill-primary text-primary-foreground flex-shrink-0" />
          </h3>
          <div className="flex items-center gap-0.5 text-xs flex-shrink-0">
            <Star size={12} className="fill-foreground text-foreground" />
            <span className="text-foreground">{listing.rating}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground truncate">{listing.location}</p>
        <p className="text-[13px] text-muted-foreground">
          {listing.price} · {listing.reviews} reviews
        </p>
      </div>
    </div>
  );
};

export default ListingCard;
