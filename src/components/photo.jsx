import React from "react"
 
import BlurVignette from "../components/ui/blur-vignette.jsx"
 
export default  function BlurVignetteDemo() {
  return (
    
    <div className="relative max-w-4xl">
      <div className="flex flex-wrap gap-4 py-4">
        <BlurVignette
          radius="24px"
          inset="2px"
          transitionLength="50px"
          blur="60px"
          switchView={true}
          className="aspect-square  flex-1 rounded-[2.5rem]"
        >
          <img
            width={500}
             priority="true"
            height={500}
            className="size-full rounded-[2.5rem] object-cover"
            src="myPhoto.png"
            alt="photo"
          />
        </BlurVignette>
      </div>
    </div>
  )
}
 
