import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, ChevronDown, SlidersHorizontal, ArrowDown, X, Plus, Minus } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

const categoryData: Record<string, { title: string; description: string; heroImage: string }> = {
  cleansers: {
    title: "Cleansers",
    description: "Gently remove dirt and impurities without stripping your skin. Perfect for a fresh, clean start every day.",
    heroImage: product1,
  },
  lotions: {
    title: "Lotions",
    description: "Lightweight hydration that absorbs quickly. Keep your skin soft and nourished throughout the day.",
    heroImage: product2,
  },
  moisturizers: {
    title: "Moisturizers",
    description: "Rich, nourishing formulas that lock in moisture. Perfect for maintaining healthy, radiant skin.",
    heroImage: product3,
  },
};

const allProducts = [
  { id: 1, name: "Gentle Wash", price: 7.9, priceDisplay: "7,90 €", image: product1, discount: 58, category: "cleansers", tags: ["Daily", "Face", "Gentle"], size: "100ml", sizes: ["50ml", "100ml", "150ml"] },
  { id: 2, name: "Clay Clean", price: 8.9, priceDisplay: "8,90 €", image: product2, category: "cleansers", tags: ["Detox", "Face", "Body"], size: "150ml", sizes: ["100ml", "150ml", "250ml"] },
  { id: 3, name: "Citrus Foam", price: 8.9, priceDisplay: "8,90 €", image: product3, category: "cleansers", tags: ["All Skin", "Daily", "Face"], size: "100ml", sizes: ["50ml", "100ml"] },
  { id: 4, name: "Deep Cleanse", price: 8.9, priceDisplay: "8,90 €", image: product1, discount: 15, category: "cleansers", tags: ["Detox", "Evening", "Face"], size: "50ml", sizes: ["50ml", "100ml", "150ml"] },
  { id: 5, name: "Hydra Drops", price: 8.9, priceDisplay: "8,90 €", image: product2, discount: 55, category: "lotions", tags: ["Hydrating", "All Skin", "Face"], size: "50ml", sizes: ["50ml", "100ml"] },
  { id: 6, name: "Balance Mist", price: 7.9, priceDisplay: "7,90 €", image: product3, discount: 57, category: "lotions", tags: ["Daily", "Body", "Hydrating"], size: "150ml", sizes: ["100ml", "150ml", "250ml"] },
  { id: 7, name: "Soft Touch", price: 9.9, priceDisplay: "9,90 €", image: product1, category: "lotions", tags: ["Gentle", "Body", "Dry"], size: "250ml", sizes: ["150ml", "250ml"] },
  { id: 8, name: "Calm Cream", price: 8.9, priceDisplay: "8,90 €", image: product2, discount: 25, category: "moisturizers", tags: ["Evening", "Face", "Gentle"], size: "50ml", sizes: ["50ml", "100ml", "150ml"] },
  { id: 9, name: "Daily Cream", price: 8.9, priceDisplay: "8,90 €", image: product3, category: "moisturizers", tags: ["Daily", "All Skin", "Face"], size: "100ml", sizes: ["50ml", "100ml"] },
  { id: 10, name: "Firm Cream", price: 8.9, priceDisplay: "8,90 €", image: product1, category: "moisturizers", tags: ["After Sun", "Body", "Hydrating"], size: "150ml", sizes: ["100ml", "150ml", "250ml"] },
  { id: 11, name: "Night Oil", price: 9.9, priceDisplay: "9,90 €", image: product2, discount: 40, category: "moisturizers", tags: ["Evening", "Face", "Dry"], size: "50ml", sizes: ["50ml", "100ml"] },
];

interface ProductSelection {
  [productId: number]: {
    size: string | null;
    quantity: number;
  };
}

const filterTags = ["After Sun", "All Skin", "Body", "Daily", "Detox", "Dry", "Evening", "Face", "Gentle", "Hydrating"];
const filterSizes = ["50ml", "100ml", "150ml", "250ml"];
const filterPrices = ["Under 8€", "Over 8€"];
const sortOptions = ["Relevance", "Price: Low to High", "Price: High to Low", "Name: A-Z", "Name: Z-A"];
const filterDiscounts = ["10% - 20%", "20% - 50%"];

const CategoryPage = () => {
  const { toast } = useToast();
  const { category } = useParams<{ category: string }>();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Relevance");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [productSelections, setProductSelections] = useState<ProductSelection>({});

  const getProductSelection = (productId: number) => {
    return productSelections[productId] || { size: null, quantity: 1 };
  };

  const setProductSize = (productId: number, size: string) => {
    setProductSelections(prev => ({
      ...prev,
      [productId]: { ...getProductSelection(productId), size }
    }));
  };

  const setProductQuantity = (productId: number, quantity: number) => {
    setProductSelections(prev => ({
      ...prev,
      [productId]: { ...getProductSelection(productId), quantity: Math.max(1, quantity) }
    }));
  };

  const handleAddToCart = (product: typeof allProducts[0]) => {
    const selection = getProductSelection(product.id);
    toast({
      title: "Added to cart",
      description: `${product.name} (${selection.size}) x${selection.quantity}`,
    });
  };

  const categoryInfo = category ? categoryData[category.toLowerCase()] : null;
  const totalCategoryProducts = allProducts.filter(p => p.category === category?.toLowerCase()).length;
  
  const filteredProducts = useMemo(() => {
    let products = allProducts.filter(p => {
      // Category filter
      if (p.category !== category?.toLowerCase()) return false;
      
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
        products = [...products].sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        products = [...products].sort((a, b) => b.price - a.price);
        break;
      case "Name: A-Z":
        products = [...products].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Name: Z-A":
        products = [...products].sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
    
    return products;
  }, [category, selectedTags, selectedSizes, selectedPrices, selectedDiscounts, sortBy]);

  const hasActiveFilters = selectedTags.length > 0 || selectedSizes.length > 0 || selectedPrices.length > 0 || selectedDiscounts.length > 0;

  const clearAllFilters = () => {
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

  const scrollToProducts = () => {
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
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

  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-warm-gray">
        <Header />
        <main className="pt-24 pb-12 text-center">
          <h1 className="font-heading text-4xl text-foreground">Category not found</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-gray">
      <Header />
      <main>
        {/* Hero Banner */}
        <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={categoryInfo.heroImage}
              alt={categoryInfo.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 to-transparent" />
          </div>
          <div className="relative container-kanva h-full flex flex-col justify-end pb-16">
            <h1 className="font-heading text-[64px] md:text-[96px] text-background font-normal leading-none mb-4">
              {categoryInfo.title}
            </h1>
            <p className="text-background/90 text-lg md:text-xl max-w-xl mb-8">
              {categoryInfo.description}
            </p>
            <button 
              onClick={scrollToProducts}
              className="flex items-center gap-2 text-background hover:text-background/80 transition-colors group"
            >
              <span className="text-lg italic">Explore Collection</span>
              <ArrowDown className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </section>

        {/* Filters & Products Section */}
        <section id="products-section" className="container-kanva py-16">
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
              <Link to="/shop" className="hover:text-foreground">Shop</Link>
              <span>›</span>
              <span className="text-foreground underline">{categoryInfo.title}</span>
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
                Showing {filteredProducts.length} of {totalCategoryProducts} products
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const selection = getProductSelection(product.id);
                  return (
                    <div key={product.id} className="group">
                      <Link to={`/shop/product/${product.id}`}>
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
                      </Link>
                      <div className="text-center space-y-3">
                        <Link to={`/shop/product/${product.id}`}>
                          <h3 className="font-heading text-xl mb-1 text-foreground">{product.name}</h3>
                          <span className="text-muted-foreground">{product.priceDisplay}</span>
                        </Link>

                        {/* Size Selector */}
                        <div className="flex justify-center gap-2">
                          {product.sizes.map((size) => (
                            <button
                              key={size}
                              onClick={() => setProductSize(product.id, size)}
                              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                                selection.size === size
                                  ? 'bg-primary text-primary-foreground border-primary'
                                  : 'bg-background border-border text-foreground hover:border-primary/50'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>

                        {/* Quantity & Add to Cart */}
                        {selection.size ? (
                          <div className="flex items-center justify-center gap-3">
                            <div className="flex items-center border border-border rounded-lg overflow-hidden">
                              <button 
                                onClick={() => setProductQuantity(product.id, selection.quantity - 1)}
                                className="p-2 bg-secondary hover:bg-secondary/80 transition-colors"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-3 text-sm font-medium text-foreground">{selection.quantity}</span>
                              <button 
                                onClick={() => setProductQuantity(product.id, selection.quantity + 1)}
                                className="p-2 bg-secondary hover:bg-secondary/80 transition-colors"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
                            >
                              Add to Cart
                            </button>
                          </div>
                        ) : (
                          <p className="text-xs text-muted-foreground italic">Select a size</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
