import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowRight, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

const categoryCards = [
  { name: "Cleansers", image: product1 },
  { name: "Lotions", image: product2 },
  { name: "Moisturizers", image: product3 },
];

const filterCategories = ["Cleansers", "Lotions", "Moisturizers"];
const filterTags = ["After Sun", "All Skin", "Body", "Daily", "Detox", "Dry", "Evening", "Face", "Gentle", "Hydrating"];
const filterSizes = ["50ml", "100ml", "150ml", "250ml"];
const filterPrices = ["Under 8€", "Over 8€"];
const filterDiscounts = ["10% - 20%", "20% - 50%"];
const sortOptions = ["Relevance", "Price: Low to High", "Price: High to Low", "Name: A-Z", "Name: Z-A"];

const products = [
  { id: 1, name: "Gentle Wash", price: 7.9, priceDisplay: "7,90 €", image: product1, discount: 58, category: "cleansers", tags: ["Daily", "Face", "Gentle"], size: "100ml", sizes: ["50ml", "100ml", "150ml"] },
  { id: 2, name: "Hydra Drops", price: 8.9, priceDisplay: "8,90 €", image: product2, discount: 55, category: "lotions", tags: ["Hydrating", "All Skin", "Face"], size: "50ml", sizes: ["50ml", "100ml"] },
  { id: 3, name: "Calm Cream", price: 8.9, priceDisplay: "8,90 €", image: product3, category: "moisturizers", tags: ["Evening", "Face", "Gentle"], size: "50ml", sizes: ["50ml", "100ml", "150ml"] },
  { id: 4, name: "Daily Cream", price: 8.9, priceDisplay: "8,90 €", image: product1, category: "moisturizers", tags: ["Daily", "All Skin", "Face"], size: "100ml", sizes: ["50ml", "100ml"] },
  { id: 5, name: "Balance Mist", price: 7.9, priceDisplay: "7,90 €", image: product2, discount: 57, category: "lotions", tags: ["Daily", "Body", "Hydrating"], size: "150ml", sizes: ["100ml", "150ml", "250ml"] },
  { id: 6, name: "Firm Cream", price: 8.9, priceDisplay: "8,90 €", image: product3, category: "moisturizers", tags: ["After Sun", "Body", "Hydrating"], size: "150ml", sizes: ["50ml", "100ml", "150ml"] },
  { id: 7, name: "Glow Serum", price: 12.9, priceDisplay: "12,90 €", image: product1, category: "cleansers", tags: ["Evening", "Face", "Detox"], size: "50ml", sizes: ["50ml", "100ml"] },
  { id: 8, name: "Night Oil", price: 9.9, priceDisplay: "9,90 €", image: product2, discount: 40, category: "moisturizers", tags: ["Evening", "Face", "Dry"], size: "50ml", sizes: ["50ml", "100ml"] },
  { id: 9, name: "Pure Toner", price: 6.9, priceDisplay: "6,90 €", image: product3, category: "cleansers", tags: ["All Skin", "Daily", "Gentle"], size: "100ml", sizes: ["100ml", "150ml", "250ml"] },
];


const Shop = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Relevance");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const totalProducts = products.length;

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(p => {
      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.map(c => c.toLowerCase()).includes(p.category)) return false;
      
      // Tags filter
      if (selectedTags.length > 0 && !selectedTags.some(tag => p.tags.includes(tag))) return false;
      
      // Size filter
      if (selectedSizes.length > 0 && !selectedSizes.includes(p.size)) return false;
      
      // Price filter
      if (selectedPrices.length > 0) {
        const matchesPrice = selectedPrices.some(priceRange => {
          if (priceRange === "Under 8€") return p.price < 8;
          if (priceRange === "Over 8€") return p.price >= 8;
          return true;
        });
        if (!matchesPrice) return false;
      }
      
      // Discount filter
      if (selectedDiscounts.length > 0) {
        const matchesDiscount = selectedDiscounts.some(discountRange => {
          if (!p.discount) return false;
          if (discountRange === "10% - 20%") return p.discount >= 10 && p.discount <= 20;
          if (discountRange === "20% - 50%") return p.discount > 20 && p.discount <= 50;
          return true;
        });
        if (!matchesDiscount) return false;
      }
      
      return true;
    });

    // Sort products
    switch (sortBy) {
      case "Price: Low to High":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case "Name: A-Z":
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Name: Z-A":
        filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
    
    return filtered;
  }, [selectedCategories, selectedTags, selectedSizes, selectedPrices, selectedDiscounts, sortBy]);

  const hasActiveFilters = selectedCategories.length > 0 || selectedTags.length > 0 || selectedSizes.length > 0 || selectedPrices.length > 0 || selectedDiscounts.length > 0;

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
    setSelectedSizes([]);
    setSelectedPrices([]);
    setSelectedDiscounts([]);
  };

  const toggleFilter = (value: string, selected: string[], setSelected: (val: string[]) => void) => {
    if (selected.includes(value)) {
      setSelected(selected.filter(v => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const FilterContent = () => (
    <>
      {/* Clear All Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 mb-6 transition-colors"
        >
          <X className="h-4 w-4" />
          Clear all filters
        </button>
      )}

      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-sm text-muted-foreground italic mb-4">Categories ({selectedCategories.length})</h3>
        <div className="space-y-3">
          {filterCategories.map((category) => (
            <button
              key={category}
              onClick={() => toggleFilter(category, selectedCategories, setSelectedCategories)}
              className="flex items-center gap-3 cursor-pointer group w-full text-left"
            >
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                selectedCategories.includes(category) 
                  ? 'bg-primary border-primary' 
                  : 'border-border group-hover:border-primary/50'
              }`}>
                {selectedCategories.includes(category) && (
                  <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="text-foreground">{category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="mb-8">
        <h3 className="text-sm text-muted-foreground italic mb-4">Tags ({selectedTags.length})</h3>
        <div className="max-h-48 overflow-y-auto pr-2 space-y-2 scrollbar-thin">
          {filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleFilter(tag, selectedTags, setSelectedTags)}
              className="flex items-center gap-3 cursor-pointer group w-full text-left"
            >
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                selectedTags.includes(tag) 
                  ? 'bg-primary border-primary' 
                  : 'border-border group-hover:border-primary/50'
              }`}>
                {selectedTags.includes(tag) && (
                  <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="text-foreground">{tag}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="mb-8">
        <h3 className="text-sm text-muted-foreground italic mb-4">Size ({selectedSizes.length})</h3>
        <div className="flex flex-wrap gap-2">
          {filterSizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleFilter(size, selectedSizes, setSelectedSizes)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedSizes.includes(size)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-8">
        <h3 className="text-sm text-muted-foreground italic mb-4">Price ({selectedPrices.length})</h3>
        <div className="space-y-3">
          {filterPrices.map((price) => (
            <button
              key={price}
              onClick={() => toggleFilter(price, selectedPrices, setSelectedPrices)}
              className="flex items-center gap-3 cursor-pointer group w-full text-left"
            >
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                selectedPrices.includes(price) 
                  ? 'bg-primary border-primary' 
                  : 'border-border group-hover:border-primary/50'
              }`}>
                {selectedPrices.includes(price) && (
                  <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="text-foreground">{price}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Discount */}
      <div className="mb-8">
        <h3 className="text-sm text-muted-foreground italic mb-4">Discount ({selectedDiscounts.length})</h3>
        <div className="space-y-3">
          {filterDiscounts.map((discount) => (
            <button
              key={discount}
              onClick={() => toggleFilter(discount, selectedDiscounts, setSelectedDiscounts)}
              className="flex items-center gap-3 cursor-pointer group w-full text-left"
            >
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                selectedDiscounts.includes(discount) 
                  ? 'bg-primary border-primary' 
                  : 'border-border group-hover:border-primary/50'
              }`}>
                {selectedDiscounts.includes(discount) && (
                  <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="text-foreground">{discount}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-warm-gray">
      <Header />
      <main>
        {/* Shop Title */}
        <section className="pt-24 pb-12 text-center">
          <h1 className="font-heading text-[80px] md:text-[120px] font-normal text-foreground">Shop</h1>
        </section>

 {/* Category Cards */}
<section className="container-kanva pb-16 mx-40">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {categoryCards.map((category) => (
      <Link
        key={category.name}
        to={`/shop/${category.name.toLowerCase()}`}
        className="group block"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          
          {/* Image */}
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:blur"
          />

          {/* Text inside the image (VISIBLE) */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-white/80 px-5 rounded-lg py-3 backdrop-blur-sm ">
            <span className="text-foreground text-lg font-medium">
              {category.name}
            </span>
            <ArrowRight className="h-5 w-5 text-foreground transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    ))}
  </div>
</section>

        {/* Filters & Products Section */}
        <section className="container-kanva pb-24">
          {/* Breadcrumb & Sort Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <h2 className="font-heading text-2xl italic text-foreground hidden lg:block">Filters</h2>
            
            {/* Mobile Filter Button */}
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-foreground">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Filters</span>
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="font-heading text-2xl italic">Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>

            <nav className="text-sm text-muted-foreground flex items-center gap-2">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <span>›</span>
              <span className="text-foreground underline">Shop</span>
            </nav>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:inline">Sort by</span>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground px-3 py-2 bg-secondary rounded-full sm:bg-transparent sm:p-0">
                  {sortBy}
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {sortOptions.map((option) => (
                    <DropdownMenuItem
                      key={option}
                      onClick={() => setSortBy(option)}
                      className={sortBy === option ? "bg-secondary" : ""}
                    >
                      {option}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex gap-12">
            {/* Filters Sidebar - Desktop */}
            <aside className="w-64 flex-shrink-0 hidden lg:block">
              <FilterContent />
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Results count */}
              <p className="text-sm text-muted-foreground mb-6">
                Showing {filteredProducts.length} of {totalProducts} products
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link key={product.id} to={`/shop/product/${product.id}`} className="group">
                    <div className="relative bg-secondary rounded-2xl overflow-hidden aspect-square mb-4">
                      <button 
                        className="absolute top-4 left-4 z-10 p-2 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Heart className="h-5 w-5" />
                      </button>
                      {product.discount && (
                        <span className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full">
                          {product.discount}% OFF
                        </span>
                      )}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="font-heading text-xl mb-1 text-foreground">{product.name}</h3>
                      <span className="text-muted-foreground">{product.priceDisplay}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
