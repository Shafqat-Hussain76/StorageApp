const { ethers } = require("hardhat");
const { expect } = require("chai");
//const { solidity } = require("ethereum-waffle");
//solidity(use);

describe("Testing Greeter", ()=>{
  let owner;
  let addr1;
  let addr2;
  let addrs;
  let contGreeter;
  beforeEach(async ()=>{
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    const Greeter = await ethers.getContractFactory("Greeter");
    contGreeter = await Greeter.deploy("Shafqat");
    await contGreeter.deployed();
    console.log("The deplyed address is", contGreeter.address);
  })
  describe("Testing Constructor", ()=>{
    it("constructor", async ()=>{
      const va = await contGreeter.greet();
      expect(va).to.equal("Shafqat");

    });
  });
  describe("testing setGreeter Function", ()=>{
    it("setGreeting", async ()=>{
      const va = await contGreeter.setGreeting("Hello");
      await va.wait();
      const res = await contGreeter.greet();
      expect(res).to.equal("Hello");
    })

  });

});