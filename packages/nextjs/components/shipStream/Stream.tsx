import { ethers } from "ethers";

const Stream = ({ stream }: any) => {
  return (
    <div className="collapse collapse-arrow bg-base-200">
      {/* @ts-ignore */}
      <input type="radio" name="my-accordion-2" />
      <div className="collapse-title text-xl font-medium flex justify-between">
        {/* <h2>{stream.name}</h2> */}
        <p>{ethers.utils.formatEther(stream.currentBalance.toString())}</p>
        <p>{ethers.utils.formatEther(stream.duration.toString())}</p>
        <p>{ethers.utils.formatEther(stream.frequency.toString())}</p>
        <p>
          {stream.streamed.toString()}/{stream.totalStreams.toString()}
        </p>
      </div>
      <div className="collapse-content flex">
        <div className="flex flex-col gap-3">
          <textarea className="textarea textarea-bordered rounded-xl" placeholder="upload" />
          <button className="btn btn-primary">Upload</button>
        </div>
      </div>
    </div>
  );
};

export default Stream;
