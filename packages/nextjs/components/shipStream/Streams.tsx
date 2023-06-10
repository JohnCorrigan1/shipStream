import Stream from "./Stream";
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
    <div className="flex flex-col gap-3">
      {streams?.map((stream: any, index: number) => (
        <Stream stream={stream} key={index} />
      ))}
    </div>
  );
};

export default Streams;
