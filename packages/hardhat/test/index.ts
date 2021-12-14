import { expect } from "chai";
import { ethers, deployments } from "hardhat";
import { Referendum__factory } from "../../react-app/src/typechain";

describe("Referendum", function () {
  it("mint", async function () {
    // Accounts
    const [dev, user1] = await ethers.getSigners();

    // Deployment
    await deployments.fixture(["referendum"]);
    const referendumDeployment = await deployments.get("Referendum");
    const referendumContract = Referendum__factory.connect(
      referendumDeployment.address,
      dev
    );
    console.log("Referendum contract address: ", referendumDeployment.address);
    const baseURI = "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/";

    const tokenURI0 = baseURI + "0";
    const tx0 = await referendumContract.mint(tokenURI0);
    await tx0.wait();
    expect((await referendumContract.tokenURI(0)) === tokenURI0);
    expect((await referendumContract.ownerOf(0) === dev.address));

    const tokenURI1 = baseURI + "1";
    const tx1 = await referendumContract.connect(dev).mintTo(tokenURI1, user1.address);
    await tx1.wait();
    expect((await referendumContract.tokenURI(1)) === tokenURI0);
    expect((await referendumContract.ownerOf(0) === user1.address));
  });
});
