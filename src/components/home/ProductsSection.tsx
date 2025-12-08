import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

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
  { src: product1, alt: "Product 7" },
  { src: product2, alt: "Product 8" },
  { src: product3, alt: "Product 9" },
  { src: ecoProduct, alt: "Product 10" },
  { src: skinCloseup, alt: "Product 11" },
  { src: heroModel, alt: "Product 12" },
  { src: product1, alt: "Product 13" },
  { src: product2, alt: "Product 14" },
];

const ProductsSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getImagePosition = (index: number, total: number, radius: number) => {
    const startAngle = 180;
    const endAngle = 360;
    const angle = startAngle + ((endAngle - startAngle) / (total - 1)) * index;
    const rad = (angle * Math.PI) / 180;

    return {
      x: Math.cos(rad) * radius,
      y: Math.sin(rad) * radius,
    };
  };

  const size = isMobile ? 55 : 100;
  const radius = isMobile ? 210 : 490;

  return (
    <section className="pt-40 sm:pt-60 md:pt-80 section-padding bg-background overflow-hidden">
      <div className="container-kanva">
        <div className="relative flex items-center justify-center min-h-[420px] sm:min-h-[550px] md:min-h-[700px]">

          {/* ✅ CIRCLES */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {circleImages.map((image, i) => {
              const pos = getImagePosition(i, circleImages.length, radius);
              const finalY = pos.y + size * 0.3;

              return (
                <div
                  key={i}
                  className="absolute rounded-full overflow-hidden border-[3px] border-white shadow-md bg-white transition-transform duration-300"
                  style={{
                    width: size,
                    height: size,
                    transform: `translate(${pos.x}px, ${finalY}px)`
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>

          {/* ✅ CENTER CONTENT */}
          <div className="relative z-10 text-center max-w-lg px-4">

            <span className="inline-block px-4 py-2 rounded-full bg-secondary text-foreground text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              Stats
            </span>

            <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-1">
              1200+ Products Got
            </h2>

            <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-muted-foreground mb-4 sm:mb-6">
              Sold Last Month
            </h2>

            <p className="text-muted-foreground text-sm sm:text-lg mb-6 sm:mb-8 max-w-md mx-auto">
              "At Essential, we believe beauty should feel effortless and empowering."
            </p>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-foreground text-background px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:bg-foreground/90 transition-colors text-xs sm:text-base"
            >
              Store
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
