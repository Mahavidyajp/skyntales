import { Star, Recycle, Check, Sparkles } from "lucide-react";
import skinCloseup from "@/assets/skin-closeup.jpg";
import product2 from "@/assets/product-2.jpg";

const SocialProofSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-kanva">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
          <h2 className="text-h1 md:text-display font-heading max-w-lg">
            Why Your Skin
            <br />
            <span className="italic">Deserves the Best</span>
          </h2>

          {/* Rating Block */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex gap-1 justify-end mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-foreground text-foreground" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">4.7 (1,109 reviews)</span>
            </div>
            <div className="flex -space-x-3">
              <img
                src={skinCloseup}
                alt="Customer"
                className="w-10 h-10 rounded-full border-2 border-background object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
                alt="Customer"
                className="w-10 h-10 rounded-full border-2 border-background object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100"
                alt="Customer"
                className="w-10 h-10 rounded-full border-2 border-background object-cover"
              />
            </div>
          </div>
        </div>

        {/* Features Grid - Bento Style */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Large Image with Overlay Card */}
          <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden lg:row-span-2">
            <img
              src={skinCloseup}
              alt="Proven effectiveness"
              className="w-full h-full object-cover"
            />
            {/* Overlay Card */}
            <div className="absolute bottom-6 left-6 bg-background/95 backdrop-blur-sm rounded-2xl p-5 max-w-[200px] shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-sage" />
                <span className="text-sm font-semibold text-foreground">Proven</span>
              </div>
              <h4 className="font-heading text-lg text-foreground mb-1">Effectiveness</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every product is carefully crafted to meet the highest quality standards.
              </p>
            </div>
          </div>

          {/* Top Right - Eco-Friendly Packaging Card */}
          <div className="bg-secondary rounded-3xl p-6 lg:p-8 flex flex-col lg:col-span-2">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1">
                <Recycle className="h-8 w-8 text-sage mb-4" strokeWidth={1.5} />
                <h3 className="text-h3 md:text-h2 font-heading mb-3">
                  Eco-Friendly
                  <br />
                  <span className="italic">Packaging</span>
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Eco-friendly materials designed to care for the planet as much as your skin.
                </p>
              </div>
              <div className="flex-shrink-0">
                <img
                  src={product2}
                  alt="Product"
                  className="w-32 md:w-40 h-auto rounded-2xl shadow-md"
                />
              </div>
            </div>
          </div>

          {/* Bottom Right - 100% Natural Card */}
          <div className="bg-sage rounded-3xl p-6 lg:p-8 lg:col-span-2">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1">
                <h3 className="text-h3 md:text-h2 font-heading text-sage-foreground mb-2">
                  100% Natural
                  <br />
                  <span className="italic">100% You</span>
                </h3>
                <div className="space-y-2 mt-4">
                  {["No Harsh Chemicals", "Plant-Based Goodness", "Ethically Sourced"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-sage-foreground/80" strokeWidth={2} />
                      <span className="text-sm text-sage-foreground/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
