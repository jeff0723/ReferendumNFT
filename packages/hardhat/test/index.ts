import { expect } from "chai";
import { ethers, deployments, network } from "hardhat";
import { DemocracyToken__factory, Referendum__factory } from "../../frontend/src/typechain";

describe("Referendum", function () {
  it("mint", async function () {
    // Accounts
    const [dev, user1, user2, user3] = await ethers.getSigners();

    // Deployment
    await deployments.fixture(["referendum"]);
    const referendumDeployment = await deployments.get("Referendum");
    const referendumContract = Referendum__factory.connect(
      referendumDeployment.address,
      dev
    );
    const democracyTokenContract = DemocracyToken__factory.connect(
      await referendumContract.democracyToken(),
      dev
    )

    const baseURI = "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/";

    // self-mint
    const tokenURI0 = baseURI + "0";
    const tx0 = await referendumContract.connect(user1).mint(tokenURI0);
    await tx0.wait();
    expect((await referendumContract.tokenURI(0)) === tokenURI0);
    expect((await referendumContract.ownerOf(0) === user1.address));
    expect(ethers.utils.parseEther("2").eq(await democracyTokenContract.balanceOf(user1.address)));

    // free-mint
    const tokenURI1 = baseURI + "1";
    const tx1 = await referendumContract.connect(dev).mintTo(tokenURI1, user2.address);
    await tx1.wait();
    expect((await referendumContract.tokenURI(1)) === tokenURI0);
    expect((await referendumContract.ownerOf(0) === user2.address));
    expect(ethers.utils.parseEther("1").eq(await democracyTokenContract.balanceOf(user2.address)));

    // donate
    const devBalance = await dev.getBalance();
    const donate = ethers.utils.parseEther("5");
    user3.sendTransaction({
      to: referendumContract.address,
      value: donate
    })
    expect(devBalance.add(donate).eq(await dev.getBalance()));
    expect(donate.eq(await democracyTokenContract.balanceOf(user3.address)));

    // pass to end time
    await network.provider.send("evm_setNextBlockTimestamp", [(await referendumContract.endTime()).toNumber()+60]);
    await network.provider.send("evm_mine");

    // mint Democracy Spirit NFT
    const tokenURI2 = baseURI + "777";
    const tx2 = await referendumContract.mintDemocracySpiritNFT(tokenURI2);
    await tx2.wait();
    const totalSupply = await referendumContract.totalSupply();
    expect((await referendumContract.tokenURI(totalSupply)) === tokenURI2);
    expect((await referendumContract.ownerOf(totalSupply)) === referendumContract.address);
  });
});
