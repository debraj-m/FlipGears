import React from "react";

function FullProject() {

  const handleClick = () => {
    window.history.back();
  };

  return (
    <div className="Regular h-auto w-full bg-[#F9F9F9] flex flex-col py-[2vw] justify-start items-center rounded-t-[8vw] mt-[4vw] mb-[4vw] gap-[1.5vw]">


      <img className="h-[12vw] w-[17vw]" src="./img/hand.png" alt="" />
      <h3 className="text-[3.4vw] font-bold capitalize w-[35%] text-center leading-[3.8vw]">
      Let me tell you about our project
      </h3>

      <p className="w-[90%] text-[1.5vw]">
      Growing up in India, one of our fondest memories is visiting the market with our parents- be it to buy groceries or only to carry the heavy bags. Many a times, we would watch our parents buy fruits, vegetables and other grocery items, only to watch them turn out rotten or expired.
Manual inspection of the good does have its own shortcomings  -
Consumers often struggling to find the expiry and the manufacturing dates due to the tiny texts with which they are mentioned, due to the failure of restocking in grocery stores and the tendency of companies to wholesale an entire batch of goods.
Expired goods often lead to serious health issues and often times the chemicals produced as a result of expiring often have produced adverse effects to the environment.
Freshness is quite crucial to produce and often times, it is not possible to judge the freshness of the produce from its external appearance. This has arisen due to the lack of tools to assess the freshness of products.

Further, manual inspections can be time-consuming and prone to errors, making it essential to adopt automated solutions for more reliable quality assurance.

With the evolving technologies and introduction of e-commerce platforms offering to sell produces, multiple issues have risen up -
Product freshness and quality control - It has been quite difficult for the platforms to assess the product quality and the freshness due to the aspects of manual inspection. Also, due to its time consuming nature, the products spoil even before the segregation is performed. Humans have a tendency to produce fallacies and hence, the segregations would not be properly error free.
The high volumes of the product further add to the error increasing in magnitude as well as the high volumes of produce takes time to be sorted and hence, the batch starts to lose its freshness with progressive times. It also leads to the cross contamination as we know “bad company corrupts the good one”.
Mislabeling often results in the wrong product to be assigned to the consumer.
Inaccurate Data Logging which leads to the stock discrepancies.
High automation and labour costs.

This brings us to the problem statement, designed to solve this very issue. Leveraging the use of OCR technology and machine learning models, we Team FlipGears, with the medium of the Flipkart Grid 6.0 Robotics Challenge, aim to eliminate these very problems to ensure a safer, smoother and sustainable consumer experience. We strive to address the issues and propose the following -
Better item recognition, product category and the identification of the expiry and the manufacturing date.
Identification of the brand and the proper labelling associated with it.
Inspection of the freshness of the produce.
Count the number of the items.


We aim to achieve this by addressing key challenges:
Enhancing system resilience to varying environmental conditions.
Simplifying product design and integration processes.
Reducing overall implementation costs to improve accessibility and scalability.


Hence, to approach the problem, we are going to use four models  - Optical Character Recognition, Brand Detection Model, Freshness Detection Model, and the Count Model.

The models are as follows -
Manufacturing date and Expiry Date Model
The main purpose of the model is to extract product specific information such as the expiry and the manufacturing dates.
Tools used - we are using EasyOCR integrated with Python libraries like OpenCV to extract the data set and enhanced accuracy.
Output - the extracted dataset is integrated into a csv file for inventory management.
How is it beneficial for flipkart - 
It will automatically read and extract data which will help in the better organisation and inventory management reducing any error that might creep during manual segregation.
Defective product tracking would it be easier since it would track the expiry dates of the product which would prevent the defective articles from being sold.
Increased customer satisfaction due to the lesser number of expired products being stocked and shipped off to the customer.
The in-house OCR solution avoids reliance on expensive third-party tools and can be customized to meet specific operational needs which suggests the cost effectiveness of the same.
2. Brand Detection Model 
	The main objective of this model is to detect the specific brand of the model based on its logo.
	Tools - The YOLO v8 model which is trained on the custom data set of 800 labeled images processes the captured visuals and identifies the respective logo.
	Output - Brand-specific classifications are recorded in the inventory system, ensuring organized stock tracking.
	How would it help flipkart -
Deliver high quality authentic products since it would help in the detection of fraudulent labels by measuring the discrepancies from the original logo.
Streamline inventory processes by segregating all the data obtained brand wise in the csv file.
Gain deeper insights into brand performance and customer behaviour.
	
Freshness Detection: 
	The main objective is to automatically assess the quality of fruits and vegetables by detecting defects, discoloration, or irregular shapes. 
Tools used: We are using the YOLO architecture to along with OpenCV and python libraries NumPy and Pandas. 
Output- 
How it is beneficial for Flipkart:
How it would help Flipkart:
1. By ensuring only high quality produce is delivered to customers, Flipkart can build consumer loyalty and trust. This will improve its brand image in the competitive e-commerce market. 
2. The model streamlines the inventory management process as it helps distinguish between fresh and rotten produce promptly. 
3. This model can be scaled across various other categories such as dairy or meat products, increasing its utility in the supply chain. 
 
Count Model
The objective of this model is to accurately count the number of object in a given image or video feed. 
Tools Used - 
The YOLO V8 segmentation model trained on a dataset of over 300 images is used. Further, OpenCV, along with python libraries NumPy and Pandas will be used. 
Output - 
How it is beneficial for flipkart- 
1. By automating the process of object counting, this model is extremely beneficial as it improves efficiency by saving time and reducing manual effort. 
2. The model minimizes human error and leads to better inventory management. 
3. The model leads reduces the manual labour required and thus reduces warehouse operational costs. 


Robotic arm
We are developing a robotic arm equipped with a Raspberry Pi Camera Module 3 (11.9MP) and an IR sensor for detecting product validity. The system checks manufacturing/expiry dates, product freshness, and brand matching. The Python code, implemented via TinyML for compatibility with Raspberry Pi, drives the OCR and detection process. Additionally, we can incorporate a 360-degree rotating wrist in the mechanical hand, allowing for better capture of the MFG and expiry dates from various angles, ensuring more accurate detection before segregation. The robotic arm uses a 2-finger gripper to segregate valid products from invalid ones. Products are transported via a single conveyor belt, with the robotic arm completing the segregation within 10 seconds. Valid products move to one belt, while invalid products are discarded or returned to the warehouse. The arm operates using servo motors, with a Raspberry Pi controller and a heatsink for cooling. 

How it would benefit 
The camera integrated would deploy the four models to check the freshness, expiry and manufacturing dates, and brand of the product.
The gripper provides a 360 degree rotation to visualize the product to detect the region of interest.
These will help in the proper automation and tracking of the products and updating the csv files.


      </p>
      <button onClick={handleClick} className='cursor-pointer Medium text-[1.2vw] tracking-tight capitalize w-[12vw] h-[4vw] rounded-[2vw] flex justify-center items-center shadow-zinc-400 shadow-md gap-[0.4vw] text-white bg-black'>go back
      </button>
    </div>
  );
}

export default FullProject;
