import React from 'react';
import { BsBoxArrowInUpRight } from "react-icons/bs";

function Model(){


const data=[
    {   
        name: 'brand detection model',
        purpose:"To automate the detection and categorization of brand-specific products,enhancing inventory management  and quality control for flipkart.",
        description:"Our Brand Identification Model utilizes the YOLO v8 architecture, trained on a custom dataset of 800 images with labels for testing, training, and cross-validation. This model is specifically designed to identify products from popular brands such as Dabur, Nivea, Harpic, Mamaearth, Unibic, Dettol, and Saffola. By integrating OpenCV for webcam access, the pre- trained model can infer and display detected classes in real-time from the live video feed, ensuring accurate and efficient brand detection",
        images:[
            "https://cdn1.iconfinder.com/data/icons/brands-3/512/fi-brands-github-64.png",
            "https://cdn1.iconfinder.com/data/icons/brands-5/512/fi-brands-premiere-64.png",
            "https://cdn1.iconfinder.com/data/icons/brands-5/512/fi-brands-starbucks-64.png",
            "https://cdn1.iconfinder.com/data/icons/brands-5/512/fi-brands-nestle-64.png",
            "https://cdn1.iconfinder.com/data/icons/brands-5/512/fi-brands-unilever-64.png",
            "https://cdn3.iconfinder.com/data/icons/picons-social/57/27-amazon-64.png",
            "https://cdn2.iconfinder.com/data/icons/social-icons-32/512/flipkart-64.png",
            "https://cdn1.iconfinder.com/data/icons/food-and-drink-vol-1-1/512/2-64.png",
            "https://cdn3.iconfinder.com/data/icons/brands-applications/512/brands-64.png"
          ]
    },
    {
        name: 'freshness detection model',
        purpose:"Automatically identifies products that are not fresh,ensuring only high-quality items remain.",
        description:"Our Freshness Detection Model utilizes the YOLO architecture, trained on a custom dataset of 2,000 images for training, testing, and cross-validation. It accurately identifies fresh and rotten produce, including apples, oranges, cucumbers, and pomegranates, helping to separate edible items from inedible ones.With OpenCV integration for camera access, the model performs real-time detection, displaying the freshness status of the produce. This ensures that only high-quality products reach consumers, enhancing food safety",
        images:[
            "https://cdn0.iconfinder.com/data/icons/fitness-95/24/healthy-food-64.png",
            "https://cdn4.iconfinder.com/data/icons/fruits-and-veggies-2/230/fruits-and-veggies-icons_avocado-64.png",
            "https://cdn4.iconfinder.com/data/icons/fruits-and-veggies-2/270/fruits-and-veggies-icons_eggplant-64.png",
            "https://cdn4.iconfinder.com/data/icons/fruits-and-veggies-2/177/fruits-and-veggies-icons_garlic-64.png",
            "https://cdn4.iconfinder.com/data/icons/fruits-and-veggies-2/239/fruits-and-veggies-icons_lettuce-64.png",
            " https://cdn4.iconfinder.com/data/icons/fruits-and-veggies-2/204/fruits-and-veggies-icons_peas-64.png",
            "https://cdn4.iconfinder.com/data/icons/fruits-and-veggies-2/280/fruits-and-veggies-icons_chilli-pepper-64.png",
            "https://cdn4.iconfinder.com/data/icons/fruits-and-veggies-2/270/fruits-and-veggies-icons_onion-64.png",
            "https://cdn4.iconfinder.com/data/icons/fruits-and-veggies-2/209/fruits-and-veggies-icons_pepper-64.png"
          ]
    },
    {
        name: 'object count model',
        purpose:"An object count detection model to automate,real-time couting for enhanced efficiency and scalability. ",
        description:"Our Manufacturing and Expiry Date Detection Model automates date extraction and validation using EasyOCR and Google Cloud Vision API for precise text recognition. Real-time video processing is enabled by OpenCV, with NumPy and Pandas managing data operations and inventory tracking. Product detection and classification are powered by Ultralytics YOLOV8, ensuring efficiency and accuracy in quality control and inventory management",
        images:[
           "https://cdn1.iconfinder.com/data/icons/carbon-design-system-vol-4/32/group-objects-64.png",
           "https://cdn1.iconfinder.com/data/icons/carbon-design-system-vol-4/32/group-objects--save-64.png",
           "https://cdn1.iconfinder.com/data/icons/carbon-design-system-vol-4/32/group-objects--new-64.png",
           "https://cdn1.iconfinder.com/data/icons/aami-web-internet/64/aami15-88-64.png","https://cdn0.iconfinder.com/data/icons/navigation-map-2/64/radar-device-detect-objects-distance-64.png",
           "https://cdn1.iconfinder.com/data/icons/carbon-design-system-vol-8/32/ungroup-objects-64.png",
           "https://cdn3.iconfinder.com/data/icons/3d-modeling/64/18_model_preparation-64.png",
           "https://cdn0.iconfinder.com/data/icons/earthquake-emergency-plan/392/earthquake-quake-emergency-004-64.png",
           "https://cdn3.iconfinder.com/data/icons/basic-mobile-part-2/512/Modules-64.png"
          ]
    },
    {
        name: 'MFG & Expiry Date Detection Model',
        purpose:"A model to automate manufacturing and expiry date detection, ensuring accurate validation for efficient inventory and quality management. ",
        description:"Our Object Count Detection Model utilizes the YOLO architecture, trained on a custom dataset of 3,000 images for training, testing, and cross- validation. It accurately detects and counts objects such as boxes, bottles, and fruits in various settings, ensuring precision in diverse applications. With OpenCV integration for camera access, the model performs real-time object counting, displaying results instantly. This enhances efficiency in inventory management, logistics, and quality control by minimizing errors and manual intervention",
        images:[
            "https://cdn0.iconfinder.com/data/icons/phosphor-regular-vol-4/256/qr-code-64.png",
            "https://cdn2.iconfinder.com/data/icons/finance-31/24/finance-10-64.png",
            "https://cdn0.iconfinder.com/data/icons/phosphor-thin-vol-4/256/qr-code-thin-64.png",
            "https://cdn0.iconfinder.com/data/icons/business-collection-2027/60/price-tag-1-64.png",
            "https://cdn4.iconfinder.com/data/icons/iconsimple-business/512/qr_code-64.png",
            "https://cdn0.iconfinder.com/data/icons/shopping_icons_set2/128/9.png",
            "https://cdn2.iconfinder.com/data/icons/economic-part-3/100/qr-scan-64.png",
            "https://cdn0.iconfinder.com/data/icons/ui-ux-kit/100/scan-64.png",
            "https://cdn0.iconfinder.com/data/icons/business-collection-2027/60/barcode-1-64.png"
          ]
    
    }
];


    return(
        <>
        {data.map((elem,index)=>{
            return(
        <div key={index} className='Regular w-full h-[100vw]  bg-[#efeeed] relative flex flex-col justify-center items-center rounded-t-[8vw] mb-[4vw]'>

        <h1 className='text-[3.4vw] Medium capitalize'>{elem.name}</h1>
      
        <h2 className='text-[1.4vw] w-[80%] text-center '> 
        <span className='text-[2vw] font-semibold'>Purpose:</span>{elem.purpose}</h2>

        <div className='w-full h-[30vw] relative flex justify-evenly items-center bg-[#efeeed]  rounded-b-[8vw]'>

            <div className='w-[45%] h-full gap-[2vw] flex flex-col relative justify-center left-[3vw] items-center'>
                <div className='flex flex-col gap-[.5vw]'><button className='bg-white w-[13vw] h-[4vw] text-[1vw] capitalize rounded-[5vw]'>Use this Model</button>
                <h3 className='w-[13vw] text-[1.1vw] capitalize flex justify-center'>(camera Access Required)</h3></div>
                <h1 className='uppercase text-[3vw] '>or</h1>
                <button className='bg-white w-[13vw] h-[4vw] text-[1vw] capitalize rounded-[5vw]'>upload video</button>
                <button className='flex items-center gap-[.5vw] capitalize text-[1.4vw]'>< BsBoxArrowInUpRight size={"1.4vw"}/>get CSV file</button>
            </div>
            <div className='w-[55%] h-full relative  flex  '>
            <p className='w-[75%] h-full font-medium text-[1.4vw] relative top-[4.6vw]'>{elem.description}</p>
            </div>


        </div >


        <div className='bg-white w-full h-[15vw] flex justify-center items-center rounded-b-[7vw]'>
        <div className="h-[10vw] w-full overflow-hidden flex justify-center items-center">
      <div className="flex animate-slide">
      {elem.images.map((src, index1) => (
           <img
            key={index1}
            src={src}
            alt={`${index1}`}
            className=" h-[5vw] w-[5vw]  mx-[2.6vw]"
          />))}
        {elem.images.map((src, index1) => (
           <img
            key={index1}
            src={src}
            alt={`${index1}`}
            className=" h-[5vw] w-[5vw]  mx-[2.6vw]"
          />))}

      </div>
    </div>
        </div>


        <div className='w-full h-[35vw] flex justify-center items-center relative '>

        <div className='h-[90%] w-full bg-[#efeeed] flex flex-col justify-center items-center gap-[.5vw] relative '>
        <h1 className='text-[2.4vw] uppercase font-bold'>our demo usage</h1>
        <div className='bg-white w-[55vw] h-[30vw] flex justify-center items-center'>
            <h1 className='text-[3vw] uppercase '>video</h1>
        </div>
        </div>



        </div>


        </div>
            );
        })}



        </>
    )
}

export default Model;