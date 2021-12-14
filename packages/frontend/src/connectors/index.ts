import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'


export enum SupportedChainId {
    MUMBAI = 80001
  }
  export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
    SupportedChainId.MUMBAI
  ]
const NETWORK_URLS: { [key in SupportedChainId]: string } = {
    [SupportedChainId.MUMBAI]: "https://polygon-mumbai.g.alchemy.com/v2/YeWNsmNZnmrXElTepCA6Js4GG7bt366I"
}

export const injected = new InjectedConnector({
    supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
})


export const walletconnect = new WalletConnectConnector({
    supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
    rpc: NETWORK_URLS,
    qrcode: true,
})