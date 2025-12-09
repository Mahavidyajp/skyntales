import { Leaf, Heart, Shield, Truck } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Natural Formula",
    description: "Crafted with pure, skin-loving ingredients for ultimate care.",
  },
  {
    icon: Heart,
    title: "Cruelty-Free",
    description: "Our products are never tested on animals, guaranteed ethical.",
  },
  {
    icon: Shield,
    title: "Expert Approved",
    description: "Carefully tested to ensure safety and visible results.",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Delivered to your doorstep with no extra costs worldwide.",
  },
];

const FeatureBadges = () => {
  return (
    <section className="py-12 sm:py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-secondary/50 hover:shadow-lg transition-shadow duration-300"
            >
              <feature.icon className="h-8 w-8 text-primary mb-4" strokeWidth={1.5} />
              <h3 className="font-heading text-base sm:text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureBadges;
