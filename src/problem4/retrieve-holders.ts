import { ethers, Contract, formatUnits } from "ethers";

const provider = new ethers.JsonRpcProvider(
  "https://bsc-dataseed.binance.org/"
);

const contract = new Contract(
  "0xc0ecb8499d8da2771abcbf4091db7f65158f1468",
  [
    "function balanceOf(address a) view returns (uint)",
    "function decimals() view returns (uint8)",
  ],
  provider
);

const formattedBalancesPromises = [
  "0xb5d4f343412dc8efb6ff599d790074d0f1e8d430",
  "0x0020c5222a24e4a96b720c06b803fb8d34adc0af",
  "0xd1d8b2aae2ebb2acf013b803bc3c24ca1303a392",
].map(async (address) => {
  const balance = await contract.balanceOf(address);
  const decimals = await contract.decimals();
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: Number(decimals),
  });

  return [
    address,
    currencyFormatter.format(Number(formatUnits(balance, decimals))),
  ];
});

Promise.all(formattedBalancesPromises).then((formattedBalances) =>
  formattedBalances.forEach(([address, balance]) => {
    console.log(`${address} ${balance}`);
  })
);
