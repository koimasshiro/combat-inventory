import React, {useRef} from 'react';
import emailjs from '@emailjs/browser';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import './Footer.css';


function Footer() {

  const form = useRef(); 

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ecp7hk2', 'template_jxxv4xp', form.current, 'VofYGRuMgWZCSXxcQ')
      .then((result) => {
          console.log(result.text);
		  console.log('message sent');
       toast('Subscribed👍');
      }, (error) => {
          console.log(error.text);
      });
	
  };
  return (
    <div className='footer'>
      <div className='footer-container'>
        <div className='footer-section'>
        <div>
          <h4 style={{color: 'white', fontSize: '25px', marginLeft:'40px'}}>Navigate</h4>
          <ul className='footer-lists'>
            <li className='footer-list'>Home</li>
            <li className='footer-list'>Contact</li>
            <li className='footer-list'>About</li>
            <li className='footer-list'>Products</li>
            <li className='footer-list'>Privacy Policy</li>
            <li className='footer-list'>Blog</li>
            <li className='footer-list'>Featured Categories</li>
          </ul>
        </div>
        <div>
        <h4 style={{color: 'white', fontSize: '25px', marginLeft:'40px'}}>Help</h4>
        <ul className='footer-lists'>
          <li className='footer-list'>FAQs</li>
          <li className='footer-list'>Shipping & returns</li>
          <li className='footer-list'>Accessibility</li>
          <li className='footer-list'>Sitemap</li>
          <li className='footer-list'>Safety Notices</li>
        </ul>
        </div>
        </div>
        <div className=''>
        <h3 className='form-title'>Subscribe to our newsletter</h3>
          <form className='my-form' ref={form} onSubmit={sendEmail}>
            <input className='input' type='email' placeholder='Enter your email' required/>
            <button type='submit' className='submit-btn' onClick={sendEmail}>Subscribe</button>
            <ToastContainer/>
            <FaFacebook className='icon'/>
            <FaInstagram className='icon'/>
            <FaTwitter className='icon'/>
            <FaYoutube className='icon'/>
          </form>
        </div>
        </div>
    </div>
  )
}

export default Footer