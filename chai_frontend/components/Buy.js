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
    <form onSubmit={buyChai}>
      <label>Name</label>
      <input type="text" id="name" placeholder="Enter name" />
      <label>Message</label>
      <input type="text" id="message" placeholder="Enter Message" />
      <button type="submit">BUY</button>
    </form>
  );
};

export default Buy;
