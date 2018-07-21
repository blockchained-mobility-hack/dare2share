/ Smart Contract stuff
var provider;
var signer;
var aggregatorContract;


// Import contract
import RideSharing from "./contracts/RideSharing.json";

window.addEventListener('load', function() {
    if (web3 == undefined) {
        console.log("Unsupported Browser! Please run in MetaMask or other DAPP Browser.")
    }
    else {
        provider = new ethers.providers.Web3Provider(web3.currentProvider);
        signer = provider.getSigner();

        console.log(signer);
        console.log(provider);
    }

    initializeContracts();
});

