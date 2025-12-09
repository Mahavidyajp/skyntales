import { Star, Recycle, Check } from "lucide-react";
import skinCloseup from "@/assets/skin-closeup.jpg";
import product2 from "@/assets/product-2.jpg";
import leaf from "@/assets/eco-product.jpg";

const SocialProofSection = () => {
  return (
    <section className="bg-[#F5F5F2] py-16 sm:py-20 lg:py-28 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif max-w-xl text-[#1a1a1a]">
            Why Your Skin
            <br />
            <span className="italic text-gray-500">Deserves the Best</span>
          </h2>
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="text-right">
              <div className="flex gap-0.5 justify-end mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current text-black" />
                ))}
              </div>
              <span className="text-sm text-gray-600">4.7 (1,109 reviews)</span>
            </div>
            <div className="flex -space-x-4 rtl:space-x-reverse">
              <img className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-4 border-[#F5F5F2] object-cover shadow-md" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100" alt="Customer 1"/>
              <img className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-4 border-[#F5F5F2] object-cover shadow-md z-10" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" alt="Customer 2"/>
              <img className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-4 border-[#F5F5F2] object-cover shadow-md" src={skinCloseup} alt="Customer 3"/>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 sm:gap-8 items-start">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden lg:col-span-3 lg:row-span-2 h-full min-h-[480px] group">
            <img src={skinCloseup} alt="Close-up of a person's face" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-xl max-w-sm">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                  <Check className="h-6 w-6 text-black" strokeWidth={2.5} />
                </div>
                <span className="text-lg font-semibold text-gray-900">Proven</span>
              </div>
              <h4 className="font-serif text-2xl sm:text-3xl text-gray-900 mb-2">Effectiveness</h4>
              <p className="text-sm text-gray-700 leading-relaxed">Every product is carefully crafted to meet the highest quality standards.</p>
            </div>
          </div>

          <div className="bg-[#EFEFEA] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:col-span-3">
            <div className="grid grid-cols-2 gap-6 items-center">
              <div>
                <Recycle className="h-7 w-7 text-black/90 mb-6" strokeWidth={1.5} />
                <h3 className="font-serif text-3xl sm:text-4xl leading-tight text-black/90">Eco-Friendly<br /><span className="italic">Packaging</span></h3>
                <p className="text-gray-600 leading-relaxed mt-4 text-sm sm:text-[15px]">Eco-friendly materials designed to care for the planet as much as your skin.</p>
              </div>
              <div className="flex justify-center items-center">
                <img src={product2} alt="Black dropper bottle" className="w-32 sm:w-36 md:w-40"/>
              </div>
            </div>
          </div>

          <div className="bg-[#343E3A] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:col-span-3">
            <div className="grid grid-cols-2 gap-6 items-center">
              <div className="flex justify-center items-center">
                <img src={leaf} alt="A green leaf" className="w-4/5 h-auto max-w-[150px]"/>
              </div>
              <div>
                <h3 className="font-serif text-3xl sm:text-4xl leading-tight text-white">100% Natural<br /><span className="italic text-white/80">100% You</span></h3>
                <div className="space-y-3 mt-4">
                  {[ 'No Harsh Chemicals', 'Plant-Based Goodness', 'Ethically Sourced' ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-white/80 flex-shrink-0" strokeWidth={2} />
                      <span className="text-sm text-white/80 font-light">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
