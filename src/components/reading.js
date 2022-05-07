import React, { useState } from "react";
const { ethers } = require("ethers");
import Greeter from "../artifacts/contracts/Greeter.sol/Greeter.json";
const contAddress = "0xAa0D2489Dd89Fb8f8fC797aFF9be1A0add3a140b";

const Display = ()=>{
    const [storage, setStorage] = useState("");
    const [val, setVal] = useState("");

    const metamask = async ()=>{
        await window.ethereum.request({method: "eth_requestAccounts"})
    }

    const handle = async ()=>{
        if(typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.JsonRpcProvider("HTTP://127.0.0.1:7545");
            const contr = new ethers.Contract(contAddress, Greeter.abi, provider);
            try {
                const va = await contr.greet();
                setStorage(va);
            }  catch(err) {
                console.log(err);
            } 
        }  
    }
    const handleset = async ()=>{
        
        if(typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.JsonRpcProvider("HTTP://127.0.0.1:7545");
            const signer = provider.getSigner();
            const contr = new ethers.Contract(contAddress, Greeter.abi, signer);
            try {
                const tx = await contr.setGreeting(val);
                await tx.wait();

            }catch(err){
                console.log(err);
            }
        }

    }

    return(
        <>
        <h1>App:- Storage Variable Fetching and Updating (Practice)</h1>
        <h2>The Metamask address is :- 0x675869</h2>
        <h2>The Balance is 989 WEI</h2>
        <h2>Click to get value of Storage Variable</h2>
        <button onClick={ handle }>Get Value</button>
        <h3>The value of storage is {storage}</h3>
        <h2>Enter to set the value of Storage Variable</h2>
        <input value={ val } placeholder="Set" onChange={(e)=>setVal(e.target.value)}/> <br />
        <button onClick={handleset}>update the value</button>
        

        </>

    );
}
export default Display;