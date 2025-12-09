import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import heroImage1 from '@/assets/hero-model.jpg';
import heroImage2 from '@/assets/skin-closeup.jpg';
import heroImage3 from '@/assets/eco-product.jpg';
import { productsData } from '@/data/products';

const slides = [
  {
    image: heroImage1,
    title: ['Natural', 'Skincare'],
    description: 'Start your day with gentle care and nourishing ingredients designed to awaken your skin naturally.',
    products: [
      {
        ...productsData[0],
        position: { top: '45%', left: '75%' }
      },
      {
        ...productsData[1],
        position: { top: '65%', left: '68%' }
      }
    ]
  },
  {
    image: heroImage2,
    title: ['Refresh', 'Your Skin'],
    description: 'Skincare stripped to the essentials — clean, effective, and made with nature in mind.',
    products: [
        {
            ...productsData[2],
            position: { top: '50%', left: '70%' }
        }
    ]
  },
  {
    image: heroImage3,
    title: ['Daily', 'Rituals'],
    description: 'Elevate your routine with products that care for your skin and the planet.',
    products: [
        {
            ...productsData[3],
            position: { top: '30%', left: '60%' }
        },
        {
            ...productsData[4],
            position: { top: '70%', left: '80%' }
        }
    ]
  },
];

const HeroSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="relative min-h-screen bg-[#d4c4b5] overflow-hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div className="flex-[0_0_100%] min-w-0 relative" key={index}>
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title.join(' ')}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full min-h-screen flex flex-col justify-center pt-24 pb-16">
                <div className="max-w-md text-center sm:text-left">
                  <h1 className="mb-4 sm:mb-6">
                    <span className="block text-[clamp(3rem,10vw,7rem)] font-heading text-white leading-none tracking-tight">
                      {slide.title[0]}
                    </span>
                    <span className="block text-[clamp(3rem,10vw,7rem)] font-heading italic text-white/80 leading-none tracking-tight">
                      {slide.title[1]}
                    </span>
                  </h1>
                  <p className="text-base md:text-lg text-white/90 mb-8 sm:mb-10 max-w-sm mx-auto sm:mx-0 leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              </div>
              {/* Product Hotspots - Hidden on smaller screens */}
              <div className="hidden md:block">
                {slide.products.map((product, productIndex) => (
                    <Popover key={productIndex}>
                        <PopoverTrigger asChild>
                            <button
                            className="absolute w-4 h-4 bg-white rounded-full animate-pulse"
                            style={{ top: product.position.top, left: product.position.left }}
                            />
                        </PopoverTrigger>
                        <Link to={`/shop/product/${product.id}`}>
                            <PopoverContent side="top" className="w-auto">
                                <div className="flex gap-4 items-center">
                                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                                <div>
                                    <h4 className="font-bold text-sm">{product.name}</h4>
                                    <p className="text-sm text-gray-500">{product.price}</p>
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

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-background/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background/80 transition-colors shadow-md"
      >
        <ChevronLeft className="h-5 w-5 text-foreground" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-background/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background/80 transition-colors shadow-md"
      >
        <ChevronRight className="h-5 w-5 text-foreground" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 sm:left-auto sm:right-auto sm:bottom-8 sm:left-8 flex flex-col items-center gap-4">
        <Link
          to="/shop"
          className="text-sm text-white font-medium underline underline-offset-4 hover:text-opacity-80 transition-opacity"
        >
          Shop All Products
        </Link>
      </div>

      {/* Dots */}
      <div className="absolute bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${selectedIndex === index ? 'bg-white' : 'bg-white/40 hover:bg-white/70'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
