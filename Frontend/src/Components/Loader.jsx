import React, { useState, useEffect } from 'react';

const LoaderComponent = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Set a timeout to hide the loader after 4 seconds
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 4000);

    // Cleanup the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  if (!showLoader) return null; // Do not render the loader again

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <video className="w-1/2 md:w-1/4 lg:w-1/6 h-auto" autoPlay loop muted>
        <source src="./video/Loading.mp4" type="video/mp4" />
      </video>
      <h1 className='text-sm md:text-base lg:text-lg opacity-50 text-center mt-4'>We are spinning up our containers</h1>
    </div>
  );
};

export default LoaderComponent;
