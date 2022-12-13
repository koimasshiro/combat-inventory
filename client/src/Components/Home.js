import React from 'react';
import { cardData } from './cardData';
import Footer from './Footer';
import './Home.css'
import Slider from './Slider/Slider';
import { motion, Variants} from 'framer-motion';
import {Link} from 'react-router-dom'

export default function Home() {

  function Card({id, header, image,text}){

    const imageAnimation = {
      initialAnimate:{x: -100, opacity: 0},
      animate:{x: 0, opacity: 1,
            rotate: [0, 90, -90, 90, 0],
            transition: {
              type: 'spring',
              bounce: 0.4,
              duration: 3
            }
          }
    } 

    const textAnimation = {
      initialAnimate:{y: 100, opacity: 0},
      animate:{y: 0, opacity: 1,
            transition: {
              type: 'spring',
              bounce: 0.4,
              duration: 3
            }
          }
    }

    return(
      <motion.div className="crd" id={id}
      initial={'initialAnimate'}
      whileInView={'animate'}
      viewport={{once: false, amount: 0.5}}
      transition={{staggerChildren: 0.8}}
      >
        <motion.div className='img-container'
          variants={imageAnimation}
        ><img className='card-img' src={image} alt='logos'/>
        </motion.div>

        <motion.h3 className='card-heading'
          variants={textAnimation}
        >{header}</motion.h3>

        <motion.p className='card-txt'
          variants={textAnimation}
        >{text}</motion.p>
      </motion.div>
    )
  }
  const cardList = cardData.map((item, index) => (
        <div key={index} className="card-wrapper">
          <Card header={item.header} text={item.text} image={item.image}/>
        </div>
  ))

  return (
    <motion.div
    initial={{width: 0}} 
    animate={{width: '100%'}}
    exit={{x: window.innerWidth, transition: { duration: 0.1}}}
    >
      <Slider/>
      <div className='card-section'>
      {cardList}
      </div>
      <div style={{padding: '80px 0 40px 0'}}>
        <h1 style={{textAlign: 'center'}}>COLLECTIONS</h1>
        <hr style={{width: '50%'}}></hr>
      <div className='overlay-section'>
      <div className='overlay-img'>
        <img className='image__img' src='./myimg/Delta-OL-Gen2-tactical-winter-jacket.jpg' alt='holster'/>
        <div className='image__overlay image__overlay__blur'>
          <div className='image__title'>
          <h2>Jackets</h2>
          <Link style={{textDecoration: 'none'}}><p className='image__desc'>Click to shop from our Collection of Jackets</p></Link>
          </div>
        </div>
        </div>
        
      <div className='overlay-img'>
        <img className='image__img' src='./myimg/istockphoto-1179779857-170667a.jpg' alt='holster'/>
        <div className='image__overlay image__overlay__blur'>
          <div className='image__title'>
          <h2>Holsters</h2>
          <Link to='/Shop' style={{textDecoration: 'none'}}><p className='image__desc'>Click to shop from our Collection of Holsters</p></Link>
          </div>
        </div>
        </div>
        
        <div className='overlay-img'>
        <img className='image__img' src='./myimg/military boots image.jpg' alt='holster'/>
        <div className='image__overlay image__overlay__blur'>
          <div className='image__title'>
          <h2>Boots</h2>
        <Link style={{textDecoration: 'none'}}><p className='image__desc'>Click to shop from our Collection of Boots</p></Link>
          </div>
        </div>
        </div>
      </div>
      </div>
         <Footer/>
      </motion.div>
  )
}


