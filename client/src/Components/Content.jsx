import React from 'react';
import { BsBoxArrowInUpRight } from "react-icons/bs";

function Content(){
    return(
    <>
        <div className='Medium h-[37.5vw] relative w-full bg-[#EFEEED] rounded-b-[10vw] overflow-hidden '>
        <div className={` animate-to-fro absolute top-[8%] left-[55%] Medium text-[1.5vw] tracking-tight capitalize bg-white w-[12vw] h-[4vw] rounded-[2vw] flex justify-center items-center shadow-zinc-400 shadow-md`}>Flipkart grid✨</div>
        
       <div className='bg-[#efeeed] w-full h-full flex flex-col justify-center items-center'>
        <div className='w-[12vw] h-[11.5vw] rounded-full overflow-hidden bg-black flex justify-center items-center'>
        <img className='w-[16vw] h-[16vw] object-cover ' src="./img/flipkart.jpg" alt="" />
        </div>

         <h1 className='text-[4vw]  text-center leading-[5vw] text-zinc-800'>Revolut<span className='text-zinc-700'>ion</span><span className='text-zinc-600'>izing</span></h1>
         <p className='text-[4vw] w-[50%] text-center leading-[4vw]'>Quality Con<span className='text-zinc-700'>trol</span><span className='text-zinc-600'> with </span>Automa<span className='text-zinc-600'>tion</span>
         </p>
         <button className='Regular m-[1.3vw] rounded-[2vw] capitalize w-[14vw] h-[4vw] bg-black text-[1vw]  text-white px-[1vw] py-[1vw] flex justify-center items-center gap-[.6vw]  shadow-xl shadow-zinc-400 '>Our video< BsBoxArrowInUpRight size={"1.6vw"}/></button>
       </div>

     

       </div>  
      </>);
  }
  export default Content;



  /*
  
  <div style="background: url(&quot;https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png&quot;); opacity: 0.4; inset: -200%; width: 400%; height: 400%; position: absolute; transform: translateX(-6.1%) translateY(17.5%) translateZ(0px);"></div>

  */