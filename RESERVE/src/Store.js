import { create } from "zustand";
import { ethers } from "ethers";
import { AddressCoinfog } from "./components/AddressABI/AddressCoinfog";
import { AddressTokenA } from "./components/AddressABI/AddressTokenA";
import { ABICoinfog } from "./components/AddressABI/ABICoinfog";
import { ABITokenA } from "./components/AddressABI/ABITokenA";

let signer;
let provider;
let contractTokenA1;
let contractCoinfog1;

const connectContract = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contractTokenA1 = new ethers.Contract(AddressTokenA, ABITokenA, signer);
    contractCoinfog1 = new ethers.Contract(AddressCoinfog, ABICoinfog, signer);
}

connectContract();

export const useAccount = create( () => ({
  contractTokenA2: contractTokenA1,
  contractCoinfog2: contractCoinfog1, 
}))
