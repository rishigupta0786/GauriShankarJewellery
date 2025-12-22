import React from "react";

const JewelleryHero = () => {
  const logoUrl = "/logotext.png";
  const ringUrl = "/ring.png";
  
  return (
    <div className="relative flex w-full items-center justify-center">
      {/* Rotating Ring with metallic shadows */}
      <div className="absolute flex flex-col items-center justify-center animate-spin-slow">
        <img
          src={ringUrl}
          alt="Rotating Gold Ring"
          className="lg:w-full w-72 metallic-shadow"
        />
      </div>

      {/* Logo */}
      <div className="z-20 animate-pulse-slow">
        <img
          src={logoUrl}
          alt="Gauri Shankar Jewellers"
          className="lg:w-full w-60"
        />
      </div>

      <style jsx>{`
        @keyframes spin-circle {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes pulse-subtle {
          0%, 100% {
            transform: scale(0.8);
            opacity: 1;
          }
          50% {
            transform: scale(0.85 );
            opacity: 0.9;
          }
        }
        
        .animate-spin-slow {
          animation: spin-circle 20s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-subtle 4s ease-in-out infinite;
        }
        
        /* Simple metallic shadow effect */
        .metallic-shadow {
          filter: 
            drop-shadow(0 0 10px rgba(255, 215, 0, 0.3)) /* Gold glow */
            drop-shadow(0 0 20px rgba(192, 192, 192, 0.4)) /* Silver glow */
        }
        
        /* For mobile */
        @media (max-width: 768px) {
          .metallic-shadow {
            filter: 
              drop-shadow(0 0 10px rgba(255, 215, 0, 0.3))
              drop-shadow(0 0 12px rgba(192, 192, 192, 0.2));
          }
        }
      `}</style>
    </div>
  );
};

export default JewelleryHero;