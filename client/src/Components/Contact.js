import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Footer from './Footer';
import {motion} from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import './Contact.css';
import { toast, ToastContainer } from 'react-toastify';

export const Contact = () => {

	/*get contact form to submit to email and check 
	if message has been sent using emailjs and react-toastify*/

   const form = useRef();

    const sendEmail = (e) => {
       e.preventDefault();

    emailjs.sendForm('service_ecp7hk2', 'template_jxxv4xp', form.current, 'VofYGRuMgWZCSXxcQ')
    .then((result) => {
		console.log(result.text);
		toast.success('Message sent successfully', {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'colored',
			});
	}, (error) => {
		console.log(error.text);
		toast.error('Message was not sent', {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'colored',
		})
	})
	

  };

	return(
		<>
		<motion.div 
		className='form-section'
		initial={{opacity: 0}} 
        animate={{opacity: 1}}
        exit={{opacity: 0}}
		>
	    <div className='form-container'>
			<h2 style={{padding: '20px'}}>GET IN TOUCH</h2>
		<form className='form' ref={form} onSubmit={sendEmail}>
			<label className='input-label'>Name</label>
			<input className='inputs' type="text" name="user_name" placeholder='John Doe' required/>
			<label className='input-label'>Email</label>
			<input className='inputs' type="email" name="user_email" placeholder='name@example.com' required/>
			<label>Message</label>
			<textarea className='text-area' name="message" required/>
			<div style={{textAlign: 'right'}}>
			  <button className='button' type="submit" onClick={sendEmail}>Send</button>
			  <ToastContainer/>
			</div>
		</form>
		</div>
	  </motion.div>
	  <div className='footer'>
	  <Footer/>
	  </div>
	  </>
	)
}
export default Contact