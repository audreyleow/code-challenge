const { ethers, JsonRpcProvider } = require("ethers");

const contract = require("./build/contracts/RetrieveTokenBalances.json");

const ADDR = contract.networks[5].address; // your contract address
const ABI = contract.abi; // your contract ABI

const ADDRESS = "0xd77384E323e6522DAB762A560076d977419b2EaA"; // some wallet address with token balance
const TOKENS = [
  // token contract addresses
  "0x77A96E562D61d9Af0caF869f102B0CC8E5C288B7",
  "0xeF1778C93E65F28C0581505717Cd1a6F599Cd58a",
];

// using goerli testnet
const provider = new JsonRpcProvider("https://eth-goerli.public.blastapi.io");

const test = async () => {
  const contract = new ethers.Contract(ADDR, ABI, provider);

  const balances = await contract.getBalances(ADDRESS, TOKENS);

  return balances;
};

test().then(console.log);
