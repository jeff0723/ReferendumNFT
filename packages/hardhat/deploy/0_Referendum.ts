import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deploy } = hre.deployments;
  const { deployer } = await hre.getNamedAccounts();
  const referendum = await deploy("Referendum", { from: deployer });
  console.log("Referendum deployed to:", referendum.address);
};
export default func;
func.tags = ["referendum"];
