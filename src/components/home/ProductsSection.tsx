import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import ecoProduct from "@/assets/eco-product.jpg";
import skinCloseup from "@/assets/skin-closeup.jpg";
import heroModel from "@/assets/hero-model.jpg";

const circleImages = [
  { src: product1, alt: "Product 1" },
  { src: product2, alt: "Product 2" },
  { src: product3, alt: "Product 3" },
  { src: ecoProduct, alt: "Eco Product" },
  { src: skinCloseup, alt: "Skin Care" },
  { src: heroModel, alt: "Hero Model" },
];

const ProductsSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col items-center text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-foreground max-w-2xl">
            Explore Our Best-Selling Skincare Essentials
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl">
            Discover products that are clean, effective, and crafted with care to bring out your natural glow.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-medium hover:bg-foreground/80 transition-colors"
          >
            Shop All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6">
          {circleImages.map((image, i) => (
            <div
              key={i}
              className="aspect-square rounded-full overflow-hidden border-2 border-white shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
