import React from 'react';

const DivideLine = () => {
  return (
    <div className="relative flex items-center justify-center py-8">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/60 to-white/20 transform scale-x-0 animate-pulse origin-center transition-transform duration-1000 hover:scale-x-100"></div>
      </div>
    </div>
  );
};

export default DivideLine;