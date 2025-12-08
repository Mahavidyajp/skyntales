import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, ArrowUpRight, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const footerLinks = {
    pages: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Shop", href: "/shop" },
      { label: "Blog", href: "/blog" },
    ],
    categories: [
      { label: "All Products", href: "/shop" },
      { label: "Cleansers", href: "/shop/cleansers" },
      { label: "Lotions", href: "/shop/lotions" },
      { label: "Moisturizers", href: "/shop/moisturizers" },
    ],
    support: [
      { label: "Contact", href: "/contact" },
      { label: "FAQs", href: "/faq" },
      { label: "Shipping & Delivery", href: "/shipping" },
      { label: "Orders & Returns", href: "/returns" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
    account: [
      { label: "Favorites", href: "/favorites" },
      { label: "My Account", href: "/account" },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  const paymentMethods = ["Apple Pay", "Stripe", "Visa", "G Pay"];

  return (
    <footer className="bg-primary text-primary-foreground overflow-hidden">

      {/* Main Footer */}
      <div className="container-kanva py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block text-2xl font-heading mb-6 hover:opacity-80 transition-opacity">
              <span className="text-primary-foreground/50">(</span>
              <span>kanva</span>
              <span className="text-primary-foreground/50">)</span>
            </Link>
            <p className="text-primary-foreground/60 mb-8 max-w-sm leading-relaxed text-sm">
              Combining nature and science, we create skincare that nurtures your skin and respects
              the planet. Healthy, radiant skin starts here.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-2 mb-8">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href} 
                  className="p-3 bg-primary-foreground/5 hover:bg-primary-foreground/15 rounded-full transition-all duration-300 hover:scale-105"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            
            {/* Payment Methods */}
            <div className="flex items-center gap-2 flex-wrap">
              {paymentMethods.map((method) => (
                <span 
                  key={method}
                  className="text-xs text-primary-foreground/50 border border-primary-foreground/20 px-3 py-1.5 rounded-lg bg-primary-foreground/5"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/40 mb-5">Pages</h4>
            <ul className="space-y-3">
              {footerLinks.pages.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/40 mb-5">Categories</h4>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
            
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/40 mt-8 mb-5">Account</h4>
            <ul className="space-y-3">
              {footerLinks.account.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/40 mb-5">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/40 mb-5">Get in Touch</h4>
            <div className="space-y-4 text-sm">
              <p className="text-primary-foreground/70">
                <span className="block text-primary-foreground/40 text-xs mb-1">Email</span>
                hello@kanva.com
              </p>
              <p className="text-primary-foreground/70">
                <span className="block text-primary-foreground/40 text-xs mb-1">Phone</span>
                +1 (555) 123-4567
              </p>
              <p className="text-primary-foreground/70">
                <span className="block text-primary-foreground/40 text-xs mb-1">Address</span>
                123 Beauty Lane<br />
                Los Angeles, CA 90210
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-kanva py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-primary-foreground/40 text-xs">
              © 2024 Kanva. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs">
              <Link to="/privacy" className="text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;