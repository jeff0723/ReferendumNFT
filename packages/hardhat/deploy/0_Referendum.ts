import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { BigNumber } from "@ethersproject/bignumber";
import { start } from "repl";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deploy } = hre.deployments;
  const { deployer } = await hre.getNamedAccounts();
  const chainId = await hre.getChainId();
  const nowTime = new Date();
  const startMint = BigNumber.from(nowTime.getTime()).div(1000).sub(60);
  const endMint = chainId === "1337"? startMint.add(65) : startMint.add(604800);
  const referendum = await deploy("Referendum", {
    from: deployer,
    args: [startMint, endMint]
  });
  console.log("Referendum deployed to:", referendum.address);
};
export default func;
func.tags = ["referendum"];
