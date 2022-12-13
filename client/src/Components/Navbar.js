import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import  {TiShoppingCart} from 'react-icons/ti';
import {GiHamburgerMenu, GiCancel} from 'react-icons/gi'
import {useCart} from 'react-use-cart';

import './Navbar.css';

function Navbar() {

  const [isMobile, setIsMobile] = useState(false);

  

  const{
    isEmpty,
    totalUniqueItems,
} = useCart();

  return (
    <div>
        <nav className='nav'>
          <div className='icon-logo-cart'>
          <div className='nav-img'>
            <img className='image' src='./myimg/63f40471db5d6c6ff81b860dec3aedad.png' alt='Combat Inventory Logo'/>
          </div>
            <span className='nav-title'>COMBAT INVENTORY</span>
            <div className='cart-nav'>
            <NavLink to='/Cart' style={{textDecoration: 'none', color: 'rgb(179, 98, 48)'}}>
              <TiShoppingCart className='cart-icon'/>
              <TiShoppingCart className='shop-cart'/>
              {!isEmpty && <span className='span' style={{position: 'relative',left: '-21px', top: '-28px'}}>{totalUniqueItems}</span>}
              <span className='span' style={{marginLeft: !isEmpty ? '-13px' : 0}}>Cart</span>
              </NavLink>
              </div>
          </div>
          <div>
            <ul className={isMobile? 'nav-links-mobile' : 'nav-list'} onClick={() => setIsMobile(false)}>
                 <li className='nav-item'><NavLink to='/Home' style={{textDecoration: 'none', padding: '10px', color: 'white', fontSize: '15px'}}>HOME</NavLink>
                  </li>
                 <li className='nav-item'><NavLink to='/Shop' style={{fontSize: '15px', textDecoration: 'none', padding: '15px', color: 'white'}}>SHOP</NavLink></li>
                 <li className='nav-item'><NavLink to='/About' style={{fontSize: '15px', textDecoration: 'none', padding: '15px', color: 'white'}}>ABOUT</NavLink></li>
                 <li className='nav-item'><NavLink to='/Contact' style={{fontSize: '15px', textDecoration: 'none', padding: '15px', color: 'white'}}>CONTACT</NavLink></li>
            </ul>
          </div>
          <div id='mobile'>
            <button className='mobile-menu-icon' onClick={() => setIsMobile(!isMobile)}>
              {isMobile ?  <GiCancel/> : <GiHamburgerMenu/>}
            </button>
          </div>
        </nav>
    </div>
  )
}
export default Navbar