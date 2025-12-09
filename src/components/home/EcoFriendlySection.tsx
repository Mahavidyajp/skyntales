import { ShieldOff, Leaf, Handshake } from "lucide-react";
import ecoProduct from "@/assets/eco-product.jpg";

const benefits = [
  { text: "No Harsh Chemicals", icon: <ShieldOff className="w-5 h-5 mr-3" /> },
  { text: "Plant-Based Goodness", icon: <Leaf className="w-5 h-5 mr-3" /> },
  { text: "Ethically Sourced", icon: <Handshake className="w-5 h-5 mr-3" /> },
];

const EcoFriendlySection = () => {
  return (
    <section className="relative bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={ecoProduct}
          alt="Eco friendly product"
          className="w-full h-full object-cover object-center opacity-40"
        />
      </div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="max-w-xl text-center sm:text-left">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif mb-6">
            <span className="block font-normal">Eco-Friendly,</span>
            <span className="block font-serif italic font-light text-gray-300">Skin-Friendly</span>
          </h2>
          <p className="text-lg text-gray-300/80 mb-8 leading-relaxed">
            100% natural means every ingredient is carefully selected from
            nature to provide safe, effective, and gentle care for your skin.
          </p>
          <div className="space-y-4 inline-block text-left">
            {benefits.map((benefit) => (
              <div key={benefit.text} className="flex items-center text-gray-200">
                {benefit.icon}
                <span className="font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcoFriendlySection;
