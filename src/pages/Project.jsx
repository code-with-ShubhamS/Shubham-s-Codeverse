import React from "react";
import ProjectArray from "../Constant/Project";
import ProjectData from "../components/ProjectData.jsx";

const Project = () => {
  
  return (
    <>
      <div className=" flex justify-center items-center">
        <div className="flex flex-col p-1 rounded-lg overflow-hidden max-w-[60rem] relative mt-[1rem] z-20">
          <div className="text-center relative">
            {/* Main Heading */}
            <h1 className="text-[2.5rem] font-bold sm:text-6xl">Projects</h1>

            {/* Subheading */}
            <p className="text-lg mt-2 text-gray-400">Projects I've crafted.</p>
          </div>

          {ProjectArray.map((ProjectArr, index) => {
            return (
              <ProjectData
                key={index}
                title={ProjectArr.tittle}
                date={ProjectArr.publishDate}
                image={ProjectArr.image}
                description={ProjectArr.description}
                technology={ProjectArr.technology}
                sourceCodeUrl={ProjectArr.sourceCodeUrl}
                liveDemoUrl={ProjectArr.LiveLink}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Project;
