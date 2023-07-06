import { create } from "zustand";
import { ethers } from "ethers";
import { AddressSecuritos } from "./components/AddressABI/AddressSecuritos";
import { AddressToken } from "./components/AddressABI/AddressToken";
import { ABISecuritos } from "./components/AddressABI/ABISecuritos";
import { ABIToken } from "./components/AddressABI/ABIToken";

let signer;
let provider;
let contractToken1;
let contractSecuritos1;

const connectContract = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contractToken1 = new ethers.Contract(AddressToken, ABIToken, signer);
    contractSecuritos1 = new ethers.Contract(AddressSecuritos, ABISecuritos, signer);
}

connectContract();

export const useAccount = create( () => ({
  contractToken2: contractToken1,
  contractSecuritos2: contractSecuritos1, 
}))
