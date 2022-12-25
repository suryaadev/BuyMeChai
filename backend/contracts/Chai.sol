// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

contract Chai{

    struct Memo{
        string name;
        string message;
        address bhagwan;
        uint timestamp;
    }

    Memo[] memos;
    address payable owner;

    constructor(){
        owner = payable (msg.sender);

    }

    function sendChai(string memory _name, string memory _message) public payable{
        require(msg.value > 0, "please give something");
        owner.transfer(msg.value);
        memos.push(Memo(_name,_message,msg.sender,block.timestamp));
    }

    function getSenders()public view returns(Memo[] memory){
        return memos;
        
    }
}