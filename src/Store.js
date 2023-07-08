import { create } from "zustand";
import { ethers } from "ethers";
import { AddressSecuritos } from "./components/AddressABI/AddressSecuritos";
import { ABISecuritos } from "./components/AddressABI/ABISecuritos";

let signer;
let provider;
let contractSecuritos1;

const connectContract = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contractSecuritos1 = new ethers.Contract(AddressSecuritos, ABISecuritos, signer);
}

connectContract();

export const useAccount = create( () => ({
  contractSecuritos2: contractSecuritos1, 
}))
