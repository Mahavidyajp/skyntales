import skinCloseup from "@/assets/skin-closeup.jpg";
import ecoProduct from "@/assets/eco-product.jpg";

const images = [
  skinCloseup,
  "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400",
  "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400",
  ecoProduct,
  "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400",
  "https://images.unsplash.com/photo-1580854404044-7c99f4d1a5a0?w=400",
];

const InstagramSection = () => {
  return (
    <section className="py-16 sm:py-20 bg-background overflow-hidden">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading inline-flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
          Follow On
          <span className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden inline-block shadow-lg">
            <img
              src={skinCloseup}
              alt="Instagram"
              className="w-full h-full object-cover"
            />
          </span>
          <span className="italic">Instagram</span>
        </h2>
      </div>

      <div className="flex overflow-hidden group">
        <div className="flex gap-4 sm:gap-6 animate-marquee group-hover:[animation-play-state:paused]">
          {[...images, ...images].map((img, index) => (
            <a
              key={index}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-48 sm:w-64 h-auto rounded-xl overflow-hidden shadow-md"
            >
              <img
                src={img}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover aspect-square transition-transform duration-500 ease-in-out hover:scale-105"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
