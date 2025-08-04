import React from "react";

export default function CommingSoon() {
  return (
    <div className="flex flex-col items-center justify-center flex-1  text-white  overflow-hidden border-none">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute w-72 h-72 bg-purple-700 opacity-30 rounded-full blur-3xl animate-pulse-slow left-10 top-10"></div>
        <div className="absolute w-96 h-96 bg-blue-600 opacity-20 rounded-full blur-3xl animate-pulse-slow right-20 bottom-20"></div>
        <div className="absolute w-60 h-60 bg-pink-500 opacity-25 rounded-full blur-2xl animate-pulse-slow left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-5xl sm:text-7xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent animate-gradient-x mb-6 drop-shadow-lg">
          Coming Soon
        </h1>
        <p className="text-lg sm:text-2xl text-gray-300 mb-8 animate-fade-in">
          This page is under construction. Stay tuned!
        </p>
        {/* Animated dots */}
        <div className="flex space-x-2 mt-4">
          <span className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></span>
          <span className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-150"></span>
          <span className="w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-300"></span>
        </div>
      </div>
      {/* Custom animations */}
      <style>
        {`
          @keyframes gradient-x {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 3s ease-in-out infinite;
          }
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.1); }
          }
          .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fade-in 1.2s cubic-bezier(.4,0,.2,1) both;
          }
        `}
      </style>
    </div>
  );
}