import React from 'react';
import Home from './Home';
import Cuisine from './Cuisine';
import Searched from './Searched';
import Recipe from './Recipe';
//the browser router enables all routes to works
import {Route, Routes, useLocation} from 'react-router-dom'
;
import { AnimatePresence } from "framer-motion";

// when /:type is added to a route, it doesn't matter what is placed, after, it just renders the cuisine instead of throwing errors

function Pages() {

  const location = useLocation();

  return (

    <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/cuisine/:type" element={<Cuisine />} />
          <Route path="/searched/:search" element={<Searched />} />
          <Route path="/recipe/:name" element={<Recipe />} />
        </Routes>
    
    </AnimatePresence>
    
       
    
  )
}

export default Pages