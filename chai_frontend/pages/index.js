import Buy from "../components/Buy";
import Memos from "../components/Memos";
import { useState, useEffect } from "react";
import { conAddress, abi } from "../constants/index";
import { ethers } from "ethers";

export default function Home() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("")

  const connectWallet = async () => {
    const contractAddress = conAddress;
    const contractABI = abi;

    try {
      const { ethereum } = window;
      if (ethereum) {
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setAccount(account)
        setState({ provider, signer, contract });        
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  console.log(state)
  return (
    // <div className="h-screen w-screen bg-gradient-to-r from-[#c31432] to-[#240b36] text-white">
      <div className="h-screen w-screen ">
      <div className="h-[60vh] w-full flex ">
        {/* text buy me chai */}
        <div
          className="flex flex-col w-[50%] text-center mt-5 p-3 items-center"
          style={{ fontFamily: "fantasy" }}
        >
          <span className="text-6xl">BUY</span>
          <br /> <span className="text-4xl">CHAI FOR</span> <br />
          <span className="text-7xl">MOTIVATION</span>
          <br />
          <div className="mt-5 p-2">
            <Buy state={state} />
          </div>
        </div>
        <div className="w-[50%]">
          <img src="./chai.png" className="h-full justify-center mx-auto" />
        </div>
      </div>
      {connectWallet ? <div className="w-full h-[10vh] text-center">
            <p className="text-xl">Connected Wallet</p>
            <p className="">{account}</p>
      </div>: ""}
      <div className="h-full w-full mt-5">
        <Memos state={state} />
      </div>
    </div>
  );
}
