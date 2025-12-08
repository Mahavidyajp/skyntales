import { Link } from "react-router-dom";
import { ArrowDown, ChevronRight } from "lucide-react";
import heroImage from "@/assets/hero-model.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-[#d4c4b5] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Natural skincare"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="relative container-kanva h-full min-h-screen flex flex-col justify-center pt-24 pb-16">
        <div className="max-w-xl">
          <h1 className="mb-6 animate-fade-in">
            <span className="block text-[clamp(3.5rem,12vw,8rem)] font-heading text-white leading-[0.9] tracking-tight">
              Natural
            </span>
            <span className="block text-[clamp(3.5rem,12vw,8rem)] font-heading italic text-[#b5a08e]/80 leading-[0.9] tracking-tight">
              Skincare
            </span>
          </h1>
          <p className="text-base md:text-lg text-white mb-10 max-w-md leading-relaxed animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Start your day with gentle care and nourishing ingredients designed to awaken your skin naturally.
          </p>
        </div>

        {/* Shop Now Link - Bottom Left */}
        <div className="absolute bottom-12 left-6 md:left-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Link
            to="/shop"
            className="text-sm text-white font-medium underline underline-offset-4 hover:text-[#5a5a5a] transition-colors"
          >
            Shop Now
          </Link>
        </div>

        {/* Next Slide Button */}
        <button className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors shadow-sm">
          <ChevronRight className="h-5 w-5 text-foreground" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;