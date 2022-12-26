import { ethers } from "ethers";
import React from "react";

const Buy = ({ state }) => {
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
  return (
    <div className="border-2 rounded-lg p-2">
      <form onSubmit={buyChai}>
        <label className="text-2xl ">Name : </label>
        <input
          type="text"
          id="name"
          placeholder="Enter name"
          className="border ml-2 p-1 rounded-xl mb-3"
        />
        <br />
        <label className="text-2xl">Message : </label>
        <input
          type="text"
          id="message"
          placeholder="Enter Message"
          className="border ml-2 p-1 rounded-xl mb-3"
        />
        <br />
        <button type="submit" className="border-2 p-2 rounded-xl bg-[#bf742d] text-white w-full" >
          BUY
        </button>
      </form>
    </div>
  );
};

export default Buy;
