import { expect } from "chai";
import { ethers } from "hardhat";
import { ShipStream } from "../typechain-types";

describe("ShipStream", function () {
  // We define a fixture to reuse the same setup in every test.

  let shipStream: ShipStream;
  before(async () => {
    const [owner] = await ethers.getSigners();
    const shipStreamFactory = await ethers.getContractFactory("ShipStream");
    shipStream = (await shipStreamFactory.deploy(owner.address)) as ShipStream;
    await shipStream.deployed();
  });

  describe("Deployment", function () {
    it("Should have 0 streams on deploy", async function () {
      expect(await shipStream.totalStreams()).to.equal(0);
    });

    it("should have 1 stream after creating", async function () {
      await shipStream.createStream(1000000, 100000, "test stream", { value: ethers.utils.parseEther("1") });
      expect(await shipStream.totalStreams()).to.equal(1);
    });

    it("owner should have 1 eth balance in stream", async function () {
      const [owner] = await ethers.getSigners();
      expect(await shipStream.balanceOf(owner.address)).to.equal(ethers.utils.parseEther("1"));
    });

    it("owner should upload string and have .9eth balance in stream", async function () {
      const [owner] = await ethers.getSigners();
      await shipStream.uploadString("test", 0);
      expect(await shipStream.balanceOf(owner.address)).to.equal(ethers.utils.parseEther("0.9"));
    });

    it("Should not be able to upload another string", async function () {
      const [owner] = await ethers.getSigners();
      await expect(shipStream.uploadString("test", 0)).to.be.revertedWith("wait");
      expect(await shipStream.balanceOf(owner.address)).to.equal(ethers.utils.parseEther("0.9"));
    });

    it("Should not be able to close stream", async function () {
      const [owner] = await ethers.getSigners();
      await expect(shipStream.closeStream(owner.address, 0)).to.be.revertedWith("Stream still open");
    });

    it("should not be able to upload after waiting for half frequency", async function () {
      await ethers.provider.send("evm_increaseTime", [50000]);
      await ethers.provider.send("evm_mine", []);
      await expect(shipStream.uploadString("test", 0)).to.be.revertedWith("wait");
    });

    it("should not be able to uplaod again", async function () {
      await expect(shipStream.uploadString("test", 0)).to.be.revertedWith("wait");
    });

    it("Should allow upload after waiting for frequency", async function () {
      await ethers.provider.send("evm_increaseTime", [100000]);
      await ethers.provider.send("evm_mine", []);
      const [owner] = await ethers.getSigners();
      await shipStream.uploadString("test", 0);
      expect(await shipStream.balanceOf(owner.address)).to.equal(ethers.utils.parseEther("0.8"));
    });
  });
});
