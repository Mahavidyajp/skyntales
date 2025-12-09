import skinCloseup from '@/assets/skin-closeup.jpg';
import ecoProduct from '@/assets/eco-product.jpg';
import { Leaf } from 'lucide-react';

const StatementSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-4xl sm:text-5xl lg:text-6xl font-serif text-stone-800 leading-normal sm:leading-relaxed">
          <span>Refresh your skin, </span>
          <span className="inline-block relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 -rotate-6 align-middle mx-1 sm:mx-2">
            <img
              src={skinCloseup}
              alt="Skin closeup"
              className="rounded-xl object-cover w-full h-full border-2 sm:border-4 border-white shadow-lg"
            />
          </span>
          <span>love yourself, </span>
          <br className="sm:hidden" />
          <span className="inline-block relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rotate-6 align-middle mx-1 sm:mx-2">
            <img
              src={ecoProduct}
              alt="Eco product"
              className="rounded-xl object-cover w-full h-full border-2 sm:border-4 border-white shadow-lg"
            />
          </span>
          <br className="hidden lg:block" />
          <span>renew your glow.</span>
          <span className="inline-block text-green-600/50 rotate-12 align-bottom ml-1 sm:ml-2">
             <Leaf className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20" strokeWidth={1} />
          </span>
        </p>
      </div>
    </section>
  );
};

export default StatementSection;
