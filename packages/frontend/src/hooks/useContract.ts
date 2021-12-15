import { Contract } from '@ethersproject/contracts'
import {Referendum} from '../typechain/Referendum'
import { useMemo } from 'react'
import { useWeb3React } from '@web3-react/core';
import { getContract } from '../utils/getContract'
import REFERENDUM_ABI from '../abis/referendum.json'
import { REFERENDUM_ADDRESS } from '../constants/address';
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
    return useContract<Referendum>(REFERENDUM_ADDRESS, REFERENDUM_ABI, true)
}