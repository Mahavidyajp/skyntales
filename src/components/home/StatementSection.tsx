import skinCloseup from "@/assets/skin-closeup.jpg";

const StatementSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-kanva">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-h1 md:text-display font-heading leading-tight">
            <span className="inline-flex items-center flex-wrap justify-center gap-4">
              <span className="italic">Refresh your skin,</span>
              <span className="w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden inline-block align-middle shadow-kanva-md">
                <img
                  src={skinCloseup}
                  alt="Skin care"
                  className="w-full h-full object-cover"
                />
              </span>
              <span className="italic">love yourself,</span>
            </span>
            <br />
            <span className="inline-flex items-center flex-wrap justify-center gap-4 mt-2">
              <span className="italic">renew your glow.</span>
              <svg className="w-16 h-16 md:w-20 md:h-20 text-sage inline-block" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 10C30 30 20 50 20 70C20 85 35 95 50 95C65 95 80 85 80 70C80 50 70 30 50 10Z" opacity="0.3" />
                <path d="M50 25C35 40 28 55 28 72C28 82 38 88 50 88C62 88 72 82 72 72C72 55 65 40 50 25Z" />
              </svg>
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default StatementSection;
