import { ethers } from "ethers";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

interface Props {
  user: string;
  index: string;
}

const CloseableStreams: React.FC = () => {
  const { data: closeable } = useScaffoldContractRead({
    contractName: "ShipStream",
    functionName: "closeableStreams",
  });

  return (
    <div>
      {closeable?.map((stream, index) => (
        <CloseableStream user={stream.user} index={ethers.utils.formatEther(stream.index)} key={index} />
      ))}
    </div>
  );
};

const CloseableStream = ({ user, index }: Props) => {
  const { data: stream } = useScaffoldContractRead({
    contractName: "ShipStream",
    functionName: "streamOf",
    args: [user, ethers.utils.parseEther(index)],
  });

  console.log(index);
  return (
    <div>
      <h1>{user}</h1>
      <h1>{stream?.name}</h1>
    </div>
  );
};

export default CloseableStreams;
