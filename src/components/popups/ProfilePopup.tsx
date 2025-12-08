import { User, Settings, ShoppingBag, Heart, LogOut, CreditCard, MapPin } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

interface ProfilePopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const menuItems = [
  { icon: ShoppingBag, label: "My Orders", href: "/orders" },
  { icon: Heart, label: "Wishlist", href: "/wishlist" },
  { icon: MapPin, label: "Addresses", href: "/addresses" },
  { icon: CreditCard, label: "Payment Methods", href: "/payment" },
  { icon: Settings, label: "Account Settings", href: "/settings" },
];

const ProfilePopup = ({ open, onOpenChange }: ProfilePopupProps) => {
  // Mock user state - in real app this would come from auth context
  const isLoggedIn = false;
  const user = {
    name: "Jane Doe",
    email: "jane@example.com",
    avatar: "",
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-sm flex flex-col">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Account
          </SheetTitle>
        </SheetHeader>

        {!isLoggedIn ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-6 py-12">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center">
              <User className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-1">Welcome to Kanva</h3>
              <p className="text-sm text-muted-foreground">
                Sign in to access your account, track orders, and save your favorites.
              </p>
            </div>
            <div className="w-full space-y-3">
              <Button className="w-full" size="lg">
                Sign In
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                Create Account
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              By signing in, you agree to our{" "}
              <Link to="/terms" className="underline hover:text-foreground">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="underline hover:text-foreground">
                Privacy Policy
              </Link>
            </p>
          </div>
        ) : (
          <div className="flex-1 py-6">
            {/* User Info */}
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-secondary text-lg">
                  {user.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <Separator className="mb-6" />

            {/* Menu Items */}
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => onOpenChange(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-secondary transition-colors"
                >
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            <Separator className="my-6" />

            {/* Logout */}
            <button className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-destructive/10 transition-colors w-full text-destructive">
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ProfilePopup;
