import React from "react";
import { useNavigate } from "react-router-dom";

function Project() {
  const navigate = useNavigate(); // Use the useNavigate hook for navigation
  navigate("/Full-Project"); // Use navigate as a function

  const handleClick = () => {
    window.open("https://drive.google.com/file/d/1cdE9Cxu1mHzI7QZmaEY2gVpdpp9SiMC2/view?usp=sharin", "_blank");
  };

  return (
    <>
      <div className="Regular h-[35vh] lg:h-[40vw] w-full bg-[#F9F9F9] flex flex-col py-[2vw] justify-start items-center rounded-t-[8vw] mt-[4vw] mb-[4vw] gap-[1.5vw]">
        <img className="h-[12vh] w-[17vh] lg:h-[12vw] lg:w-[17vw] " src="./img/hand.png" alt="" />
        <h3 className="text-[3vh] lg:text-[3.4vw] font-bold capitalize w-[60%] lg:w-[35%] text-center leading-[3vh] lg:leading-[3.8vw]">
          Let me tell you about our project
        </h3>

        <p className="w-[80%] text-[1.4vh] lg:w-[60%] lg:text-[1.5vw]">
          Growing up in India, one of our fondest memories is visiting the market
          with our parents- be it to buy groceries or only to carry the heavy bags.
          Many a times, we would watch our parents buy fruits, vegetables and other
          grocery items, only to watch them turn out rotten or expired. Manual inspection
          of the goods does have its own shortcomings-
          <span onClick={handleClick} className="text-blue-600 hover:text-blue-800 cursor-pointer ml-1">Read More</span>
        </p>
      </div>
    </>
  );
}

export default Project;