
import React, { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
import Team from './Components/Team.jsx';
import Content from './Components/Content.jsx';
import Heading from './Components/Heading.jsx';
import Model from './Components/Model.jsx';
import Services from './Components/Services.jsx';
import Project from './Components/Project.jsx';
import FullProject from './Components/FullProject.jsx';
import Loader from './Components/Loader.jsx';

import Lenis from 'Lenis';

function App() {

  useEffect(()=>{
    // Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});

// Listen for the scroll event and log the event data
lenis.on('scroll', (e) => {
  console.log(e);
});
// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
  })

  return (
    <>



      <Routes>
      <Route path="/" element={
          <>
          <Loader />
          <Navbar />
          <Content />
          <Heading />
          <Services />
          <Model />
          <Project />
          <Team />
          </>
        } />
       
        <Route path="/full-project" element={<FullProject />} />
        
      </Routes>

    </>
  );
}

export default App;
