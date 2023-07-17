import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

interface StreamProps {
  user: string;
  index: string;
}

const CloseableStreams = () => {
  const { data: closeable } = useScaffoldContractRead({
    contractName: "ShipStream",
    functionName: "closeableStreams",
  });

  return (
    <div className="w-full flex justify-center">
      <div className="overflow-x-auto w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
        {!closeable || closeable.length === 0 ? (
          <div className="flex justify-center">
            <div className="p-10">No closeable streams...</div>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Stream Name</th>
                <th>You get</th>
                <th>To public goods</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {closeable?.map((stream, index) => (
                <CloseableStream user={stream.user} index={ethers.utils.formatEther(stream.index)} key={index} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const CloseableStream = ({ user, index }: StreamProps) => {
  const [closerGets, setCloserGets] = useState(0);
  const [toPublicGoods, setToPublicGoods] = useState(0);

  const { data: stream } = useScaffoldContractRead({
    contractName: "ShipStream",
    functionName: "streamOf",
    args: [user, ethers.utils.parseEther(index)],
  });

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "ShipStream",
    functionName: "closeStream",
    args: [user, ethers.utils.parseEther(index)],
  });

  useEffect(() => {
    if (!stream) return;
    setCloserGets(parseInt(ethers.utils.formatEther(ethers.BigNumber.from(stream?.currentBalance))) / 10);
    setToPublicGoods(
      parseInt(ethers.utils.formatEther(ethers.BigNumber.from(stream?.currentBalance))) -
        parseInt(ethers.utils.formatEther(ethers.BigNumber.from(stream?.currentBalance))) / 10,
    );
  }, [stream]);

  return (
    <tr className=" bg-base-300 bg-opacity-50">
      <td>{stream?.name}</td>
      <td>{closerGets} Eth</td>
      <td>{toPublicGoods} Eth</td>
      <td>
        <button onClick={writeAsync} className="btn btn-primary">
          Close
        </button>
      </td>
    </tr>
  );
};

export default CloseableStreams;
