import React from 'react';
import { BsBoxArrowInUpRight } from "react-icons/bs";

function Content(){

    const handleButtonClick = () => {
        // Replace the URL with your desired link
        window.open("https://drive.google.com/file/d/1cdE9Cxu1mHzI7QZmaEY2gVpdpp9SiMC2/view?usp=sharin", "_blank");
      };
    
    return(
    <>
        <div className='Medium h-[55vh] lg:h-[37.5vw] relative w-full bg-[#EFEEED] rounded-b-[10vw] overflow-hidden '>
        <div className={` animate-to-fro  absolute top-[21%] left-[60%] lg:top-[8%] lg:left-[54.7%] Medium text-[1.2vh] lg:text-[1.5vw] tracking-tight capitalize bg-white h-8 w-20 lg:w-[12vw] lg:h-[4vw] rounded-[2vh]  lg:rounded-[2vw] flex justify-center items-center shadow-zinc-400 shadow-md`}>Flipkart grid✨</div>
        
       <div className=' bg-[#efeeed] w-full h-full flex flex-col justify-center items-center'>
        <div className='w-[15vh] h-[15vh] lg:w-[12vw] lg:h-[11.5vw] rounded-full overflow-hidden bg-black flex justify-center items-center'>
        <img className='w-[15vh] h-[15vh] lg:w-[16vw] lg:h-[16vw] object-cover ' src="./img/flipkart.jpg" alt="" />
        </div>

         <h1 className='text-[35px] leading-[40px] lg:text-[4vw]  text-center lg:leading-[5vw] text-zinc-800'>Revolut<span className='text-zinc-700'>ion</span><span className='text-zinc-600'>izing</span></h1>
         <p className='text-[35px] leading-[35px] lg:text-[4vw] w-[58%] lg:w-[50%] text-center lg:leading-[4vw]'>Quality Con<span className='text-zinc-700'>trol</span><span className='text-zinc-600'> with </span>Automa<span className='text-zinc-600'>tion</span>
         </p>
         <button onClick={handleButtonClick} className='Regular m-[1.6vh] lg:m-[1.3vw] rounded-[2vh] lg:rounded-[2vw] capitalize w-[15vh] h-[5vh] lg:w-[14vw] lg:h-[4vw] bg-black text-[1.5vh] lg:text-[1vw]  text-white px-[1vw] py-[1vw] flex justify-center items-center gap-[.6vw]  shadow-xl shadow-zinc-400 '>Our video< BsBoxArrowInUpRight size={"1.5rem"}/></button>
       </div>

  
       </div>  

       
      </>);
  }
  export default Content;



 