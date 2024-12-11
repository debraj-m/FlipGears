import React from 'react';

function Services(){

    const data=[
        {
            img: './img/ui.png',
            name: 'Brand Detection Model',
            description: 'Automated identification of brand specific products for efficient inventory categorization'
        },
        {
            img: './img/web.png',
            name: 'Freshness Detection Model',
            description: 'Using predictive tech to model and assess the quality and freshness of perishable goods'
        },
        {
            img: './img/design.png',
            name: 'Object Count Model',
            description: 'Utilizing computer vision technology to optimize object counting and tracking'
        },
        {
            img: './img/dev.png',
            name: 'MFG & Expiry Date Detection Model',
            description: 'Leveraging OCR technology to streamline identification and recording of MFG and Expiry date in products'
        }
    ];



    return (
        <>
        <div className='Regular h-[53vh] w-full lg:h-[40vw] bg-[#efeeed] relative rounded-b-[8vw] mb-[5vw] flex flex-col justify-center items-center gap-[2vh] lg:gap-[4vw]'>

        <h1 className='relative text-center text-[2.5vh] lg:text-[2vw] w-[70%] lg:w-[40%] font-semibold leading-[2.7vh] lg:leading-[2vw]'>Explore our Machine Learing models that reduces human errors by 80-90% </h1>

        <div className='Regular m-[1.3vw] rounded-[2vw] capitalize  w-[12vh] h-[3vh] lg:w-[14vw] lg:h-[4vw] bg-white text-[1.2vh] lg:text-[1.2vw]  text-black px-[1vw] py-[1vw] flex justify-center items-center gap-[.6vw]  shadow-xl shadow-zinc-400 absolute top-[21%] lg:top-[21.5%] z-[1] '>ML Models </div>
       <hr className='bg-zinc-300 w-full h-[.2vw] lg:h-[.1vw] '/>

       <div className=' h-[35vh] lg:h-[20vw] w-full flex flex-wrap lg:flex-nowrap flex justify-center items-center'>

        {data.map((elem,index)=>{
            return(<div key={index} className='cursor-pointer w-[35%] lg:w-[25vw] h-[15vh] lg:h-auto gap-[.7vw] lg:flex lg:flex-col justify-center items-center '>
                <div className='h-[5vh] w-[14vh] lg:h-[4vw] lg:w-[5vw]  lg:object-cover flex justify-center  lg:right-[1vw]'>
                    <img className=' lg:w-full lg:h-full' src={elem.img} alt="..." />
                </div>
                <h1 className='text-[1.5vh] leading-[2vh] lg:leading-[1.5vh] lg:text-[1.3vw] text-center relative w-[90%] lg:w-[88%] font-semibold  text-center'>{elem.name}</h1>
                <h3 className='text-[1vh] leading-[1.3vh] mt-[.5vh]  lg:leading-[1.3vw] lg:mt-[.5vw] w-[90%] lg:text-[1vw] lg:w-[80%] text-center'>{elem.description}</h3>
            </div>
           );
        })}

        

       </div>
        </div>
        </>
    );
}
export default Services;


