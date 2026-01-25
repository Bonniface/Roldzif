import React, { useState } from 'react';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "https://cdn-icons-png.flaticon.com/512/3063/3063822.png",
      title: "Reliable Medical Logistics",
      description: "Seamless transport for specimens, blood, and organs with strict chain-of-custody protocols.",
      color: "bg-blue-50"
    },
    {
      id: 2,
      image: "https://cdn-icons-png.flaticon.com/512/2830/2830305.png",
      title: "Cold Chain Integrity",
      description: "Real-time temperature monitoring ensures sensitive pharmaceuticals arrive safely.",
      color: "bg-emerald-50"
    },
    {
      id: 3,
      image: "https://cdn-icons-png.flaticon.com/512/2893/2893149.png",
      title: "Emergency Response",
      description: "STAT delivery options with ambulance and drone fleet integration for critical care.",
      color: "bg-amber-50"
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-display">
      {/* Skip Button */}
      <div className="flex justify-end p-6">
        <button 
          onClick={onComplete}
          className="text-slate-400 font-bold text-sm uppercase tracking-wider hover:text-primary transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center pb-12">
        <div className={`w-64 h-64 rounded-full ${slides[currentSlide].color} flex items-center justify-center mb-12 relative overflow-hidden transition-colors duration-500`}>
          <div className="absolute inset-0 bg-white/20 blur-xl"></div>
          <img 
            src={slides[currentSlide].image} 
            alt={slides[currentSlide].title} 
            className="w-40 h-40 object-contain relative z-10 drop-shadow-xl animate-in fade-in zoom-in duration-500 key={currentSlide}" // key forces re-render for animation
          />
        </div>

        <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
          {slides[currentSlide].title}
        </h2>
        <p className="text-slate-500 text-base leading-relaxed font-medium">
          {slides[currentSlide].description}
        </p>
      </div>

      {/* Bottom Controls */}
      <div className="p-8 pb-12">
        <div className="flex items-center justify-between">
          {/* Pagination Dots */}
          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-8 bg-primary' : 'w-2 bg-slate-200'
                }`}
              ></div>
            ))}
          </div>

          {/* Action Button */}
          <button 
            onClick={handleNext}
            className="bg-slate-900 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl shadow-slate-900/20 active:scale-90 transition-all hover:bg-slate-800"
          >
            <span className="material-symbols-outlined text-2xl">
              {currentSlide === slides.length - 1 ? 'check' : 'arrow_forward'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
