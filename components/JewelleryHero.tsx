import React from "react";

const JewelleryHero = () => {
  const logoUrl = "/logotext.png";
  const ringUrl = "/ring.png";
  return (
    <div className="relative flex  w-full items-center justify-center">
      <div className="absolute flex flex-col items-center justify-center animate-spin-slow">
        <img
          src={ringUrl}
          alt="Rotating Gold Ring"
          className=" opacity-80"
        />
      </div>
      <div className=" z-10 animate-pulse-slow">
        <img
          src={logoUrl}
          alt="Gauri Shankar Jewellers"
          className=" drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]"
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
          0%,
          100% {
            transform: scale(0.95);
            opacity: 1;
          }
          50% {
            transform: scale(1);
            opacity: 0.9;
          }
        }
        .animate-spin-slow {
          animation: spin-circle 20s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-subtle 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default JewelleryHero;
