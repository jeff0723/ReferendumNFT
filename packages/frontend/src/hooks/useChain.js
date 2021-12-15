import { networkConfigs } from "../helpers/networks";
import { useActiveWeb3React } from './web3';
import {injected} from '../connectors'
const useChain = () => {
  const { library,activate } = useActiveWeb3React();
  async function switchNetwork(chain) {
    if (library) {
      try {
          await library.provider?.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: chain}],
          });
      } catch (error) {
        if (error.code === 4902) {
          try {
            const config = networkConfigs[chain];
            const { chainName, currencyName, currencySymbol, rpcUrl, blockExplorerUrl } =
              config;
            await library.provider.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                      chainId: chain,
                      chainName: chainName,
                      rpcUrls: [rpcUrl],
                      nativeCurrency: {
                        name: currencyName,
                        symbol: currencySymbol,
                        decimals: 18,
                      },
                      blockExplorerUrls: [blockExplorerUrl],
                    },
                  ],
                })
            } catch (error) {
            alert(error.message);
          }
        }
      }
    } else {
        activate(injected,undefined,true).catch(err=>console.log(err));
    }
  }
  return { switchNetwork };
};

export default useChain;
