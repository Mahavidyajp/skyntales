import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Plus,
  ChevronDown,
} from "lucide-react";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import SearchPopup from "@/components/popups/SearchPopup";
import CartPopup from "@/components/popups/CartPopup";
import WishlistPopup from "@/components/popups/WishlistPopup";
import ProfilePopup from "@/components/popups/ProfilePopup";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(
    null
  );
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navItems = [
    { label: "Shop", href: "/shop", hasDropdown: true },
    { label: "Collections", href: "/collections", hasDropdown: true },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const shopCategories = [
    { label: "All Products", href: "/shop" },
    { label: "Cleansers", href: "/shop/cleansers" },
    { label: "Lotions", href: "/shop/lotions" },
    { label: "Moisturizers", href: "/shop/moisturizers" },
  ];

  const shopProducts = [
    { name: "Hydra Drops", price: "8,90 €", image: product1 },
    { name: "Glow Milk", price: "9,90 €", image: product2 },
  ];

  const collectionCategories = [
    { label: "Cleansers", href: "/shop/cleansers", image: product1 },
    { label: "Lotions", href: "/shop/lotions", image: product2 },
    { label: "Moisturizers", href: "/shop/moisturizers", image: product3 },
  ];

  const toggleMobileSubmenu = (label: string) => {
    setOpenMobileSubmenu(openMobileSubmenu === label ? null : label);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
      <div className="mt-4 bg-background/95 backdrop-blur-sm h-18 rounded-lg shadow-sm border border-border/20 flex items-center">
        <div className="px-4 sm:px-6 w-full">
          <div className="flex items-center justify-between relative">
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() =>
                    item.hasDropdown && setActiveDropdown(item.label)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className="flex items-center gap-1 text-sm text-foreground/70 hover:text-foreground transition-colors duration-200"
                  >
                    {item.label}
                    {item.hasDropdown && <Plus className="h-3 w-3" />}
                  </Link>
                </div>
              ))}
            </nav>

            <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2">
              <Link
                to="/"
                className="text-xl font-heading tracking-tight hover:opacity-70 transition-opacity"
              >
                <span className="text-foreground/50">(</span>
                <span className="text-foreground font-medium">kanva</span>
                <span className="text-foreground/50">)</span>
              </Link>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setProfileOpen(true)}
                className="hidden sm:flex p-2 hover:opacity-60 transition-opacity"
              >
                <User className="h-5 w-5" />
              </button>
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex p-2 hover:opacity-60 transition-opacity"
              >
                <Search className="h-5 w-5" />
              </button>
              <button
                onClick={() => setWishlistOpen(true)}
                className="p-2 hover:opacity-60 transition-opacity"
              >
                <Heart className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCartOpen(true)}
                className="p-2 hover:opacity-60 transition-opacity"
              >
                <ShoppingBag className="h-5 w-5" />
              </button>
              <button
                className="lg:hidden p-2 hover:opacity-60 transition-opacity"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mega Menus for Desktop */}
      <div
        onMouseEnter={() => setActiveDropdown("Shop")}
        onMouseLeave={() => setActiveDropdown(null)}
        className={`absolute top-full left-0 right-0 transition-all duration-300 ${
          activeDropdown === "Shop"
            ? "opacity-100 visible translate-y-1"
            : "opacity-0 invisible -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="mt-3 bg-background/90 backdrop-blur-xl rounded-lg border shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Shop by Category
              </h3>
              <ul className="space-y-3">
                {shopCategories.map((cat) => (
                  <li key={cat.label}>
                    <Link
                      to={cat.href}
                      className="text-foreground/70 hover:text-foreground transition-colors"
                    >
                      {cat.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2 grid grid-cols-2 gap-8">
              {shopProducts.map((product) => (
                <Link to="#" key={product.name} className="group">
                  <div className="bg-secondary/50 rounded-lg overflow-hidden mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="font-semibold text-sm">{product.name}</h4>
                  <p className="text-sm text-foreground/70">{product.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        onMouseEnter={() => setActiveDropdown("Collections")}
        onMouseLeave={() => setActiveDropdown(null)}
        className={`absolute top-full left-0 right-0 transition-all duration-300 ${
          activeDropdown === "Collections"
            ? "opacity-100 visible translate-y-1"
            : "opacity-0 invisible -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="mt-3 bg-background/90 backdrop-blur-xl rounded-lg border shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {collectionCategories.map((cat) => (
              <Link to={cat.href} key={cat.label} className="group">
                <div className="bg-secondary/50 rounded-lg overflow-hidden mb-3">
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="w-full h-full object-cover aspect-video group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="font-semibold text-sm">{cat.label}</h4>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden mt-2">
          <div className="bg-background rounded-lg border shadow-lg py-4 px-4">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  <div
                    className="text-sm text-foreground/70 hover:text-foreground hover:bg-secondary/50 transition-all duration-200 py-2.5 px-3 rounded-lg flex items-center justify-between cursor-pointer"
                    onClick={() =>
                      item.hasDropdown
                        ? toggleMobileSubmenu(item.label)
                        : (window.location.href = item.href)
                    }
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          openMobileSubmenu === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </div>
                  {item.hasDropdown &&
                    openMobileSubmenu === item.label && (
                      <div className="pl-6 pt-2 pb-1">
                        <div className="flex flex-col gap-1">
                          {(item.label === "Shop" ? shopCategories : []).map(
                            (subItem) => (
                              <Link
                                key={subItem.label}
                                to={subItem.href}
                                className="text-sm text-foreground/60 hover:text-foreground hover:bg-secondary/30 transition-all duration-200 py-2 px-3 rounded-md"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {subItem.label}
                              </Link>
                            )
                          )}
                          {(item.label === "Collections"
                            ? collectionCategories
                            : []).map((subItem) => (
                            <Link
                              key={subItem.label}
                              to={subItem.href}
                              className="text-sm text-foreground/60 hover:text-foreground hover:bg-secondary/30 transition-all duration-200 py-2 px-3 rounded-md"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}

      <SearchPopup open={searchOpen} onOpenChange={setSearchOpen} />
      <CartPopup open={cartOpen} onOpenChange={setCartOpen} />
      <WishlistPopup open={wishlistOpen} onOpenChange={setWishlistOpen} />
      <ProfilePopup open={profileOpen} onOpenChange={setProfileOpen} />
    </header>
  );
};

export default Header;
