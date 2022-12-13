import React, { useState } from 'react'
import './cryptoPaymentForm.css';
import { Network } from '@ethersproject/networks';
import { ethers } from 'ethers'

//automatically check if metamask is installed
declare global {
  interface Window {
      ethereum:any;
  }
}

export const CHAIN_IDS =  {
    BINANCE: {
        NAME: "BNB",
        CURRENCY_CODE: "BNB",
        MAIN_NET: {
            ID: 56
        },
        TEST_NET: {
            NAME: "testnet",
            ID: 97,
        }
    },
    ETHEREUM: {
        NAME: "Ethereum",
        CURRENCY_CODE: "ETH",
        MAIN_NET: {
            ID: 1
        },
        GOERLI: {
            NAME: "goerli",
            ID: 5
        }
    }
}

interface CryptoPaymentFormPropTypes{
	currency?: string;
	isTestNet?: boolean;
}

CryptoPaymentForm.defaultProps = {
	isTestNet: true,
	currency: 'BNB',
}

export  interface  TransactionResponsePayment  extends  ethers.providers.TransactionResponse {
	network?: ethers.providers.Network,
}


const DEFAULT_ADDRESS = '0xc134Cfa1033C87de37762Ea96d634Ab252e20251'; //ETH address

function CryptoPaymentForm(props: CryptoPaymentFormPropTypes) {

	const {isTestNet,currency} = props;

	const checkCorrectNetwork = (network: Network) => {
		let expectedChainId;
	
		if (currency === CHAIN_IDS.ETHEREUM.CURRENCY_CODE) {
			if (isTestNet) {
				expectedChainId = CHAIN_IDS.ETHEREUM.GOERLI.ID;
			} else {
				expectedChainId = CHAIN_IDS.ETHEREUM.MAIN_NET.ID;
	
			}
		} else if (currency === CHAIN_IDS.BINANCE.CURRENCY_CODE) {
			if (isTestNet) {
				expectedChainId = CHAIN_IDS.BINANCE.TEST_NET.ID;
			} else {
				expectedChainId = CHAIN_IDS.BINANCE.MAIN_NET.ID;
			}
		}
	
		if (network.chainId !== expectedChainId) {
			const actualNetworkName = [CHAIN_IDS.BINANCE.TEST_NET.ID, CHAIN_IDS.ETHEREUM.GOERLI.ID].includes(network.chainId) ? "testnet" : "mainnet";
			const actualCurrency = [CHAIN_IDS.BINANCE.MAIN_NET.ID, CHAIN_IDS.BINANCE.TEST_NET.ID].includes(network.chainId)? CHAIN_IDS.BINANCE.CURRENCY_CODE : CHAIN_IDS.ETHEREUM.CURRENCY_CODE;
			return {isCorrectNetwork: false, message: `Change your crypto wallet network. Expected "${isTestNet ? "testnet" : "mainnet"}" network (${networkName}) for currency: ${currency}.
			 Instead received "${actualNetworkName}" network (${network.name}) for currency: ${actualCurrency}.`}
		}
		return { isCorrectNetwork: true, message: "" }
	}
//setting amount and destination address
  const [amount, setAmount] = useState(0);
  const [destinationAddress, setDestinationAddress] = useState(DEFAULT_ADDRESS);


  const [defaultAccount, setDefaultAccount] = useState(null)
	
	const [error, setError] = useState("");

    const [transaction, setTransaction] = useState<TransactionResponsePayment | null >(null);
	let networkName: any;
//set ability to view transactions in block explorer if currency is either BNB || ETH
	let blockExplorerHost = "etherscan.io";

    if (currency === CHAIN_IDS.BINANCE.CURRENCY_CODE) {
        blockExplorerHost = "bscscan.com"
    }
    if (isTestNet) {
        networkName = currency === CHAIN_IDS.BINANCE.CURRENCY_CODE ? CHAIN_IDS.BINANCE.TEST_NET.NAME : CHAIN_IDS.ETHEREUM.GOERLI.NAME;
        blockExplorerHost = `${networkName}.${blockExplorerHost}`
    } else {
        networkName = "mainnet"
    }

	let  transactionUrl =  transaction?.hash ? `https://${blockExplorerHost}/tx/${transaction.hash}` : "";

	if (transaction?.hash) {

		transactionUrl = `https://${transaction.network?.name === "homestead" ? "": transaction.network?.name+"."}etherscan.io/tx/${transaction.hash}`

	}
	const accountChangeHandler = (newAccount) => {
		setDefaultAccount(newAccount)
	 }
//Send the transaction to the blockchain by implementing a startPayment() function

  const  startPayment = async (event: any) => {
	setError('') 
	setTransaction(null)   
    event.preventDefault();


try {

	if (!window.ethereum) {
		throw  new  Error("No crypto wallet found. Please install it.");//displays error message if no wallet was found
	}
     await window.ethereum.request({ method: 'eth_requestAccounts' })//gets accounts signed up on metamask
	 .then(result =>{ 
        accountChangeHandler(result[0])
	 })
	

		const  provider = new  ethers.providers.Web3Provider(window.ethereum);
		const network = await provider.getNetwork();

		const { isCorrectNetwork, message } = checkCorrectNetwork(network);
	
					if (!isCorrectNetwork) {
						throw new Error(message)
					}
					
		const  signer = provider.getSigner();

		ethers.utils.getAddress(destinationAddress);

		const  transactionResponse = await  signer.sendTransaction({

			to:  destinationAddress,

			value:  ethers.utils.parseEther(amount.toString())

		}) as  TransactionResponsePayment;
		transactionResponse.network = network;

		console.log({transactionResponse});

		setTransaction(transactionResponse);

	} catch (error: any) {

		console.log({error})
        setError(error.message);
	}
	}


  return (
	<> 
	<div className='payment-container'>
      <form className='payment-form'>
        <input type='number' placeholder='Amount' value={amount}  onChange={event  => {setAmount(Number.parseFloat(event.target.value))}}/>
		<input placeholder='destination Address' value={destinationAddress} onChange={event  => {setDestinationAddress(event.target.value)}} readOnly/>
        <button className='payment-btn' onClick={startPayment}>Send payment</button>
		
		{transactionUrl &&
		<div className="alert-success"  role="alert">
          <p className='alert-txt'>Payment Complete <a href={transactionUrl}>View Transaction</a></p>
		</div>
		}

		{error &&

		<div  className="alert-danger"  role="alert">

		{JSON.stringify(error)}
		</div>
		}
      </form>
	  </div>
	  </>
  )
}

export default CryptoPaymentForm