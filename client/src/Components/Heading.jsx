import React from "react";
import "./Heading.css"; // Import a separate CSS file for styling

function Heading() {
  return (
    <div className="medium h-[15vw] w-full flex justify-center items-center">
      <h1 className="text-[6vw] text-black font-bold heading">
        <span className="flip">Flip</span>
        <span className="slide">Gears</span>
      </h1>
    </div>
  );


}

export default Heading;
