import React from 'react';

function Heading() {
  
    const text = "FLIPGEARS";

    

  return (
  
     <div className=" relative w-full h-[15vw] bg-white">


     
      <h1 className="relative Regular flex justify-center items-center w-full h-full text-black text-[5vw] font-bold tracking-[2vw]">
        {text.split("").map((char, index) => (
          <span
            key={index} 
            className={`inline-block opacity-0 animate-fadeIn`}
            style={{ animationDelay: `${index * 0.5}s` }}
          >
            {char}
          </span>
        ))}
      </h1> 

    </div>

  );
};

export default Heading;


