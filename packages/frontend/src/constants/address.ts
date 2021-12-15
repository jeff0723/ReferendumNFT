import { SupportedChainId } from '../connectors/index'

type AddressMap = { [chainId: number]: string }

export const REFERENDUM_ADDRESS: AddressMap = {
    [SupportedChainId.MAINNET]: '0x9c512fEb3D1c5e79Ab37c49af8b4c2C601AaF39c',
    [SupportedChainId.RINKEBY]: '0xB66E2741F231EAD122853C325F2C0020F8f92514',
}

export const NOOB_BLINDBOX_ADDRESS: AddressMap = {
    [SupportedChainId.MAINNET]: '0xF82065dc9F0be1aC0a56194Cc5b9A35767178864',
    [SupportedChainId.RINKEBY]: '0x92c1e89568dEc151f8F56344d6B35453Bd5E30DF',
}