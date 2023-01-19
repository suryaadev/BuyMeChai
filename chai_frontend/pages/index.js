import { useState, useEffect } from "react";
import { conAddress, abi } from "../constants/index";
import { ethers } from "ethers";

export default function Home() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [memos, setMemos] = useState([]);
  const [account, setAccount] = useState("");

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
        setAccount(account);
        setState({ provider, signer, contract });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const buyChai = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    // console.log(name, message, contract);
    const value = { value: ethers.utils.parseEther("0.001") };
    const tx = await contract.sendChai(name, message, value);
    await tx.wait();
    window.alert("tx sucessful");
  };

  useEffect(() => {
    connectWallet();

    const memoData = async () => {
      const memos = await state.contract.getSenders();
      setMemos(memos);
    };
    state.contract && memoData();
  }, [state.contract]);

  return (
    <div className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 p-2">
      {/* image and form section */}
      <div className="container flex flex-col-reverse md:flex-row items-center px-6 mx-auto  md:space-y-0">
        <div className="flex flex-col mb-16 space-y-12 md:w-1/2">
          <h1 className="max-w-sm text-2xl text-center md:text-5xl">
            Buy Chai For Motivation
          </h1>
          <form className="px-6 h-2" onSubmit={buyChai}>
            <input
              placeholder="Enter name"
              id="name"
              className="border-2 p-1 rounded-md mb-3 justify-center text-center w-1/2 "
            />
            <br />
            <input
              placeholder="Enter Message"
              id="message"
              className="border-2 p-1 rounded-md mb-3 text-center w-1/2"
            />
            <br />
            <button
              type="submit"
              className="border-2 p-3 px-4 rounded-full bg-orange-500 hover:bg-white hover:text-orange-600 items-center w-1/2"
            >
              SEND CHAI
            </button>
          </form>
        </div>
        <div className="md:w-1/2 ">
          <img src="./chai1.png" />
        </div>
      </div>

      {/* Connected account section */}
      <div className="bg-orange-400 rounded-full p-2 container flex px-4 text-center justify-center mx-auto mt-6 space-y-10">
        <h1 className="text-xl"> Account : {account}</h1>
      </div>

      {/* table section to get data */}
      <div className="flex container mx-auto text-center mt-6">
        <div className="w-1/6 bg-orange-500 h-8 border-2">
          <h1 className="text-lg text-white">Date</h1>
        </div>
        <div className="w-1/6 bg-orange-400 h-8 border-2">Name</div>
        <div className="w-2/6 bg-orange-500 h-8">
          <h1 className="text-lg text-white border-2">Message</h1>
        </div>
        <div className="w-3/6 h-8 bg-orange-400 border-2">
          <h1 className="text-lg">Address</h1>
        </div>
      </div>

      {memos.map((memo) => {
        return (
          <div className="flex container  mx-auto text-center py-1">
            <div className="w-1/6 bg-orange-500 h-8 border-2">
              <h1 className="text-lg text-white ">
                {new Date(memo.timestamp * 1000).toLocaleString()}
              </h1>
            </div>
            <div className="w-1/6 bg-orange-400 h-8 border-2">{memo.name}</div>
            <div className="w-2/6 bg-orange-500 h-8">
              <h1 className="text-lg text-white border-2">{memo.message}</h1>
            </div>
            <div className="w-3/6 h-8 bg-orange-400">
              <h1 className="text-lg border-2">{memo.bhagwan}</h1>
            </div>
          </div>
        );
      })}
    </div>
  );
}
