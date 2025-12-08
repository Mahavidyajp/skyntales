import { useState } from "react";
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Header />
      <main className="pt-24 pb-20">
        {/* Header */}
        <section className="py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-heading italic mb-6">Contact</h1>
          <p className="text-muted-foreground max-w-md mx-auto px-4">
            Whether you have a question about your order,
            <br className="hidden sm:block" />
            need skincare advice, or just want to say hello.
          </p>
        </section>

        {/* Contact Form Card */}
        <section className="px-4 max-w-2xl mx-auto">
          <div className="bg-background rounded-2xl p-8 md:p-12 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
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
                    className="h-12 bg-secondary/50 border-0 rounded-lg placeholder:text-muted-foreground/60"
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
                    className="h-12 bg-secondary/50 border-0 rounded-lg placeholder:text-muted-foreground/60"
                    required
                  />
                </div>
              </div>
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
                  rows={8}
                  className="bg-secondary/50 border-0 rounded-lg resize-none placeholder:text-muted-foreground/60"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full text-base font-medium"
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
