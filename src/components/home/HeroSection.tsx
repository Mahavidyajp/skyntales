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
              <div className="relative container-kanva h-full min-h-screen flex flex-col justify-center pt-24 pb-16">
                <div className="max-w-xl">
                  <h1 className="mb-6">
                    <span className="block text-[clamp(3.5rem,12vw,8rem)] font-heading text-white leading-[0.9] tracking-tight">
                      {slide.title[0]}
                    </span>
                    <span className="block text-[clamp(3.5rem,12vw,8rem)] font-heading italic text-[#b5a08e]/80 leading-[0.9] tracking-tight">
                      {slide.title[1]}
                    </span>
                  </h1>
                  <p className="text-base md:text-lg text-white mb-10 max-w-md leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              </div>
                {/* Product Hotspots */}
                {slide.products.map((product, productIndex) => (
                    <Popover key={productIndex}>
                        <PopoverTrigger asChild>
                            <button
                            className="absolute w-4 h-4 bg-white rounded-full animate-pulse"
                            style={{ top: product.position.top, left: product.position.left }}
                            />
                        </PopoverTrigger>
                        <Link to={`/shop/product/${product.id}`}>
                            <PopoverContent>
                                <div className="flex gap-4">
                                <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-md" />
                                <div>
                                    {product.discount && (
                                    <div className="text-xs font-bold bg-red-500 text-white rounded-full px-2 py-1 inline-block mb-1">
                                        {product.discount}
                                    </div>
                                    )}
                                    <h4 className="font-bold">{product.name}</h4>
                                    <p className="text-sm text-gray-500">{product.price}</p>
                                </div>
                                </div>
                            </PopoverContent>
                        </Link>
                    </Popover>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors shadow-sm"
      >
        <ChevronLeft className="h-5 w-5 text-foreground" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors shadow-sm"
      >
        <ChevronRight className="h-5 w-5 text-foreground" />
      </button>

      {/* Shop Now Link - Bottom Left */}
      <div className="absolute bottom-12 left-6 md:left-12">
        <Link
          to="/shop"
          className="text-sm text-white font-medium underline underline-offset-4 hover:text-[#5a5a5a] transition-colors"
        >
          Shop Now
        </Link>
      </div>

      {/* Dots */}
      <div className="absolute bottom-12 right-1/2 translate-x-1/2 flex gap-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2.5 h-2.5 rounded-full ${selectedIndex === index ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
