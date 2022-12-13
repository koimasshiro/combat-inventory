import {useState, useEffect} from 'react';
import './slider.css';
import {HiOutlineArrowCircleRight, HiOutlineArrowCircleLeft} from 'react-icons/hi';
import { sliderData } from './SliderData';
import {motion} from 'framer-motion';
import { NavLink } from 'react-router-dom';

const Slider = () => {

    const [currentSlide, setCurrentSlide] = useState(0);
    const slideLength = sliderData.length;
    const autoScroll = true;

// slide to auto scroll every 3secs
    let slideInterval;
    let Interval = 3000;

    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1)
    }

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1)
    }


    function myAuto(){
       slideInterval = setInterval(nextSlide, Interval)
    }

    useEffect(() => {
        if (autoScroll){
            myAuto();
        }
        return () => clearInterval(slideInterval); 
    }, [currentSlide]);

    useEffect(() => {
        setCurrentSlide(0)
    }, [])

    
  return (
    <div className='slider'>
            <HiOutlineArrowCircleLeft className='arrow prev' onClick={prevSlide}/>
            <HiOutlineArrowCircleRight className='arrow next' onClick={nextSlide}/>
        {sliderData.map((slide, index) => {
            return(
                <motion.div
                 key={index}
                 className={index === currentSlide ? 'slide current' : 'slide'}
                 initial={{width: 0}}
                 animate={{width: '100%'}}
                 exit={{x: window.innerWidth, transition: {duration: 0.2}}}
                >
                    {index === currentSlide && (
                        <>
                        <img src={slide.image} className='slide-img' alt='US militaries'/>
                        <div className='content'>
                            <h3 className='heading'>{slide?.header}</h3>
                            <p className='desc'>{slide?.description}</p> 
                            <NavLink to='/Shop'>
                             <button className='button'>SHOP NOW</button>
                            </NavLink>
                        </div>
                        </>
                    )}
                </motion.div>
            )
        })}
        </div>
  )
}

export default Slider