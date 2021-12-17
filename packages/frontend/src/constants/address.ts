import { SupportedChainId } from '../connectors/index'

type AddressMap = { [chainId: number]: string }

export const REFERENDUM_NFT_ADDRESS: AddressMap = {
    // [SupportedChainId.HARDHAT]: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    // [SupportedChainId.MUMBAI]: '0x2f201Dcc51Dd30B060F1339ed55fAeE5b82F6F38',
    [SupportedChainId.POLYGON]: '0x9eE18F9745f60e1d2036486691fCA5F5f64b7Dda',
}

export const DEMOCRACY_TOKEN_ADDRESS: AddressMap = {
    // [SupportedChainId.HARDHAT]: '0xa16E02E87b7454126E5E10d957A927A7F5B5d2be',
    // [SupportedChainId.MUMBAI]: '0x74d0D1E02fd0cdd668b83805c68A1055E424de6F',
    [SupportedChainId.POLYGON]: '0x64f5320605388c3Fe85328118E86E2c0557b81dD',
}