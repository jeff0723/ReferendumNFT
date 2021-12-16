import { SupportedChainId } from '../connectors/index'

type AddressMap = { [chainId: number]: string }

export const REFERENDUM_NFT_ADDRESS: AddressMap = {
    [SupportedChainId.HARDHAT]: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    [SupportedChainId.MUMBAI]: 'TODO',
}

export const DEMOCRACY_TOKEN_ADDRESS: AddressMap = {
    [SupportedChainId.HARDHAT]: '0xa16E02E87b7454126E5E10d957A927A7F5B5d2be',
    [SupportedChainId.MUMBAI]: 'TODO',
}