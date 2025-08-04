import React, { useState, useEffect } from "react";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import DivideLine from "./DivideLine";
import BlurVignetteDemo from "./photo";

const Profile = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "I write code.";

  useEffect(() => {
    setIsVisible(true);

    // Typewriter effect for the subtitle
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const socialLinks = [
    {
      href: "https://github.com/code-with-ShubhamS",
      icon: Github,
      label: "GitHub",
      color: "hover:bg-gray-800 hover:text-white",
    },
    {
      href: "https://www.linkedin.com/in/shubham-semwal-4080962b7/",
      icon: Linkedin,
      label: "LinkedIn",
      color: "hover:bg-blue-600 hover:text-white",
    },
    {
      href: "mailto:ghostoperator846@gmail.com",
      icon: Mail,
      label: "Email",
      color: "hover:bg-red-500 hover:text-white",
    },
    {
      href: "https://twitter.com/Shubham_code12",
      icon: Twitter,
      label: "Twitter",
      color: "hover:bg-blue-400 hover:text-white",
    },
  ];

 return (
    <div className="mx-auto mt-6 px-4 sm:px-6 lg:px-8">
      {/*  Header */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">
        {/* Text Section */}
        <div className="w-full md:w-2/3">
          <h3 className="text-xl sm:text-4xl lg:text-5xl font-bold text-white animate-fade-in">
            Shubham Semwal
          </h3>
          {/* Typewriter effect */}
          <div className="mt-2 h-8">
            <p className="text-lg sm:text-xl text-gray-300 font-medium">
              {typedText}
              <span className="animate-pulse text-white">|</span>
            </p>
          </div>
          {/*  Description */}
          <div className="mt-6 space-y-4">
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed hover:text-white transition-colors duration-300">
              Hello, I'm Shubham Semwal, a{" "}
              <span  className="underline decoration-wavy decoration-customGray text-[1.1rem] font-semibold text-[#f5f5dc]" >full Stack Developer</span>{" "}
              who enjoys building interesting things with code. Welcome to my
              digital space!
            </p>
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed hover:text-white transition-colors duration-300">
              My expertise lies in developing{" "}
              <span className="font-semibold text-white">
                responsive user interfaces
              </span>{" "}
              for web-based applications, ensuring a secure and seamless user
              experience.
            </p>
          </div>
        </div>
        {/*  Profile Image */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex-shrink-0 flex items-center justify-center mb-6 md:mb-0">
          <BlurVignetteDemo/>
        </div>
      </div>
      {/*  Social Links */}
      <div
        className={`mt-8 transform transition-all duration-1000 delay-700 `}
      >
        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center sm:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                group relative overflow-hidden
                bg-black/50 border-2 border-white/20 
                ${link.color}
                transition-all duration-300 ease-in-out
                rounded-xl px-4 py-3 sm:px-5 sm:py-3
                flex items-center justify-center
                shadow-md hover:shadow-lg hover:shadow-white/10
                transform hover:scale-105 hover:-translate-y-1
                animate-fade-in text-white hover:border-white/60
              `}
              style={{ animationDelay: `${800 + index * 100}ms` }}
              aria-label={link.label}
            >
              <link.icon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:rotate-12" />
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              {/* Tooltip */}
              <span
                className="absolute -top-10 left-1/2 transform -translate-x-1/2 
                             bg-white text-black text-xs px-2 py-1 rounded
                             opacity-0 group-hover:opacity-100 transition-opacity duration-300
                             whitespace-nowrap pointer-events-none"
              >
                {link.label}
              </span>
            </a>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Profile;
