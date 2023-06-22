import { useState } from "react";
import { ethers } from "ethers";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const InteractionForm = () => {
  const [duration, setDuration] = useState(0);
  const [frequency, setFrequency] = useState(0);
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "ShipStream",
    functionName: "createStream",
    args: [
      duration > 0 ? ethers.utils.parseEther(duration.toString()) : ethers.utils.parseEther("0"),
      frequency > 0 ? ethers.utils.parseEther(frequency.toString()) : ethers.utils.parseEther("0"),
      name,
    ],
    overrides: {
      value: amount > 0 ? ethers.utils.parseEther(amount.toString()) : ethers.utils.parseEther("0"),
    },
  });

  return (
    <div className="grid grid-cols-2 gap-5 xl:gap-8">
      <div className="flex flex-col">
        <label className="">Stream name</label>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          type="text"
          value={name}
          placeholder="name"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="flex flex-col">
        <label className="">Duration (s)</label>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDuration(parseInt(e.target.value))}
          type="number"
          value={duration}
          placeholder="duration"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="flex flex-col">
        <label className="">Frequency (s)</label>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFrequency(parseInt(e.target.value))}
          type="number"
          value={frequency}
          placeholder="frequency"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="flex flex-col">
        <label className="">Amount (ETH)</label>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(parseInt(e.target.value))}
          type="number"
          value={amount}
          placeholder="amount"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className=" col-span-2 flex justify-center">
        <button onClick={writeAsync} className="btn btn-primary">
          Create a Stream
        </button>
      </div>
    </div>
  );
};

export default InteractionForm;
