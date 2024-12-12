# FlipGear


<p align="center">
  <img src="https://github.com/user-attachments/assets/f7c2af5b-f117-461e-962a-d4c0562547cc" alt="Centered Image" width="795">
</p>

- **Objective & Core System**: Automate product quality control for Flipkart using YOLO models trained on custom datasets to detect brand-specific products and assess freshness of fruits and vegetables.

- **Technologies Used**: Integrates EasyOCR for extracting manufacturing and expiry dates, and Google Cloud Vision API for enhanced accuracy in real-time inventory updates.

- **Operational Workflow**: Products are assessed via conveyor belts or cameras, with a mechanical hand removing expired items, ensuring only fresh products meet quality standards.

- **User-Friendly Management**: Supported by Excel-based databases for efficient inventory handling, catering to both tech-savvy and novice users.
<h2>Models Used:-</h2>
  <ol>
<li><h3>Expiry Date Detection Model</h3>
<h4>Objective:</h4>
The objective of this model is to extract product-specific information such as the expiry date to ensure that spoilt goods are removed from the inventory.<br>
<h4>Tools Used:</h4>
<ul>
  <li><b>PaddleOCR:-</b>Text Extraction</li>
  <li><b>Scikit Image Library:-</b>Image Processing</li>
  <li><b>OpenCV:-</b>For taking video input</li>
   <li><b>NumPy,Pandas:-</b>For storing the detections to a CSV file.</li>
</ul>
<h4>Output:</h4>
The extracted dataset is integrated into a CSV file for inventory management.
<h4>How is it beneficial for Flipkart?</h4>
Automatically reads and extracts data, aiding better organization and inventory management while reducing manual segregation errors.
Tracks expiry dates, preventing defective articles from being sold.
Increases customer satisfaction by minimizing the stocking and shipping of expired products.
The in-house OCR solution avoids reliance on expensive third-party tools and can be customized to meet specific operational needs, making it cost-effective.
 </li>
<li><h3>Brand Detection Model:-</h3>
  <h4>Objective:-</h4>
  The objective of this model is to detect the specific brand of a product based on its logo. This is necessary to verify the integrity and correctness of the packaging.
  <h4>Tools Used:-</h4>
  <ul>
    <li><b>YOLOv8 Model:-</b>To perform classification on input video on the basis of detected brands</li>
    <li><b>OpenCV:-</b>For taking video input</li>
    <li><b>NumPy,Pandas:-</b>For storing the detections to a CSV file.</li>
  </ul>
  <h4>Output:</h4>
Brand-specific classifications are recorded in the inventory system, ensuring organized stocktaking.
<h4>How is it beneficial for Flipkart?</h4>
  <ol>
<li>Ensures delivery of high-quality, authentic products to consumers by detecting fraudulent labels.</li> 
<li>Streamlines inventory processes by segregating data brand-wise in the CSV file.</li>
<li>Provides deeper insights into brand performance and customer behavior.</li>
  </ol>
</li>
<li><h3>Freshness Detection Model:-</h3>
  <h4>Objective:-</h4>
  The main objective of the Freshness Detection Model is to automatically assess the quality of fruits and vegetables by detecting defects, discoloration, or irregular shapes.
  <h4>Tools Used:-</h4>
  <ul>
    <li><b>YOLOv8 Model:-</b>To perform classification on input video on the basis of detected brands</li>
    <li><b>OpenCV:-</b>For taking video input</li>
    <li><b>NumPyPandas:-</b>For storing the detections to a CSV file.</li>
  </ul>
  <h4>Output:</h4>
A CSV file is generated, indicating the approximate shelf life of perishable products.
<h4>How is it beneficial for Flipkart?</h4>
  <ol>
<li>Ensures delivery of high-quality produce, building consumer loyalty and trust, and improving Flipkart's brand image in a competitive e-commerce market.</li> 
<li>Streamlines inventory management by promptly distinguishing between fresh and rotten produce.</li>
<li>Scalable across other categories such as dairy or meat products, increasing its utility in the supply chain.</li>
  </ol>
</li>
<li><h3>Count Model:-</h3>
  <h4>Objective:-</h4>
 The objective of this model is to accurately count the number of objects in a given image or video feed.
  <h4>Tools Used:-</h4>
  <ul>
    <li><b>YOLOv8-Segmentation Model:-</b>To perform instance segmentation on input video and infer the number of products on screen</li>
    <li><b>OpenCV:-</b>For taking video input</li>
    <li><b>NumPyPandas:-</b>For storing the detections to a CSV file.</li>
  </ul>
  <h4>Output:</h4>
Counts the number of objects in a given image or video.
<h4>How is it beneficial for Flipkart?</h4>
  <ol>
<li>Automates the process of object counting, saving time and reducing manual effort.</li> 
<li>Minimizes human error, leading to better inventory management.</li>
<li>Reduces manual labor requirements, thereby lowering warehouse operational costs.</li>
  </ol>
</li>
  </ol>
