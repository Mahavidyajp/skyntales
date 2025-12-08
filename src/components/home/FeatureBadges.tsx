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
    <section className="py-16 bg-background overflow-hidden">
      <div className="container-kanva">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-secondary hover:shadow-kanva-md transition-shadow"
            >
              <feature.icon className="h-8 w-8 text-sage mb-4" strokeWidth={1.5} />
              <h3 className="font-heading text-lg mb-2">{feature.title}</h3>
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
