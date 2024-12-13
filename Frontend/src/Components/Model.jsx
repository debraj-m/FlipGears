import React,{useState} from 'react';
import { BsBoxArrowInUpRight } from "react-icons/bs";
import YoloPopup from './Popup'
function Model(){
    const [isPopupOpen, setIsPopupOpen] = useState({
        "state":false,
        "modelName":""
    });
  


const data=[
    {   
        img: './img/ui.png',
        name: 'brand detection model',
        modelName:"brand-detection",
        purpose:" To automate the recognition and verification of the integrity and correctness of a packaging or label, ensuring quality control and streamlined inventory management.",
        description:"The Brand Detection Model brings together the power of AI and product recognition,  using the YOLOv8 architecture to identify logos and brands in real-time with incredible precision. Trained on a custom dataset of 800 brand images, it combines tools like Roboflow for crafting datasets, OpenCV for image processing, and Python libraries for seamless integration and flow. Implemented on a conveyor belt, this model detects brands, updates databases, and generates user-friendly CSV files to keep inventory management hassle-free. Say goodbye to human errors and inefficiencies—this solution ensures flawless classification, authentic products, and takes operational efficiency to the next level.",
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
          ],
          video:"./video/Brand Logo Detection - Made with Clipchamp.mp4"
    },
    {
        img: './img/web.png',
        name: 'freshness detection model',
        modelName:"freshness-detection",

        purpose:"  To Automatically assess the quality of fruits and vegetables by detecting defects, discoloration, or irregular shapes, ensuring only high-quality produce are shipped to customers. ",
        description:"The Freshness Detection Model improves quality checks by using advanced computer vision to ensure only the freshest produce reaches customers. Powered by YOLOv8 and trained on a robust dataset of 2,000 images, it evaluates key freshness indicators like color, texture, and shape in real-time. With seamless integration through tools like OpenCV and Python libraries, the system processes images, extracts features, and updates your database with user-friendly CSV outputs. By automating freshness analysis, this model reduces spoilage, guarantees top-notch quality, and keeps customers happy!",
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
          ],
          video:"./video/Freshness Detection - Made with Clipchamp.mp4"

    },
    {
        img: './img/design.png',
        name: 'object count model',
        modelName:"count-model",

        purpose:" To recognize printed expiration dates in order to ensure that products are fresh, avoid wastage and improve inventory management. ",
        description:"The Expiry Date Detection Model improves product tracking by automating the identification of expiry dates with remarkable accuracy. Using PaddleOCR for text recognition and OpenCV for image preprocessing, it extracts and updates expiration data directly into the inventory system. From preprocessing to real-time database updates, the model ensures expired products are flagged, ensuring only compliant items remain. Not only does this eliminate manual checks—this smart solution also guarantees accuracy, prevents expired goods from slipping through, and streamlines operations effortlessly. ",
        images:[
           "https://cdn1.iconfinder.com/data/icons/carbon-design-system-vol-4/32/group-objects-64.png",
           "https://cdn1.iconfinder.com/data/icons/carbon-design-system-vol-4/32/group-objects--save-64.png",
           "https://cdn1.iconfinder.com/data/icons/carbon-design-system-vol-4/32/group-objects--new-64.png",
           "https://cdn1.iconfinder.com/data/icons/aami-web-internet/64/aami15-88-64.png","https://cdn0.iconfinder.com/data/icons/navigation-map-2/64/radar-device-detect-objects-distance-64.png",
           "https://cdn1.iconfinder.com/data/icons/carbon-design-system-vol-8/32/ungroup-objects-64.png",
           "https://cdn3.iconfinder.com/data/icons/3d-modeling/64/18_model_preparation-64.png",
           "https://cdn0.iconfinder.com/data/icons/earthquake-emergency-plan/392/earthquake-quake-emergency-004-64.png",
           "https://cdn3.iconfinder.com/data/icons/basic-mobile-part-2/512/Modules-64.png"
          ],
          video:"./video/Counting - Made with Clipchamp.mp4"

    },
    {
        img: './img/dev.png',
        name: 'Expiry Date Detection Model',
        modelName:"mfg-expiry-detection-model",

        purpose:" To accurately detect and count the number of objects in a given image or video feed, enabling real-time inventory updates and improving operational efficiency.",
        description:"The Object Count Model improves inventory management by automating the counting process. Powered by YOLOv8 and trained on a custom dataset of 100+ images, it detects and counts objects in real-time as they move along the conveyor belt. With seamless integration through OpenCV and Python, the model processes data, updates the database, and ensures effortless tracking. By eliminating manual counting, it enhances accuracy, saves time, and boosts the overall efficiency of operations.",
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
          ],
          video:"./video/Expiry Date Extraction - Made with Clipchamp.mp4"

    
    }
];

const handleClick = (modelName) => {
    setIsPopupOpen({
        "state":true,
        "modelName":modelName
    })
    
}

    return(
        <>
        {data.map((elem,index)=>{
            return(
        <div key={index} className='Regular w-full lg:h-[100vw]  bg-[#efeeed] relative flex flex-col justify-center items-center rounded-t-[8vw] mb-[4vw]'>

        <h1 className='flex justify-center items-center text-[2.8vh] mt-[3vh] lg:mt-[0vh] lg:text-[3.4vw] Medium capitalize'>
            <img src={elem.img} alt="...." />{elem.name}
    
        </h1>
      
        <h2 className='text-[1.5vh] lg:text-[1.6vw] w-[80%] text-center  leading-[1.9vh] lg:leading-[2vw]'> 
        <span className='text-[1.8vh] lg:text-[2vw] font-semibold '>Purpose: </span>{elem.purpose}</h2>

        <div className='w-full h-[35vh] lg:h-[30vw] relative flex justify-evenly items-center bg-[#efeeed]  rounded-b-[8vw]'>

            <div className='w-[45%] h-full gap-[2vw] flex flex-col relative justify-center left-[3vw] items-center'>
                <div className='flex flex-col gap-[.5vw]'>
                    <button onClick={()=>handleClick(elem.modelName)}  className='bg-white w-[12vh] h-[4vh] text-[1vh] lg:w-[13vw] lg:h-[4vw] lg:text-[1vw] capitalize rounded-[5vw]'>Use this Model</button>
                <h3 className='w-[13vh] text-[1.1vh] lg:w-[13vw] lg:text-[1.1vw] capitalize flex justify-center'>(camera Access Required)</h3>
                {isPopupOpen.state && (
    <YoloPopup modelName={isPopupOpen.modelName }onClose={() => setIsPopupOpen(false)} />
    )}
                </div>
                {/* <h1 className='uppercase text-[2.5vh] lg:text-[3vw] '>or</h1>
                <button className='bg-white w-[11vh] h-[4vh] text-[1vh] lg:w-[13vw] lg:h-[4vw] lg:text-[1vw] capitalize rounded-[5vw]'>upload video</button>
                <button className='flex items-center gap-[.5vw] capitalize text-[1.4vh] lg:text-[1.4vw]'>< BsBoxArrowInUpRight size={"1.4em"}/>get CSV file</button> */}
            </div>
            <div className='w-[55%] h-full relative  flex  '>
            <p className='w-[80%] lg:w-[75%] h-full font-medium text-[1vh] lg:text-[1.4vw] relative top-[4vh] lg:top-[3vw] lg:left-[4vw]'>{elem.description}</p>
            </div>


        </div >


        <div className='bg-white w-full h-[12vh] lg:h-[15vw] flex justify-center items-center rounded-b-[7vw]'>
        <div className="h-[10vh] lg:h-[10vw] w-full overflow-hidden flex justify-center items-center">
      <div className="flex animate-slide">
      {elem.images.map((src, index1) => (
           <img
            key={index1}
            src={src}
            alt={`${index1}`}
            className=" h-[3.5vh] w-[5vh]  lg:h-[5vw] lg:w-[5vw]  mx-[2.6vw]"
          />))}
        {elem.images.map((src, index1) => (
           <img
            key={index1}
            src={src}
            alt={`${index1}`}
            className=" h-[3.5vh] w-[5vh]  lg:h-[5vw] lg:w-[5vw]  mx-[2.6vw]"
          />))}

      </div>
    </div>
        </div>


        <div className='w-full h-[30vh] lg:h-[35vw] flex justify-center items-center relative '>

        <div className='h-[90%] w-full bg-[#efeeed] flex flex-col justify-center items-center gap-[.5vw] relative '>
        <h1 className='text-[2.7vh] lg:text-[2.4vw] uppercase font-bold'>our demo usage</h1>
        <div className='bg-zinc-100 w-[40vh] h-[30vh] lg:w-[55vw] lg:h-[30vw] flex justify-center items-center'>
        <video className="w-full h-[90%] lg:h-[95%] object-cover " autoPlay loop muted><source src={elem.video} type="video/mp4" /></video>
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