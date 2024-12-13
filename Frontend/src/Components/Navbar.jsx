
import React, { useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
const navItems = [
 
  { label: "GitHub", icon: "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-social-github-512.png", href: " https://github.com/debraj-m/FlipGears"},
 
  { label: "powerpoint", icon: "https://cdn1.iconfinder.com/data/icons/bootstrap-vol-3/16/filetype-ppt-64.png",href: "https://docs.google.com/presentation/d/1A0SZmdeClz5k_eUsEVA5PERbi_yvlFjsCuaRoEw5eGU/edit#slide=id.p6"},
];

const handleClick = (index) => {
      window.open(navItems[index].href, "_blank");
};

function Navbar() {
  return (
    <div className="Regular h-22 lg:h-[10vw] w-full bg-[#EFEEED] flex justify-between items-center px-[8vw]">

      <div className="lg:hidden  sm:flex h-full w-full mt-8" ><GiHamburgerMenu size={"2rem"}/></div>

      {navItems.map((item, index) => (
        <div
        onClick={()=>handleClick(index)}
          key={index}
          className="min-[300px]:hidden max-[600px]:hidden lg:flex cursor-pointer Medium text-[1.2vw] tracking-tight capitalize bg-white w-[12vw] h-[4vw] rounded-[2vw] flex justify-center items-center shadow-zinc-400 shadow-md gap-[0.4vw] "
        >
          
          <span className="flex">{item.label}</span>
          <img className=" w-[2vw] h-[2vw]" src={item.icon} alt={`${item.label} icon`} />
        </div>
      ))}
    </div>
  );
}

export default Navbar;


// import React, { useRef } from "react";

// const navItems = [
//   { label: "our team", icon: "https://cdn0.iconfinder.com/data/icons/eon-business-finance-i-1/32/team_group_unity_leader-64.png" },
//   { label: "GitHub", icon: "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-social-github-512.png" },
//   { label: "model", icon: "https://cdn4.iconfinder.com/data/icons/data-science/64/35_statistical_analysis-64.png" },
//   { label: "our approach", icon: "https://cdn2.iconfinder.com/data/icons/career-advancement-10/64/Basic-needs-approach-mindset-creative-64.png" },
//   { label: "powerpoint", icon: "https://cdn1.iconfinder.com/data/icons/bootstrap-vol-3/16/filetype-ppt-64.png" },
// ];

// function Navbar() {
//   return (
//     <div className="Regular h-[10vw] w-full bg-[#EFEEED] flex justify-around items-center px-[7vw]">
//       {navItems.map((item, index) => (
//         <div
//           key={index}
//           onClick={() => scrollToSection(item.label)}
//           className="cursor-pointer bg-white w-[4vw] h-[4vw] rounded-full flex justify-center items-center shadow-zinc-400 shadow-md gap-[0.4vw] hover:scale-110 transition-transform"
//         >
//           <img className="w-[2vw] h-[2vw]" src={item.icon} alt={`${item.label} icon`} />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Navbar;
