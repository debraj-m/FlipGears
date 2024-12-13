import React from "react";

const Test = () => {
    const images = [
        "https://cdn0.iconfinder.com/data/icons/fitness-95/24/healthy-food-64.png",
        "https://cdn4.iconfinder.com/data/icons/fruits-and-veggies-2/230/fruits-and-veggies-icons_avocado-64.png",
        "https://cdn4.iconfinder.com/data/icons/fruits-and-veggies-2/270/fruits-and-veggies-icons_eggplant-64.png",
        "https://cdn4.iconfinder.com/data/icons/fruits-and-veggies-2/177/fruits-and-veggies-icons_garlic-64.png",
        "https://cdn4.iconfinder.com/data/icons/fruits-and-veggies-2/239/fruits-and-veggies-icons_lettuce-64.png",
        " https://cdn4.iconfinder.com/data/icons/fruits-and-veggies-2/204/fruits-and-veggies-icons_peas-64.png",
        "https://cdn4.iconfinder.com/data/icons/fruits-and-veggies-2/280/fruits-and-veggies-icons_chilli-pepper-64.png",
        "https://cdn4.iconfinder.com/data/icons/fruits-and-veggies-2/270/fruits-and-veggies-icons_onion-64.png",
        "https://cdn4.iconfinder.com/data/icons/fruits-and-veggies-2/209/fruits-and-veggies-icons_pepper-64.png"
      ];

  return (
    <div className="h-[10vw] w-full overflow-hidden flex justify-center items-center">
      <div className="flex animate-slide">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`${index}`}
          className=" h-[5vw] w-[5vw]  mx-[2.6vw]"
        />
   
        ))}{images.map((src, index) => (
           <img
            key={index}
            src={src}
            alt={`${index}`}
            className=" h-[5vw] w-[5vw]  mx-[2.6vw]"
          />))}
      </div>
    </div>

  );
};

export default Test;


/*

 {elem.images.map((src, index1) => (
        <img
          key={index1}
          src={src}
          alt={`${index1}`}
          className=" h-[7vw] w-[7vw]  mx-[2.6vw]"
        />
   
        ))}
        {elem.images.forEach((src, index1) => (
           <img
            key={index1}
            src={src}
            alt={`${index1}`}
            className=" h-[5vw] w-[5vw]  mx-[2.6vw]"
          />))}



*/