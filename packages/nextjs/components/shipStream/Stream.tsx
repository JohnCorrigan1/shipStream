import { useRef, useState } from "react";
import { StreamType } from "./StreamTypes";
import UploadsModal from "./UploadsModal";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

interface StreamProps {
  stream: StreamType;
  streamId: number;
}
const Stream = ({ stream, streamId }: StreamProps) => {
  const modal = useRef<null | HTMLDialogElement>(null);
  const { address } = useAccount();
  const [upload, setUpload] = useState("");

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "ShipStream",
    functionName: "uploadString",
    args: [upload, ethers.BigNumber.from(streamId)],
  });

  const { data: lastUpload } = useScaffoldContractRead({
    contractName: "ShipStream",
    functionName: "lastUploadOf",
    args: [address, ethers.utils.parseEther(streamId.toString())],
  });

  const showModal = () => {
    modal.current?.showModal();
  };

  return (
    <div className="collapse collapse-arrow bg-base-200 glass">
      <input type="radio" name="my-accordion-2" />
      <div className="collapse-title text-xl font-medium flex justify-between items-center">
        <h2>{stream.name}</h2>
        <p>{ethers.utils.formatEther(stream.currentBalance.toString())}</p>
        <p>{stream.duration.toString()}</p>
        <p>{stream.frequency.toString()}</p>
        <p>
          {stream.streamed.toString()}/{stream.totalStreams.toString()}
        </p>
      </div>
      <div className="collapse-content flex gap-5">
        <div className="flex flex-col gap-3 w-1/2">
          <textarea
            onChange={(e: any) => setUpload(e.target.value)}
            value={upload}
            className="textarea textarea-bordered rounded-xl h-full"
            placeholder="upload"
          />
          <button onClick={writeAsync} className="btn btn-primary">
            Upload
          </button>
        </div>
        <div className="flex flex-col gap-3 w-1/2">
          <div className="textarea textarea-bordered rounded-xl h-full w-full">
            <h2>Last Upload:</h2>
            <p>{lastUpload}</p>
          </div>

          <button onClick={showModal} className="btn btn-primary">
            View History
          </button>
        </div>
      </div>
      <UploadsModal modal={modal} streamId={streamId} />
    </div>
  );
};

export default Stream;
