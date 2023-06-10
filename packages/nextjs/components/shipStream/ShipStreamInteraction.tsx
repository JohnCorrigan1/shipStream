import { useState } from "react";
import { ethers } from "ethers";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const ShipStreamInteraction: React.FC = () => {
  const [duration, setDuration] = useState(0);
  const [frequency, setFrequency] = useState(0);
  const [amount, setAmount] = useState(0);

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "ShipStream",
    functionName: "createStream",
    args: [ethers.utils.parseEther(duration.toString()), ethers.utils.parseEther(frequency.toString())],
    overrides: {
      value: ethers.utils.parseEther(amount.toString()),
    },
  });

  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center bg-base-100 shadow-lg rounded-lg max-w-3xl w-full p-5">
        <h1>Create a Stream</h1>
        <p>
          Create a stream to keep yourself accountable for your goals. You can create a stream for anything you want to
          do, like learning a new skill, reading a book, or even just drinking more water.
        </p>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="">Duration (ms)</label>
            <input
              onChange={(e: any) => setDuration(e.target.value)}
              type="number"
              value={duration}
              placeholder="duration"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="flex flex-col">
            <label className="">Frequency (ms)</label>
            <input
              onChange={(e: any) => setFrequency(e.target.value)}
              type="number"
              value={frequency}
              placeholder="frequency"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="flex flex-col">
            <label className="">Amount (ETH)</label>
            <input
              onChange={(e: any) => setAmount(e.target.value)}
              type="number"
              value={amount}
              placeholder="amount"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <button onClick={writeAsync} className="btn btn-primary">
            Create a Stream
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShipStreamInteraction;
