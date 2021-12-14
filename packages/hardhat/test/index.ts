import { expect } from "chai";
import { ethers, deployments } from "hardhat";
import { Referendum__factory } from "../../react-app/src/typechain";
describe("Referendum", function () {
  it("mint", async function () {
    // Accounts
    const [dev] = await ethers.getSigners();

    // Deployment
    await deployments.fixture(["referendum"]);
    const referendumDeployment = await deployments.get("Referendum");
    const referendumContract = Referendum__factory.connect(
      referendumDeployment.address,
      dev
    );
    console.log("Referendum contract address: ", referendumDeployment.address);
    const tokenURI = "ipfs://";
    const tx = await referendumContract.mint(tokenURI);
    tx.wait();
    expect((await referendumContract.tokenURI(0)) === tokenURI);
  });
});
