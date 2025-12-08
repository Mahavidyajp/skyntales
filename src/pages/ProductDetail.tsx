import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, Plus, Minus, Truck, RefreshCw, Leaf, Rabbit, Award, CheckCircle, HelpCircle, MessageCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

const productsData = [
  { id: 1, name: "Gentle Wash", price: "7,90 €", priceNum: 7.90, image: product1, discount: "58% OFF", description: "A gentle daily cleanser that refreshes and rebalances your skin effortlessly." },
  { id: 2, name: "Hydra Drops", price: "8,90 €", priceNum: 8.90, image: product2, discount: "55% OFF", description: "Intensive hydration serum that deeply nourishes and revitalizes your skin." },
  { id: 3, name: "Calm Cream", price: "8,90 €", priceNum: 8.90, image: product3, description: "Soothing moisturizer that calms irritation and restores skin balance." },
  { id: 4, name: "Daily Cream", price: "8,90 €", priceNum: 8.90, image: product1, description: "Everyday moisturizer for lasting hydration and skin protection." },
  { id: 5, name: "Balance Mist", price: "7,90 €", priceNum: 7.90, image: product2, discount: "57% OFF", description: "Refreshing facial mist that balances and hydrates throughout the day." },
  { id: 6, name: "Firm Cream", price: "8,90 €", priceNum: 8.90, image: product3, description: "Anti-aging cream that firms and tones for youthful-looking skin." },
  { id: 7, name: "Glow Serum", price: "12,90 €", priceNum: 12.90, image: product1, description: "Brightening serum for a radiant, glowing complexion." },
  { id: 8, name: "Night Oil", price: "9,90 €", priceNum: 9.90, image: product2, description: "Nourishing night treatment oil for overnight skin repair." },
  { id: 9, name: "Pure Toner", price: "6,90 €", priceNum: 6.90, image: product3, description: "Clarifying toner that purifies pores and preps skin." },
];

const relatedProducts = [
  { id: 10, name: "Clay Clean", price: "8,90 €", image: product1 },
  { id: 11, name: "Citrus Foam", price: "8,90 €", image: product2 },
  { id: 12, name: "Soft Drops", price: "6,90 €", image: product3 },
];

const badges = [
  { icon: Leaf, label: "100%\nNatural" },
  { icon: Rabbit, label: "Cruelty Free" },
  { icon: Leaf, label: "Eco Friendly" },
  { icon: Award, label: "Expert\nApproved" },
];

const featureBadges = [
  { icon: Leaf, title: "Natural Formula", description: "Crafted with pure, skin-loving ingredients for ultimate care." },
  { icon: Rabbit, title: "Cruelty-Free", description: "Our products are never tested on animals, guaranteed ethical." },
  { icon: CheckCircle, title: "Expert Approved", description: "Carefully tested to ensure safety and visible results." },
  { icon: Truck, title: "Free Shipping", description: "Delivered to your doorstep with no extra costs worldwide." },
];

const faqs = [
  { question: "What skin types are your products suitable for?", answer: "Our products are formulated for all skin types, including sensitive skin. Each product is dermatologically tested." },
  { question: "Are your products cruelty-free and vegan?", answer: "Yes, all our products are 100% cruelty-free and vegan. We never test on animals." },
  { question: "How do I use this product for the best results?", answer: "Apply a small amount to clean skin morning and evening. Gently massage in circular motions until absorbed." },
  { question: "What ingredients are in this product?", answer: "Our products contain natural ingredients including aloe vera, vitamin E, hyaluronic acid, and botanical extracts." },
  { question: "Can I use this product if I have sensitive skin?", answer: "Yes, our formulas are gentle and suitable for sensitive skin. We recommend doing a patch test first." },
];

const ProductDetail = () => {
  const { id } = useParams();
  const productId = parseInt(id || "1");
  const product = productsData.find(p => p.id === productId) || productsData[0];
  
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const images = [product.image, product3, product2];

  return (
    <div className="min-h-screen bg-warm-gray">
      <Header />
      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="container-kanva py-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>›</span>
            <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
            <span>›</span>
            <span className="text-foreground underline">{product.name}</span>
          </nav>
        </div>

        {/* Product Section */}
        <section className="container-kanva pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative bg-secondary rounded-3xl overflow-hidden aspect-square">
                {product.discount && (
                  <span className="absolute top-6 right-20 z-10 bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-lg">
                    {product.discount}
                  </span>
                )}
                <button 
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="absolute top-6 right-6 z-10 p-2 bg-background rounded-full text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-primary text-primary' : ''}`} />
                </button>
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Thumbnails */}
              <div className="flex justify-center gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === idx ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div className="text-2xl text-foreground">{product.price}</div>
              <h1 className="font-heading text-4xl md:text-5xl text-foreground">{product.name}</h1>
              <p className="text-muted-foreground text-lg">{product.description}</p>

              {/* Size Selector */}
              <div className="space-y-3">
                <span className="text-foreground font-medium">Size</span>
                <div className="flex gap-3">
                  {["50ml", "100ml", "150ml"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-2 rounded-lg border transition-colors ${
                        selectedSize === size
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background border-border text-foreground hover:border-primary/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-14 text-center text-foreground font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button 
                  className={`flex-1 py-3 px-8 rounded-full font-medium transition-colors ${
                    selectedSize 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  {selectedSize ? 'Add to Cart' : 'Select Size'}
                </button>
              </div>

              {/* Shipping Info */}
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  <span>Free Shipping over $50</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  <span>14 Days Returns</span>
                </div>
              </div>

              {/* Product Badges */}
              <div className="grid grid-cols-4 gap-3">
                {badges.map((badge, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-center p-4 bg-background rounded-xl border border-border text-center">
                    <badge.icon className="h-5 w-5 mb-2 text-foreground" />
                    <span className="text-xs text-foreground whitespace-pre-line">{badge.label}</span>
                  </div>
                ))}
              </div>

              {/* Accordion Details */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="details" className="border-b border-border">
                  <AccordionTrigger className="text-foreground font-medium py-4">Details</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    This premium skincare product is formulated with the finest natural ingredients to deliver exceptional results. Perfect for daily use, it absorbs quickly without leaving any residue.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="how-to-use" className="border-b border-border">
                  <AccordionTrigger className="text-foreground font-medium py-4">How to Use</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    Apply a small amount to clean, dry skin. Gently massage in circular motions until fully absorbed. Use morning and evening for best results.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="ingredients" className="border-b border-border">
                  <AccordionTrigger className="text-foreground font-medium py-4">Ingredients</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    Aqua, Aloe Barbadensis Leaf Juice, Glycerin, Hyaluronic Acid, Vitamin E, Jojoba Oil, Green Tea Extract, Chamomile Extract.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="delivery" className="border-b border-border">
                  <AccordionTrigger className="text-foreground font-medium py-4">Delivery & Returns</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    Free shipping on orders over $50. Standard delivery 3-5 business days. Express delivery available. 14-day return policy for unopened products.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Support Links */}
              <div className="flex items-center gap-6 text-sm">
                <Link to="/faq" className="flex items-center gap-2 text-foreground hover:underline">
                  <HelpCircle className="h-4 w-4" />
                  Frequently Asked Questions
                </Link>
                <Link to="/contact" className="flex items-center gap-2 text-foreground hover:underline">
                  <MessageCircle className="h-4 w-4" />
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Badges Section */}
        <section className="container-kanva pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featureBadges.map((feature, idx) => (
              <div key={idx} className="bg-background rounded-2xl p-6 text-center">
                <feature.icon className="h-6 w-6 mx-auto mb-4 text-foreground" />
                <h3 className="font-heading text-lg mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container-kanva pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div>
              <h2 className="font-heading text-4xl text-foreground">FAQ</h2>
            </div>
            <div className="lg:col-span-2">
              <Accordion type="single" collapsible className="w-full space-y-3">
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`} className="bg-background rounded-2xl px-6 border-none">
                    <AccordionTrigger className="text-foreground font-normal py-5 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* You Might Like Section */}
        <section className="container-kanva pb-16">
          <h2 className="font-heading text-4xl italic text-foreground text-center mb-12">You might like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((prod) => (
              <Link key={prod.id} to={`/shop/product/${prod.id}`} className="group">
                <div className="relative bg-secondary rounded-2xl overflow-hidden aspect-square mb-4">
                  <button 
                    className="absolute top-4 left-4 z-10 p-2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-heading text-xl mb-1 text-foreground">{prod.name}</h3>
                  <span className="text-muted-foreground">{prod.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="container-kanva pb-24">
          <div className="bg-sage rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
            <div className="max-w-lg relative z-10">
              <h2 className="font-heading text-3xl md:text-4xl text-white mb-2">
                Stay Updated,
              </h2>
              <h2 className="font-heading text-3xl md:text-4xl text-white/80 italic mb-4">
                Stay Radiant
              </h2>
              <p className="text-white/70 mb-8">
                Be the first to know about new products, offers, and skincare tips.
              </p>
              <div className="flex bg-white rounded-full p-1.5 max-w-md">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="flex-1 px-4 py-2 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button className="px-6 py-2 bg-sage text-white rounded-full font-medium hover:bg-sage/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
