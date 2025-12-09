import { Star } from "lucide-react";

const TestimonialSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-3xl sm:text-4xl md:text-5xl font-serif leading-snug sm:leading-normal md:leading-snug mb-8">
            "It feels <span className="italic">healthier, smoother & more radiant</span> than ever. I love knowing I'm using something natural and effective!"
          </blockquote>
          
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-foreground text-foreground" />
            ))}
          </div>
          
          <div>
            <p className="font-heading text-lg">Jennifer K.</p>
            <span className="text-sm text-muted-foreground">Verified Buyer</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
