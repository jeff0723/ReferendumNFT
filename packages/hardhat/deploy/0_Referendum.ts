import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { BigNumber } from "@ethersproject/bignumber";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deploy } = hre.deployments;
  const { deployer } = await hre.getNamedAccounts();
  const chainId = await hre.getChainId();
  const startMint = chainId === "1337"?
    BigNumber.from((new Date()).getTime()).div(1000).sub(60) // for test
    :
    BigNumber.from((new Date(2021, 12, 18)).getTime()).div(1000);
  const endMint = startMint.add(172800);
  const referendum = await deploy("Referendum", {
    from: deployer,
    args: [startMint, endMint]
  });
  console.log("Referendum deployed to:", referendum.address);
};
export default func;
func.tags = ["referendum"];
