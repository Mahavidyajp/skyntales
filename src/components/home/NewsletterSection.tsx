import { useState } from "react";
import ecoProduct from "@/assets/eco-product.jpg";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription
    console.log("Subscribing:", email);
  };

  return (
        <section className="px-4 md:px-8 lg:px-16 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="bg-sage rounded-3xl overflow-hidden relative">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="p-8 md:p-12 lg:p-16">
                  <h2 className="text-4xl md:text-5xl font-heading text-cream mb-2">
                    Stay Updated,
                  </h2>
                  <h2 className="text-4xl md:text-5xl font-heading text-cream/80 italic mb-6">
                    Stay Radiant
                  </h2>
                  <p className="text-cream/70 mb-8 max-w-sm">
                    Be the first to know about new products, offers, and skincare tips.
                  </p>
                  <form className="flex gap-2 max-w-md">
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="flex-1 px-5 py-3 rounded-full bg-cream/90 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cream"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
                <div className="hidden lg:flex items-end justify-end relative">
                  <img
                    src={ecoProduct}
                    alt="Product"
                    className="w-80 h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
  );
};

export default NewsletterSection;
