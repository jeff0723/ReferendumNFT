import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { BigNumber } from "@ethersproject/bignumber";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deploy } = hre.deployments;
  const { deployer } = await hre.getNamedAccounts();
  const nowTime = new Date();
  const startMint = BigNumber.from(nowTime.getTime()).div(1000).sub(5);
  const endMint = startMint.add(604800);
  const referendum = await deploy("Referendum", {
    from: deployer,
    args: [startMint, endMint]
  });
  console.log("Referendum deployed to:", referendum.address);
};
export default func;
func.tags = ["referendum"];
