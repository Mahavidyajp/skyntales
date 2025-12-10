import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import heroImage1 from "@/assets/hero-model.jpg";
import heroImage2 from "@/assets/skin-closeup.jpg";
import heroImage3 from "@/assets/eco-product.jpg";
import { productsData } from "@/data/products";

const slides = [
  {
    image: heroImage1,
    title: ["Natural", "Skincare"],
    description:
      "Start your day with gentle care and nourishing ingredients designed to awaken your skin naturally.",
    products: [
      { ...productsData[0], position: { top: "45%", left: "75%" } },
      { ...productsData[1], position: { top: "65%", left: "68%" } },
    ],
  },
  {
    image: heroImage2,
    title: ["Refresh", "Your Skin"],
    description:
      "Skincare stripped to the essentials — clean, effective, and made with nature in mind.",
    products: [{ ...productsData[2], position: { top: "50%", left: "70%" } }],
  },
  {
    image: heroImage3,
    title: ["Daily", "Rituals"],
    description:
      "Elevate your routine with products that care for your skin and the planet.",
    products: [
      { ...productsData[3], position: { top: "30%", left: "60%" } },
      { ...productsData[4], position: { top: "70%", left: "80%" } },
    ],
  },
];

const HeroSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [animateKey, setAnimateKey] = useState(0); // ✅ FOR TEXT RE-ANIMATION

  const scrollPrev = useCallback(() => {
    emblaApi && emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi && emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index) => {
    emblaApi && emblaApi.scrollTo(index);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setAnimateKey((prev) => prev + 1); // ✅ Re-trigger animation
    };

    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  // ✅ AUTO SLIDE
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="relative h-screen w-screen overflow-hidden">
      {/* ✅ EMBLA VIEWPORT */}
      <div ref={emblaRef} className="h-screen w-screen overflow-hidden">
        <div className="flex h-screen w-screen">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="relative h-screen w-screen flex-shrink-0"
            >
              {/* ✅ FULLSCREEN IMAGE */}
              <img
                src={slide.image}
                alt={slide.title.join(" ")}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              {/* ✅ DARK OVERLAY */}
              <div className="absolute inset-0 bg-black/30" />

              {/* ✅ TEXT CONTENT WITH ANIMATION */}
              {index === selectedIndex && (
                <div
                  key={animateKey}
                  className="relative z-10 h-full flex items-center px-6 sm:px-16 max-w-7xl"
                >
                  <div className="max-w-md animate-hero-text">
                    <h1 className="mb-6">
                      <span className="block text-[clamp(3rem,10vw,6.5rem)] font-heading text-white leading-none">
                        {slide.title[0]}
                      </span>
                      <span className="block text-[clamp(3rem,10vw,6.5rem)] font-heading italic text-white/80 leading-none">
                        {slide.title[1]}
                      </span>
                    </h1>

                    <p className="text-base md:text-lg text-white/90 mb-10 max-w-sm leading-relaxed">
                      {slide.description}
                    </p>

                    <Link
                      to="/shop"
                      className="inline-block text-sm text-white font-medium underline underline-offset-4 hover:text-[#d4c4b5] transition"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              )}

              {/* ✅ PRODUCT HOTSPOTS */}
              <div className="hidden md:block">
                {slide.products.map((product, productIndex) => (
                  <Popover key={productIndex}>
                    <PopoverTrigger asChild>
                      <button
                        className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.9)] animate-ping z-20"
                        style={{
                          top: product.position.top,
                          left: product.position.left,
                        }}
                      />
                    </PopoverTrigger>

                    <Link to={`/shop/product/${product.id}`}>
                      <PopoverContent side="top" className="w-auto z-30">
                        <div className="flex gap-4 items-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <div>
                            <h4 className="font-bold text-sm">
                              {product.name}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {product.price}
                            </p>
                          </div>
                        </div>
                      </PopoverContent>
                    </Link>
                  </Popover>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ ARROWS */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 
        bg-white/30 backdrop-blur-xl rounded-full flex items-center justify-center 
        hover:bg-white/50 hover:scale-110 transition-all duration-300 shadow-lg z-30"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 
        bg-white/30 backdrop-blur-xl rounded-full flex items-center justify-center 
        hover:bg-white/50 hover:scale-110 transition-all duration-300 shadow-lg z-30"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* ✅ DOTS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-x-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              selectedIndex === index
                ? "bg-white scale-125 shadow-md"
                : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
