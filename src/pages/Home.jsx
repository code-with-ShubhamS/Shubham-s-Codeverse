import { BentoDemo } from "@/components/BentoDemo";
import DivideLine from "@/components/DivideLine";
import Profile from "@/components/Profile";
import React from "react";

const Home = () => {
  return (
    <>
      <Profile />
      <DivideLine />
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <BentoDemo />
      </div>
    </>
  );
};

export default Home;
