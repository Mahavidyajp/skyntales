import { Star } from "lucide-react";

const TestimonialSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-kanva">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-h2 md:text-h1 font-heading leading-tight mb-8">
            It feels <span className="italic">healthier, smoother &amp; more radiant</span> than ever. I love knowing I'm using something natural and effective!
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
