/* eslint-disable no-unused-expressions */
import React from "react";
import { useCart } from "react-use-cart";
import {HiTrash, HiOutlineArrowCircleLeft} from 'react-icons/hi';
import {MdOutlineCancel} from 'react-icons/md';
import {motion} from 'framer-motion'
import './Cart.css';
import { Link } from "react-router-dom";

const Cart = ({cartItems}) => {

    const{
        isEmpty,
        totalUniqueItems,
        items,
        updateItemQuantity,
        removeItem,
        cartTotal
    } = useCart();
    
    return(
        <div className="cart">
            <div className="cart-title">
            {!isEmpty && <h1 className='crt-header' style={{fontSize: '40px', paddingLeft: '20px'}}>Cart ({totalUniqueItems})</h1>}
            <Link to='/Shop' style={{textDecoration: 'none', color: 'black'}}>
            <MdOutlineCancel style={{fontSize: '40px', paddingRight: '40px', zIndex: '1'}}/>
            </Link>
            </div>
            {isEmpty && 
            <div className="cart-empty">
                <motion.h1 className="empty"
                initial={{scale: 0}}
                animate={{scale: 1, transition: {duration: 0.3}}}
                >Your Cart is empty.</motion.h1>
                <div className="inline-items">
                    <Link to='/Shop'>
                <HiOutlineArrowCircleLeft  style={{color: 'gray', fontSize: '25px'}}/>
                </Link>
                <Link to='/Shop' style={{ textDecoration: 'none', fontSize: '20px', color: 'gray', paddingLeft: '5px'}}>       
                Start Shopping
                </Link>
                </div>
            </div>}
            
        {items.map((item) => (
            <>
            <div className="cart-bg" key={item.id}>
            <div >
              <img className="cart-img" src={item.image} alt={item.name}/>
              <button onClick={() => removeItem(item.id)} className='del-btn'
               ><HiTrash/></button>
            </div>
                <div key={item.id} className='items-txt'>
                   <h4 className='item-title' style={{fontSize: '25px'}}>{item.name}</h4>
                   US ${item.price}
                   <div className="cart-btn">
                    <button className="add-btn" onClick={() => updateItemQuantity(item.id, item.quantity - 1)}> - </button>
                    {item.quantity}
                    <button className="minus-btn" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}> + </button>
                   </div>
                   <h5 style={{padding: '0px'}}>SubTotal: {item.quantity > 1 ? item.price * item.quantity : item.price}</h5>
                </div>
        </div>
        </>
      ))}
      {!isEmpty && <div className="total-checkoutBtn">
      <h3 className="total-items">Total: <strong>${cartTotal}</strong></h3>
      <Link to='/Checkout'>
       <button className='total-btn'style={{padding: '20px', border: 'none', cursor: 'pointer', borderRadius: '20px', fontSize: '20px', color: 'beige', background: 'sienna'}}>Proceed to Checkout</button>
      </Link>
      </div>}
       </div>
    )
}
export default Cart;