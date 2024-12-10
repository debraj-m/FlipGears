import React, { useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
const Team = () => {

    const data=[
        {
          img: "./img/debraj.jpg",
          name: "Debraj Mukherjee",
        }
        ,
        {
          img: "./img/ani.jpg",
          name: "aniruddh shahal",

        },
        {
            img: "./img/debanuj.jpg",
            name: "debanuj Roy",

          },{
            img: "./img/ritam.jpg",
            name: "Ritam koley",
          },
          {
            img: "./img/kri.jpg",
            name: "Kritanu Chattopadhyay",
          }
      ]
      const [hovered, setHovered] = useState(false);
      const [hovered1, setHovered1] = useState(false);
      const [hovered2, setHovered2] = useState(false);
      const [hovered3, setHovered3] = useState(false);
      const [hovered4, setHovered4] = useState(false);

  return (
    <section id="team" className="Medium w-full px-[7vw] bg-[#efeeed] py-[4vw] text-black rounded-t-[8vw]">
      <h1
        id="team_title"
        className="text-[6vw] font-normal capitalize text-center mb-6 text-grey-100"
      >Our Team</h1>

           <div className="flex items-center justify-between py-[2vw] px-[4vw] border-t-[.15vw] border-black hover:bg-zinc-800 hover:text-white transition-colors duration-500 " onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
          >
             <h4 className="text-[2.3vw] font-medium capitalize">
              {data[0].name}
            </h4>
            <div className={` w-[15vw] h-[15vw] overflow-hidden rounded-full  absolute left-[45%]  transition-transform  transition-transform ${
                hovered ? "scale-1 animate-zoom-out" : "hidden"
              }`}>

              <img
                src={data[0].img}
                className={`w-full h-full  object-cover object-top }`}/>
            </div>
            <div className="flex">

            <a href="https://www.linkedin.com/in/debrajm?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
            <FaLinkedin  cursor={"pointer"} size={"2vw"} />
            </a>
              
            </div>
          </div>

          <div className="flex items-center justify-between py-[2vw] px-[4vw] border-t-[.15vw] border-black hover:bg-zinc-800 hover:text-white transition-colors duration-500" onMouseEnter={() => setHovered1(true)} onMouseLeave={() => setHovered1(false)}
          >
             <h4 className="text-[2.3vw] font-medium capitalize">
              {data[1].name}
            </h4>
            <div className={` w-[15vw] h-[15vw] transition-transform duration-500 overflow-hidden rounded-full  absolute left-[45%]   ${
                hovered1 ? "scale-1 animate-zoom-out" : "hidden"
              }`}>

              <img
                src={data[1].img}
                className={`w-full h-full transition-transform duration-500 object-cover object-top }`}/>
            </div>
            <a href="https://www.linkedin.com/in/aniruddh-shahal-4a61a6295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
            <FaLinkedin  cursor={"pointer"} size={"2vw"} />
            </a>
          </div>
          
          <div className="capitalize flex items-center justify-between py-[2vw] px-[4vw] border-t-[.15vw] border-black hover:bg-zinc-800 hover:text-white transition-colors duration-500" onMouseEnter={() => setHovered2(true)} onMouseLeave={() => setHovered2(false)}
          >
             <h4 className="text-[2.3vw] font-medium ">
              {data[2].name}
            </h4>
            <div className={` w-[15vw] h-[15vw] overflow-hidden rounded-full  absolute left-[45%]  transition-transform  transition-transform ${
                hovered2 ? "scale-1 animate-zoom-out" : "hidden"
              }`}>

              <img
                src={data[2].img}
                className={`w-full h-full  object-cover object-top }`}/>
            </div>
            <a href="https://www.linkedin.com/in/debanuj-roy-b3709b275?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
            <FaLinkedin  cursor={"pointer"} size={"2vw"} />
            </a>
          </div>
          
          <div className="capitalize flex items-center justify-between py-[2vw] px-[4vw] border-t-[.15vw] border-black hover:bg-zinc-800 hover:text-white transition-colors duration-500" onMouseEnter={() => setHovered3(true)} onMouseLeave={() => setHovered3(false)}
          >
             <h4 className="text-[2.3vw] font-medium ">
              {data[3].name}
            </h4>
            <div className={` w-[15vw] h-[15vw] overflow-hidden rounded-full  absolute left-[45%]  transition-transform  transition-transform ${
                hovered3 ? "scale-1 animate-zoom-out" : "hidden"
              }`}>

              <img
                src={data[3].img}
                className={`w-full h-full  object-cover object-top }`}/>
            </div>
            <a href="https://www.linkedin.com/in/ritam-koley-2005rk3004?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
            <FaLinkedin  cursor={"pointer"} size={"2vw"} />
            </a>
          </div>

          <div className="capitalize flex items-center justify-between py-[2vw] px-[4vw] border-t-[.15vw] border-black hover:bg-zinc-800 hover:text-white transition-colors duration-500" onMouseEnter={() => setHovered4(true)} onMouseLeave={() => setHovered4(false)}
          >
             <h4 className="text-[2.3vw] font-medium ">
              {data[4].name}
            </h4>
            <div className={` w-[15vw] h-[15vw] overflow-hidden rounded-full  absolute left-[45%]  transition-transform  transition-transform ${
                hovered4 ? "scale-1 animate-zoom-out" : "hidden"
              }`}>

              <img
                src={data[4].img}
                className={`w-full h-full  object-cover object-top }`}/>
            </div>
            <a href="https://www.linkedin.com/in/kritanu-chattopadhyay-22b872210?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
            <FaLinkedin  cursor={"pointer"} size={"2vw"} />
            </a>
          </div>


    </section>
  );
};

export default Team;
