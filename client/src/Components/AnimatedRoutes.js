import React from 'react';
import Home from './Home';
import Shop from './Shop';
import About from './About';
import Contact from './Contact';
import Cart from './Cart';
import Checkout from './Checkout';
import EtherPay from './etherPay';
import {Routes, Route, useLocation} from 'react-router-dom';
import {AnimatePresence} from 'framer-motion';

const AnimatedRoutes = () => {
    const location = useLocation();

  return (

    <AnimatePresence>
    <Routes location={location} key={location.pathname}>
            <Route exact path='/' element={<Home />} />
            <Route path='/Home' element={<Home />} />
            <Route path='/Shop' element={<Shop />} />
            <Route path='/About' element={<About />} />
            <Route path='/Contact' element={<Contact />} />
            <Route path='/Cart' element={<Cart/>} />
            <Route path='/Checkout' element={<Checkout />} />
            <Route path='/etherPay' element={<EtherPay />} />
          
    </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes