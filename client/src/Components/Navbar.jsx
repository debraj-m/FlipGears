import React from 'react';

const data=["our team",`GitHub `,"model","our approach","powerpoint"];

const icons=[
    "https://cdn0.iconfinder.com/data/icons/eon-business-finance-i-1/32/team_group_unity_leader-64.png",
    "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-social-github-512.png",
    "https://cdn4.iconfinder.com/data/icons/data-science/64/35_statistical_analysis-64.png",
    "https://cdn2.iconfinder.com/data/icons/career-advancement-10/64/Basic-needs-approach-mindset-creative-64.png",
    "https://cdn1.iconfinder.com/data/icons/bootstrap-vol-3/16/filetype-ppt-64.png"
];
function Navbar(){
    return(
    <>
        <div className=' Regular h-[10vw] w-full bg-[#EFEEED] flex justify-around items-center px-[7vw]'>
        {data.map((elem,index)=>{
        return(
        <div key={index} className={`cursor-pointer Medium text-[1.2vw] tracking-tight capitalize bg-white w-[12vw] h-[4vw] rounded-[2vw] flex justify-center items-center shadow-zinc-400 shadow-md gap-[.4vw]`}>{elem}
        <img className='w-[2vw] h-[2vw]' src={icons[index]} alt="icon"/>
        
        </div>
        
    )
})}

</div>
      </>);
  }
  export default Navbar;