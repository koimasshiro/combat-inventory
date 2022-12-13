import React, {useState} from 'react';
import {Radio} from 'antd';
import CryptoPaymentForm, { CHAIN_IDS } from './cryptoPaymentForm.tsx';
import './etherPay.css';
import {Link} from 'react-router-dom';
import {HiOutlineArrowCircleLeft} from 'react-icons/hi'

function Etherpay() {

    const currencyOptions = [
        {
            name: CHAIN_IDS.ETHEREUM.NAME,
            value: CHAIN_IDS.ETHEREUM.CURRENCY_CODE,
        },
        {
            name: CHAIN_IDS.BINANCE.NAME,
            value: CHAIN_IDS.BINANCE.CURRENCY_CODE,
        }
    ]
    
   
    
      const [currency, setCurrency] = useState(currencyOptions[0].value);
    
        const selectCurrency = (
          <Radio.Group value={currency} onChange={event => setCurrency(event.target.value)} size='small' optionType='button' buttonStyle="solid">
              {currencyOptions.map(currencyOption => (<div className='radio' key={currencyOption.value}><Radio.Button  value={currencyOption.value} className='radio-btn'>{currencyOption.name}</Radio.Button></div>))}
        </Radio.Group>
      ) 
      
  return (
    <>
    <div className='etherpay'>
    <div className='crypto-container'>
    <Link to='/Checkout'>
    <p style={{position: 'absolute', left: '15px', color: 'white', fontSize: '20px', marginBottom:'50px'}}>
      <HiOutlineArrowCircleLeft/>
      Go back
        </p>
    </Link>
    <div className='crypto-section'>
    <div className='currency-opt'>
      {selectCurrency}
    </div>
    <CryptoPaymentForm currency={currency} />
    </div>
    </div>
    </div>
    </>
  )
}

export default Etherpay 