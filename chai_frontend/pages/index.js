import Buy from "../components/Buy";
import Memos from "../components/Memos";
import { useState,useEffect } from "react";
import {conAddress, abi} from '../constants/index'
import {ethers} from 'ethers'

export default function Home() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null})
    
    const connectWallet = async()=>{
      const contractAddress = conAddress
      const contractABI = abi;

      try {
        const {ethereum} = window;
        if(ethereum){
          const account = await ethereum.request({method:"eth_requestAccounts",})
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(contractAddress,contractABI,signer)
          setState({provider,signer,contract})
        }
      } catch (error) {
        console.error(error);
      }
    }
    

  useEffect(() => {
    connectWallet()
  }, [])
  return (
    <>
    <button onClick={connectWallet}>Connect Wallet</button>
      <Buy state={state}/>
      <Memos state={state}/>
    </>
  );
}
