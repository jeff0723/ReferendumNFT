import { Contract } from '@ethersproject/contracts'
import { DemocracyToken, DemocracyToken__factory, Referendum, Referendum__factory} from '../typechain'
import { useMemo } from 'react'
import { useWeb3React } from '@web3-react/core';
import { getContract } from '../utils/getContract'
import { REFERENDUM_NFT_ADDRESS, DEMOCRACY_TOKEN_ADDRESS } from '../constants/address';
export function useContract<T extends Contract = Contract>(
    addressOrAddressMap: string | { [chainId: number]: string } | undefined,
    ABI: any,
    withSignerIfPossible = true
): T | null {
    const { library, account, chainId } = useWeb3React()

    return useMemo(() => {
        if (!addressOrAddressMap || !ABI || !library || !chainId) return null
        let address: string | undefined
        if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
        else address = addressOrAddressMap[chainId]
        if (!address) return null
        try {
            return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
        } catch (error) {
            console.error('Failed to get contract', error)
            return null
        }
    }, [addressOrAddressMap, ABI, library, chainId, withSignerIfPossible, account]) as T
}

export function useReferendumContract() {
    return useContract<Referendum>(REFERENDUM_NFT_ADDRESS, Referendum__factory.abi, true);
}

export function useDemocracyToken() {
    return useContract<DemocracyToken>(DEMOCRACY_TOKEN_ADDRESS, DemocracyToken__factory.abi, true);
}
