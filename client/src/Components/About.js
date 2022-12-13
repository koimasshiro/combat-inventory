import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import {motion} from 'framer-motion';
import './About.css'

function About() {
  return (
    <>
    <motion.div
     className='about-section'
     initial={{opacity: 0}} 
     animate={{opacity: 1}}
     exit={{opacity: 0}}
     >
      <div className='about-txt-container'>
        <h2 className='about-title'>About Us</h2>
        <p className='about-txt'>
        30 years ago, a faulty pack fell to the ground overseas. It failed in the line of duty - and inspired us to make a promise. We vowed to do more than the rest of the industry. 
        To design innovative products that don't let you down, To make gear the right way. Our holsters and tactical gears are used by elite operators around the world.
         Whether your mission involves securing the field or picking up dinner,  you'll confidently carry with gear that's trusted by the best. We work to ensure that every holsters we build and product we create earns the right to wear that badge with pride.
        </p>
        <Link to='/Contact'>
          <button className='abt'>Contact Us</button>
        </Link>
      </div>
      <div className='about-img'>
        <img src='./myimg/ryan-hoffman-famtUWEBH_Y-unsplash.jpg' alt='soldier assisting his partner' style={{width: '40%', paddingRight: '50px', borderRadius: '30px 30px'}}/>
      </div>
    </motion.div>  
    <div className='footer'>
    <Footer/>
    </div>
    </>
  )
}

export default About