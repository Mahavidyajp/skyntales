import { useState } from "react";
import { Heart, X, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

interface WishlistPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const initialWishlistItems = [
  { id: 1, name: "Hydra Drops Serum", price: 8.90, originalPrice: 19.90, image: product1 },
  { id: 2, name: "Glow Milk Lotion", price: 9.90, originalPrice: 22.90, image: product2 },
  { id: 3, name: "Gentle Foam Cleanser", price: 7.50, originalPrice: 15.00, image: product3 },
];

const WishlistPopup = ({ open, onOpenChange }: WishlistPopupProps) => {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);

  const removeItem = (id: number) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Wishlist ({wishlistItems.length})
          </SheetTitle>
        </SheetHeader>

        {wishlistItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 py-12">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-center">
              Your wishlist is empty.<br />
              Start adding your favorite products!
            </p>
            <Button onClick={() => onOpenChange(false)} asChild>
              <Link to="/shop">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {wishlistItems.map((item) => (
              <div key={item.id} className="group relative p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-3 right-3 p-1.5 bg-background rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-secondary"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
                
                <Link 
                  to={`/shop/product/${item.id}`}
                  onClick={() => onOpenChange(false)}
                  className="flex gap-4"
                >
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 py-1">
                    <h4 className="font-medium text-foreground mb-1">{item.name}</h4>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-semibold">€{item.price.toFixed(2)}</span>
                      <span className="text-sm text-muted-foreground line-through">
                        €{item.originalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </Link>
                
                <Button 
                  size="sm" 
                  className="w-full mt-2 gap-2"
                  onClick={(e) => {
                    e.preventDefault();
                    // Add to cart logic
                  }}
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default WishlistPopup;
