import Web3 from "web3";

const getWeb3 = () =>
  new Promise((resolve, reject) => {
        const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
    });

export default getWeb3;
