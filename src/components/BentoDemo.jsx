import { Mail, Github, Linkedin, Twitter } from "lucide-react";

import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";

import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { MarqueeDemo } from "./Marqueue";
import LetterGlitch from "./letterGlich";
import { GlobeDemo } from "./Globe";
import { IconClouds } from "./IconCloud";
import PixelTransition from "./PixelTransition";

const features = [
  {
    Icon: Github,
    name: "Github",
    description: "Explore my open-source projects and contributions.",
    href: "https://github.com/code-with-ShubhamS",
    cta: "Visit GitHub",
    background: (
      <div className="absolute flex items-center justify-center h-full w-full ">
        <img
          className="absolute -right-20 -top-20 opacity-60 border-none transition-all duration-100 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-110"
          src="github.png"
        />
      </div>
    ),
    className:
      "lg:row-start-1 lg:row-end-1 lg:col-start-1 lg:col-end-2  border border-solid border-[rgba(255,255,255,0.1)] shadow-[inset_0_-20px_80px_-20px_rgba(255,255,255,0.12)]  min-h-[14rem]",
  },
  {
    Icon: "",
    href: null,
    background: (
      <div className="absolute flex items-center justify-center h-full w-full overflow-hidden">
        <MarqueeDemo />
      </div>
    ),
    className:
      "lg:col-start-2 lg:col-end-4 lg:row-start-1 lg:row-end-2  border border-solid border-[rgba(255,255,255,0.1)] min-h-[14rem]",
  },
  {
    Icon: "",
    href: null,
    background: (
      <div className="absolute flex items-center justify-center h-full w-full overflow-hidden">
        <IconClouds></IconClouds>
      </div>
    ),
    className:
      "lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-4  border border-solid border-[rgba(255,255,255,0.1)] min-h-[14rem]",
  },
  {
    Icon: GlobeIcon,
    name: "Globe",

    href: null,

    background: (
      <div className="absolute flex items-center justify-center h-full w-full border-none transition-all duration-100 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-110 overflow-hidden">
        <GlobeDemo />
      </div>
    ),
    className:
      "lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3 bg-black shadow-[inset_0_-20px_80px_-20px_rgba(255,255,255,0.12)] border border-solid border-[rgba(255,255,255,0.1)] min-h-[14rem]",
  },
  {
    Icon: "",

    href: null,

    background: (
      <div className="absolute opacity-60 h-full w-full overflow-hidden">
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
      </div>
    ),
    className:
      "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3  border border-solid border-[rgba(255,255,255,0.1)] min-h-[14rem]",
  },
  {
    Icon: "",
    href: null,
    background: (
      <div
        className="absolute h-full w-full overflow-hidden
       border-none transition-all duration-100 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-110 
      "
      >
        <PixelTransition
          firstContent={
            <img
              src="surkanda.jpg"
              alt="default pixel transition content, a cat!"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          }
          secondContent={
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "grid",
                placeItems: "center",
                backgroundColor: "#111",
              }}
            >
              <p
                style={{ fontWeight: 900, fontSize: "3rem", color: "#ffffff" }}
              >
                Winter line
              </p>
            </div>
          }
          gridSize={12}
          pixelColor="#ffffff"
          animationStepDuration={0.4}
          className="custom-pixel-card"
        />
      </div>
    ),
    className:
      "lg:col-start-2 lg:col-end-4 lg:row-start-3 lg:row-end-3  border border-solid border-[rgba(255,255,255,0.1)] min-h-[14rem]",
  },
];

export function BentoDemo() {
  return (
    <BentoGrid className="lg:grid-rows-3">
      {features.map((feature, i) => (
        <BentoCard key={i} {...feature} />
      ))}
    </BentoGrid>
  );
}
