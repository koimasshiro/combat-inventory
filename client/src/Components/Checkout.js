import React, { useMemo, useState } from 'react';
import { BsFillPersonFill} from 'react-icons/bs';
import {MdEmail} from 'react-icons/md';
import {FaGlobe, FaCity} from 'react-icons/fa';
import {TiShoppingCart} from 'react-icons/ti';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import './Checkout.css'
import { Link } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
  const [value, setValue] = useState('');
//get countries data using react-select-country-list for form
  const options = useMemo(() => countryList().getData(), [])

  function onChangeHandler(e){
      setValue(e)
  }

  const{
    items,
    cartTotal
  } = useCart(); 
  
 // popup notification that displays 'Not available' when button is being clicked 
// using react-toastify 

  const notify = () => {
    toast.error('Not available!!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      });
  }

  return (
    <>
    <div className='checkout'>
    <div className='checkout-cart'>
        <h2><TiShoppingCart/>Cart Summary</h2>
        <Link to='/Cart'style={{textDecoration: 'none', color: 'lightblue'}}>
        <span>Edit</span>
        </Link>
        {items.map((item) => (
          <div key={item.id}>
          <div className='cart-summary'>
            <h3 style={{paddingRight: '40px'}}>{item.quantity} &times; {item.name}</h3>
            <div className='subtotal'> ${item.quantity > 1 ? item.price * item.quantity : item.price}</div>
          </div>
          <hr></hr>
          </div>
        ))}
         <h3 style={{textAlign: 'right'}} >Subtotal: ${cartTotal}</h3>
      </div>
      <div className='billing-details'>
        <h1 className='cart-subtotal'>Cart Total: {cartTotal}</h1>
        <h2>Billing Details</h2>
        <label htmlFor='name'><BsFillPersonFill style={{paddingRight: '5px'}}/>Full Name</label>
          <input type='text' name='name' id='name' placeholder='John Doe' required/>
        <label htmlFor='email'><MdEmail style={{paddingRight: '5px'}}/>Email Address</label>
          <input type='email' name='email' id='email' placeholder='name@example.com' required/>
        <label htmlFor='country'><FaGlobe style={{paddingRight: '5px'}}/>country</label>
          <Select options={options} value={value} onChange={onChangeHandler} name='country' required/>
        <div className='input-row'>
        <label htmlFor='state' style={{padding: "0 0 0 15px"}}><FaCity style={{paddingRight: '5px'}}/>State/City</label>
        <input type='text' name='state' placeholder='NY' id='state'/>
        <label htmlFor='zip' style={{padding: '15px 0 0 50px'}}>Zip/Postal Code</label>
        <input type='text' name='zip' placeholder="100001"/>
        </div>
        <div className='column'>
          <h2>Payment Method</h2>
          <Link to='/etherPay' style={{textDecoration: 'none'}}>
          <button className='checkout-btn crypto' onClick={notify}><img style={{width: '15%', height: '30px'}} src='./myimg/ethereum.png' alt='ethereum icon'/>Pay with Crypto </button>
          </Link>
          <button className='checkout-btn paypal' onClick={notify}><img src='./myimg/paypal (3).png' alt='paypal logo' style={{width: '20px', height:'20px'}}/><span style={{color: '#253b80'}}>Pay</span>Pal</button>
          <button className='checkout-btn stripe' onClick={notify}><img src='./myimg/stripe.png' alt='stripe logo' style={{width: '50px', height: '40px', paddingLeft: '10px'}}/></button>
          <ToastContainer/>
        </div>
      </div>
    </div>
    </>
   

  )
}

export default Checkout