import { networkConfigs } from "../helpers/networks";
import { openNotificationWithIcon } from '../helpers/notification';
import { useActiveWeb3React } from './web3';
const useChain = () => {
  const { library } = useActiveWeb3React();
  async function switchNetwork(chain) {
    if (library) {
      try {
          await library?.provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: chain}],
          });
      } catch (error) {
          try {
            const config = networkConfigs[chain];
            const { chainName, currencyName, currencySymbol, rpcUrl, blockExplorerUrl } =
              config;
            await library?.provider.request({
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
    } else {
      openNotificationWithIcon("warning","尚未連接錢包","請先連接錢包再切換網路")
        // activate(injected,undefined,true).catch(err=>console.log(err));
    }
  }
  return { switchNetwork };
};

export default useChain;
