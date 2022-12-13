import React, {useState} from 'react';
import  {TiShoppingCart} from 'react-icons/ti';
import { useCart } from 'react-use-cart';
import {products} from '../Product';
import {motion} from 'framer-motion';
import './Shop.css';

function Shop() {
  const {addItem} = useCart();
  const [data, setData] = useState(products);

  const filterResult = (catItem) => {
    const result = products.filter((currData) => {
      return currData.category === catItem;
    });
    setData(result)
  }
 
  const cardItem = (item) => {
    
    return(
      <div className="card" key={item.id} style={{width: '18rem'}}>
       <img className="card-img-top" src={item.image} alt={item.name} />
        
         <div className="card-body">
          <p className="card-title">{item.name}</p>
          <h5 className="card-text">${item.price}</h5>
          <div key={item.id}>      
          <button className="btn btn-primary" onClick={() => addItem(item)}>
          <TiShoppingCart style={{size:'2rem', top: '-15px', paddingRight: '9px'}}/>
           Add to Cart
            </button>
            </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
    className='shop'
    initial={{opacity: 0}} 
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    >
      <div>
        {/*looks messy but unordered list to display only when screen is on mobile device*/}
      <ul className='categories'>
            <li className='category' onClick={() => setData(products)}>All Products</li>
            <li className='category' onClick={() => filterResult('backpacks')}>Backpacks</li>
            <li className='category' onClick={() => filterResult('jackets')}>Jackets</li>
            <li className='category' onClick={() => filterResult('holsters')}>Holsters</li>
            <li className='category' onClick={() => filterResult('emergency tools')}>Emergency Tools</li>
            <li className='category' onClick={() => filterResult('gloves')}>Gloves</li>
            <li className='category' onClick={() => filterResult('boots')}>Boots</li>
          </ul>
      </div>
      <h1 style={{marginTop: '100px', textAlign: 'center', paddingTop: '30px'}}>PRODUCTS</h1>
      <hr style={{width: '50%'}}></hr> 
      <div className='ctg-products'>
      
        <nav className='cat-navbar'>
          <h3 style={{whiteSpace: 'nowrap'}}>Browse by Categories</h3>
          <hr style={{width: '80%'}}></hr>
          {/*displays on laptop and tablet screens*/}
          <ul className='cat-list'>
            <li className='cat-item' onClick={() => setData(products)}>All Products</li>
            <li className='cat-item' onClick={() => filterResult('backpacks')}>Backpacks</li>
            <li className='cat-item' onClick={() => filterResult('jackets')}>Jackets</li>
            <li className='cat-item' onClick={() => filterResult('holsters')}>Holsters</li>
            <li className='cat-item' onClick={() => filterResult('emergency tools')}>Emergency Tools</li>
            <li className='cat-item' onClick={() => filterResult('gloves')}>Gloves</li>
            <li className='cat-item' onClick={() => filterResult('boots')}>Boots</li>
          </ul>
        </nav>
      <div className='container'>

        <div className='row'>
          {data.map(cardItem)}
        </div>
      </div>
      </div>
    </motion.div>
  )
}

export default Shop