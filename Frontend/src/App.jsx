
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



function App() {



  return (
    <>



      <Routes>
      <Route path="/" element={
          <>
          <Loader />
          <Navbar />
          <Content />
          <Heading/>
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
