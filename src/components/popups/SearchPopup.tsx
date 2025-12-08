import { useState } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

interface SearchPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const popularSearches = ["Cleanser", "Moisturizer", "Serum", "Lotion", "Sunscreen"];

const trendingProducts = [
  { id: 1, name: "Hydra Drops Serum", price: "€8.90", image: product1 },
  { id: 2, name: "Glow Milk Lotion", price: "€9.90", image: product2 },
  { id: 3, name: "Gentle Foam Cleanser", price: "€7.50", image: product3 },
];

const SearchPopup = ({ open, onOpenChange }: SearchPopupProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="top" className="h-auto max-h-[80vh] overflow-y-auto">
        <SheetHeader className="sr-only">
          <SheetTitle>Search</SheetTitle>
        </SheetHeader>
        
        <div className="container-kanva py-8">
          {/* Search Input */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-12 py-6 text-lg rounded-full border-2 border-border focus:border-foreground"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary rounded-full"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Popular Searches */}
          <div className="max-w-2xl mx-auto mb-8">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Popular Searches</h3>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="px-4 py-2 bg-secondary rounded-full text-sm hover:bg-secondary/80 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Trending Products */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">Trending Products</h3>
              <Link 
                to="/shop" 
                onClick={() => onOpenChange(false)}
                className="text-sm text-foreground flex items-center gap-1 hover:underline"
              >
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {trendingProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/shop/product/${product.id}`}
                  onClick={() => onOpenChange(false)}
                  className="group flex items-center gap-4 p-3 rounded-xl hover:bg-secondary transition-colors"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SearchPopup;
