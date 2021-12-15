import { SupportedChainId } from '../connectors/index'

type AddressMap = { [chainId: number]: string }

export const REFERENDUM_ADDRESS: AddressMap = {
    [SupportedChainId.HARDHAT]: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    [SupportedChainId.MUMBAI]: 'TODO',
}