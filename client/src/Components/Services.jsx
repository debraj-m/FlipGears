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
        <div className='Regular w-full h-[40vw] bg-[#efeeed] relative rounded-b-[8vw] mb-[5vw] flex flex-col justify-center items-center gap-[4vw]'>

        <h1 className='relative text-center text-[2vw] w-[40%] font-semibold leading-[2vw]'>Explore our Machine Learing models that reduces human errors by 80-90% </h1>

        <div className='Regular m-[1.3vw] rounded-[2vw] capitalize w-[14vw] h-[4vw] bg-white text-[1.2vw]  text-black px-[1vw] py-[1vw] flex justify-center items-center gap-[.6vw]  shadow-xl shadow-zinc-400 absolute top-[21.5%] z-[1] '>ML Models </div>
       <hr className='bg-zinc-300 w-full h-[.1vw] '/>

       <div className=' h-[20vw] w-full flex justify-center items-center '>

        {data.map((elem,index)=>{
            return(<div key={index} className='cursor-pointer  w-[25vw] h-full gap-[.7vw] flex flex-col justify-center items-center '>
                <div className='h-[4vw] w-[5vw] bg-white object-cover flex right-[1vw]'>
                    <img className='w-full h-full' src={elem.img} alt="..." />
                </div>
                <h1 className=' text-[1.3vw] text-center relative w-[88%] font-semibold w-[100%] text-center'>{elem.name}</h1>
                <h3 className='text-[.9vw] w-[80%] text-center'>{elem.description}</h3>
            </div>
           );
        })}

        

       </div>
        </div>
        </>
    );
}
export default Services;


