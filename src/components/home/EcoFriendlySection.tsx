import { Check } from "lucide-react";
import ecoProduct from "@/assets/eco-product.jpg";

const benefits = [
  "No Harsh Chemicals",
  "Plant-Based Goodness",
  "Ethically Sourced",
];

const EcoFriendlySection = () => {
  return (
    <section className="relative rounded-xl min-h-[70vh] overflow-hidden mx-20 my-12">
  <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
    
    {/* Left Content */}
    <div className="bg-sage p-8 md:p-12 lg:p-16 flex flex-col justify-center">
      <h2 className="text-h1 md:text-display font-heading text-sage-foreground mb-6">
        <span className="block">Eco-Friendly,</span>
        <span className="block italic">Skin-Friendly</span>
      </h2>

      <p className="text-lg text-sage-foreground/80 mb-8 leading-relaxed max-w-md">
        100% natural means every ingredient is carefully selected from nature to provide safe, effective, and gentle care for your skin.
      </p>

      <div className="space-y-3">
        {benefits.map((benefit) => (
          <div key={benefit} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-sage-foreground/20 flex items-center justify-center">
              <Check className="h-3 w-3 text-sage-foreground" strokeWidth={2} />
            </div>
            <span className="text-sage-foreground font-medium">{benefit}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Right - Product Image */}
    <div className="relative h-[400px] lg:h-auto">
      <img
        src={ecoProduct}
        alt="Eco-friendly skincare product with natural botanicals"
        className="w-full h-full object-cover"
      />
    </div>

  </div>
</section>

  );
};

export default EcoFriendlySection;
