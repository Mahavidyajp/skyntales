import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    shop: ["All Products", "Cleansers", "Lotions", "Moisturizers"],
    company: ["About", "Blog", "Contact", "FAQs"],
    legal: ["Terms of Service", "Privacy Policy", "Shipping & Returns"],
  };

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Youtube, href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-12 md:gap-8">
          {/* Logo and Social: Centered on mobile, left-aligned on desktop */}
          <div className="md:col-span-1 text-center md:text-left">
            <Link to="/" className="text-2xl font-bold font-heading inline-block mb-4">
              Kanva
            </Link>
            <p className="mt-4 text-sm text-gray-400 max-w-xs mx-auto md:mx-0">
              Skincare that's clean, effective, and ethically made.
            </p>
            <div className="flex space-x-4 mt-6 justify-center md:justify-start">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <link.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Links: Adjusted grid for better mobile layout */}
          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold tracking-wider uppercase">Shop</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Adjusted margin for better spacing */}
        <div className="mt-12 lg:mt-16 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Made by Gola Templates
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
