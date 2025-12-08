import skinCloseup from "@/assets/skin-closeup.jpg";
import ecoProduct from "@/assets/eco-product.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";

const images = [
  skinCloseup,
  "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400",
  "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400",
  ecoProduct,
  "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400",
];

const InstagramSection = () => {
  return (
    <section className="section-padding-sm bg-background">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-h2 md:text-h1 font-heading inline-flex items-center gap-4 flex-wrap justify-center">
          Follow On
          <span className="w-16 h-16 rounded-xl overflow-hidden inline-block shadow-kanva-md">
            <img
              src={skinCloseup}
              alt="Instagram"
              className="w-full h-full object-cover"
            />
          </span>
          <span className="italic">Instagram</span>
        </h2>
      </div>

      {/* Image Grid */}
      <div className="flex overflow-hidden">
        <div className="flex animate-[marquee_40s_linear_infinite]">
          {[...images, ...images].map((img, index) => (
            <a
              key={index}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-64 h-80 mx-2 overflow-hidden rounded-xl group"
            >
              <img
                src={img}
                alt={`Instagram ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
