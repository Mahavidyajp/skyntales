import { useState, useEffect, useRef } from "react";
import { HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import NewsletterSection from "@/components/home/NewsletterSection";

const Contact = () => {
  const { toast } = useToast();
  const sectionRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // ✅ Scroll Reveal Animation
  useEffect(() => {
    const elements = sectionRef.current.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-reveal");
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });

    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-secondary overflow-hidden">
      <Header />

      <main className="pt-28 pb-10 px-4 sm:px-6">

        {/* ✅ HEADER */}
        <section className="text-center mb-16 reveal">
          <h1 className="text-[clamp(2.8rem,6vw,4rem)] font-heading italic mb-4">
            Contact
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base">
            Whether you have a question about your order,
            need skincare advice, or just want to say hello.
          </p>
        </section>

        {/* ✅ CONTACT CARD */}
        <section className="max-w-2xl mx-auto reveal mb-30">
          <div className="bg-background rounded-3xl p-6 sm:p-10 shadow-lg border border-border/10">

            {/* Title */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <HelpCircle className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-heading">
                Send Us a Message
              </h3>
            </div>

            {/* ✅ FORM */}
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name + Email */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sage italic font-normal">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="h-12 bg-secondary/50 border-0 rounded-xl 
                    placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sage italic font-normal">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="jane@framer.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="h-12 bg-secondary/50 border-0 rounded-xl 
                    placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sage italic font-normal">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="How can we help?"
                  value={formData.message}
                  onChange={handleChange}
                  rows={7}
                  className="bg-secondary/50 border-0 rounded-xl resize-none 
                  placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-14 bg-primary hover:bg-primary/90 
                text-primary-foreground rounded-full text-base font-medium 
                transition-all hover:scale-[1.02]"
              >
                Submit Message
              </Button>
            </form>
          </div>
        </section>

        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
