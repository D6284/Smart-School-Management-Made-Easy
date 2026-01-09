import React from 'react';

interface HeroProps {
  title: string;
  subtitle?: string;
  ctaPrimary?: { label: string; onClick: () => void };
  ctaSecondary?: { label: string; onClick: () => void };
  imageUrl: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, ctaPrimary, ctaSecondary, imageUrl }) => {
  return (
    <header className="relative w-full">
      <picture>
        <source media="(min-width:1024px)" srcSet={`${imageUrl}&w=1400&q=80`} />
        <source media="(min-width:640px)" srcSet={`${imageUrl}&w=900&q=80`} />
        <img src={`${imageUrl}&w=800&q=70`} alt="School hero image" className="responsive-img w-full h-96 sm:h-96 md:h-[420px] lg:h-[520px] object-cover rounded-b-3xl" />
      </picture>

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10 rounded-b-3xl flex items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight drop-shadow">{title}</h1>
            {subtitle && <p className="mt-4 text-lg text-white/90">{subtitle}</p>}

            <div className="mt-6 flex flex-wrap gap-3">
              {ctaPrimary && (
                <button onClick={ctaPrimary.onClick} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold shadow-md">
                  {ctaPrimary.label}
                </button>
              )}
              {ctaSecondary && (
                <button onClick={ctaSecondary.onClick} className="px-6 py-3 bg-white text-slate-800 rounded-full font-semibold shadow-sm">
                  {ctaSecondary.label}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
