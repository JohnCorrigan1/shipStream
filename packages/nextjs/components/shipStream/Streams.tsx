import Stream from "./Stream";
import { StreamType } from "./StreamTypes";
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const Streams = () => {
  const { address } = useAccount();

  const { data: streams } = useScaffoldContractRead({
    contractName: "ShipStream",
    functionName: "streamsOf",
    args: [address],
  });

  return (
    <div className="flex flex-col gap-3 w-full">
      {streams?.map((stream: StreamType, index) => (
        <Stream streamId={index} stream={stream} key={stream.name} />
      ))}
    </div>
  );
};

export default Streams;
