import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

const Footer = () => {
  const footerRef = useRef(null);

  // ✅ SCROLL REVEAL ANIMATION
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, []);

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
    <footer
      ref={footerRef}
      className="bg-primary text-primary-foreground overflow-hidden
      opacity-0 translate-y-20 transition-all duration-700"
    >
      {/* ✅ MAIN FOOTER */}
      <div className="container-kanva py-16 px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12">

          {/* ✅ BRAND */}
          <div className="lg:col-span-4">
            <Link
              to="/"
              className="inline-block text-2xl font-heading mb-6 hover:opacity-80 transition"
            >
              <span className="text-primary-foreground/50">(</span>
              kanva
              <span className="text-primary-foreground/50">)</span>
            </Link>

            <p className="text-primary-foreground/60 mb-8 max-w-sm leading-relaxed text-sm">
              Combining nature and science, we create skincare that nurtures your
              skin and respects the planet. Healthy, radiant skin starts here.
            </p>

            {/* ✅ SOCIAL ICONS */}
            <div className="flex items-center gap-3 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-3 bg-primary-foreground/10 hover:bg-primary-foreground/20 
                  rounded-full transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* ✅ PAYMENT */}
            <div className="flex items-center gap-2 flex-wrap">
              {paymentMethods.map((method) => (
                <span
                  key={method}
                  className="text-xs text-primary-foreground/60 border 
                  border-primary-foreground/20 px-3 py-1.5 rounded-lg 
                  bg-primary-foreground/5"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>

          {/* ✅ PAGES */}
          <div className="lg:col-span-2">
            <FooterColumn title="Pages" links={footerLinks.pages} />
          </div>

          {/* ✅ CATEGORIES + ACCOUNT */}
          <div className="lg:col-span-2">
            <FooterColumn title="Categories" links={footerLinks.categories} />
            <div className="mt-8">
              <FooterColumn title="Account" links={footerLinks.account} />
            </div>
          </div>

          {/* ✅ SUPPORT */}
          <div className="lg:col-span-2">
            <FooterColumn title="Support" links={footerLinks.support} />
          </div>

          {/* ✅ CONTACT */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/40 mb-5">
              Get in Touch
            </h4>

            <div className="space-y-4 text-sm">
              <InfoBlock label="Email" value="hello@kanva.com" />
              <InfoBlock label="Phone" value="+1 (555) 123-4567" />
              <InfoBlock
                label="Address"
                value={
                  <>
                    123 Beauty Lane <br />
                    Los Angeles, CA 90210
                  </>
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* ✅ BOTTOM BAR */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-kanva py-6 px-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
            <p className="text-primary-foreground/40 text-xs">
              © 2024 Kanva. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-xs">
              <Link className="footer-bottom-link" to="/privacy">Privacy</Link>
              <Link className="footer-bottom-link" to="/terms">Terms</Link>
              <Link className="footer-bottom-link" to="/cookies">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ✅ REUSABLE COMPONENTS */

const FooterColumn = ({ title, links }) => (
  <>
    <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/40 mb-5">
      {title}
    </h4>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            to={link.href}
            className="text-primary-foreground/70 hover:text-primary-foreground 
            transition-colors text-sm flex items-center gap-1 group"
          >
            {link.label}
            <ArrowUpRight
              className="h-3 w-3 opacity-0 -translate-x-1 
              group-hover:opacity-100 group-hover:translate-x-0 transition-all"
            />
          </Link>
        </li>
      ))}
    </ul>
  </>
);

const InfoBlock = ({ label, value }) => (
  <p className="text-primary-foreground/70">
    <span className="block text-primary-foreground/40 text-xs mb-1">
      {label}
    </span>
    {value}
  </p>
);

export default Footer;
