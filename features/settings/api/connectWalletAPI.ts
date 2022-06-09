import { Wallet } from "../settingsSlice";

declare let window: any
  
export default async function connectWalletAPI(): Promise<Wallet | undefined> {
    if (window.ethereum) {
        const chainId = window.ethereum.chainId
    
        //request accounts
        const response = await window.ethereum.request({method: 'eth_requestAccounts'})
        const address = response[0]

        return { chainId, address }

    } else {
        return undefined
    }
}