import { expect } from "chai";
import { ethers } from "hardhat";
import { ShipStream } from "../typechain-types";

describe("ShipStream", function () {
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
      await shipStream.createStream(1000, 100, "test stream", { value: ethers.utils.parseEther("1") });
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
      await ethers.provider.send("evm_increaseTime", [50]);
      await ethers.provider.send("evm_mine", []);
      await expect(shipStream.uploadString("test", 0)).to.be.revertedWith("wait");
    });

    it("should not be able to uplaod again", async function () {
      await expect(shipStream.uploadString("test", 0)).to.be.revertedWith("wait");
    });

    it("Should allow upload after waiting for frequency", async function () {
      await ethers.provider.send("evm_increaseTime", [100]);
      await ethers.provider.send("evm_mine", []);
      const [owner] = await ethers.getSigners();
      await shipStream.uploadString("test", 0);
      expect(await shipStream.balanceOf(owner.address)).to.equal(ethers.utils.parseEther("0.8"));
    });

    it("Should allow another upload after waiting", async function () {
      const [owner] = await ethers.getSigners();
      await ethers.provider.send("evm_increaseTime", [60]);
      await ethers.provider.send("evm_mine", []);
      await shipStream.uploadString("test", 0);
      expect(await shipStream.balanceOf(owner.address)).to.equal(ethers.utils.parseEther("0.7"));
    });

    it("should not able to be upload another string", async function () {
      await ethers.provider.send("evm_increaseTime", [20]);
      await ethers.provider.send("evm_mine", []);
      await expect(shipStream.uploadString("test", 0)).to.be.revertedWith("wait");
    });

    it("should not be closable", async function () {
      const [owner] = await ethers.getSigners();
      await expect(shipStream.closeStream(owner.address, 0)).to.be.revertedWith("Stream still open");
    });

    it("Should not allow upload after missing a window", async function () {
      await ethers.provider.send("evm_increaseTime", [200]);
      await ethers.provider.send("evm_mine", []);
      await expect(shipStream.uploadString("test", 0)).to.be.revertedWith("missed");
    });

    it("should be closable", async function () {
      const [owner] = await ethers.getSigners();
      await shipStream.closeStream(owner.address, 0);
      expect(await shipStream.numStreams(owner.address)).to.equal(0);
    });

    it("should allow another stream to be created", async function () {
      await shipStream.createStream(20, 10, "test stream", { value: ethers.utils.parseEther("1") });
      expect(await shipStream.totalStreams()).to.equal(1);
    });

    it("should allow both delete stream after all streams have been streamed", async function () {
      const [owner] = await ethers.getSigners();
      await shipStream.uploadString("test", 0);
      await ethers.provider.send("evm_increaseTime", [15]);
      await ethers.provider.send("evm_mine", []);
      await shipStream.uploadString("test", 0);
      expect(await shipStream.numStreams(owner.address)).to.equal(0);
      expect(await shipStream.totalStreams()).to.equal(0);
    });
  });

  describe("Deployment 2", function () {
    console.log("Deploying 2nd time");
    it("Should have 0 streams on deploy", async function () {
      expect(await shipStream.totalStreams()).to.equal(0);
    });

    it("users should have 1 address after creating a stream", async function () {
      await shipStream.createStream(1000, 100, "test stream", { value: ethers.utils.parseEther("2") });
      const users = await shipStream.getUsers();
      expect(users.length).to.equal(1);
    });

    it("users should have 2 address after 2nd address creates stream", async function () {
      const [owner, user] = await ethers.getSigners();
      await shipStream.connect(user).createStream(2000, 1000, "test stream", { value: ethers.utils.parseEther("1") });
      const users = await shipStream.getUsers();
      console.log(owner.address, user.address, users);
      expect(users.length).to.equal(2);
    });

    it("should have one closeable stream", async function () {
      const closeable = await shipStream.closeableStreams();
      expect(closeable.length).to.equal(1);
      const stream = await shipStream.streamOf(closeable[0].user, closeable[0].index);
      expect(stream.currentBalance).to.equal(ethers.utils.parseEther("2"));
    });

    it("users should have one address after closing first stream", async function () {
      const [owner, user] = await ethers.getSigners();
      await shipStream.closeStream(owner.address, 0);
      const users = await shipStream.getUsers();
      expect(users.length).to.equal(1);
      expect(users[0]).to.equal(user.address);
    });

    it("users should have two addresss after opening a new stream", async function () {
      await shipStream.createStream(1000, 100, "test stream", { value: ethers.utils.parseEther("1") });
      const users = await shipStream.getUsers();
      expect(users.length).to.equal(2);
    });

    it("should be able to close multiple streams at once", async function () {
      await ethers.provider.send("evm_increaseTime", [2000]);
      await ethers.provider.send("evm_mine", []);
      await shipStream.closeAllCloseableStreams();
      const users = await shipStream.getUsers();
      expect(users.length).to.equal(0);
      expect(await shipStream.totalStreams()).to.equal(0);
    });
  });
});
