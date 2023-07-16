import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

interface StreamProps {
  user: string;
  index: string;
  youGet: number;
  publicGoodsGet: number;
  setYouGet: React.Dispatch<React.SetStateAction<number>>;
  setPublicGoodsGet: React.Dispatch<React.SetStateAction<number>>;
}

interface Props {
  youGet: number;
  publicGoodsGet: number;
  setYouGet: React.Dispatch<React.SetStateAction<number>>;
  setPublicGoodsGet: React.Dispatch<React.SetStateAction<number>>;
}

const CloseableStreams = ({ youGet, publicGoodsGet, setYouGet, setPublicGoodsGet }: Props) => {
  const { data: closeable } = useScaffoldContractRead({
    contractName: "ShipStream",
    functionName: "closeableStreams",
  });

  return (
    <div>
      {closeable?.map((stream, index) => (
        <CloseableStream
          publicGoodsGet={publicGoodsGet}
          youGet={youGet}
          user={stream.user}
          index={ethers.utils.formatEther(stream.index)}
          key={index}
          setYouGet={setYouGet}
          setPublicGoodsGet={setPublicGoodsGet}
        />
      ))}
    </div>
  );
};

const CloseableStream = ({ user, index, youGet, publicGoodsGet, setYouGet, setPublicGoodsGet }: StreamProps) => {
  const [closerGets, setCloserGets] = useState(0);
  const [toPublicGoods, setToPublicGoods] = useState(0);

  const { data: stream } = useScaffoldContractRead({
    contractName: "ShipStream",
    functionName: "streamOf",
    args: [user, ethers.utils.parseEther(index)],
  });

  useEffect(() => {
    if (!stream) return;
    setCloserGets(parseInt(ethers.utils.formatEther(ethers.BigNumber.from(stream?.currentBalance))) / 10);
    setToPublicGoods(
      parseInt(ethers.utils.formatEther(ethers.BigNumber.from(stream?.currentBalance))) -
        parseInt(ethers.utils.formatEther(ethers.BigNumber.from(stream?.currentBalance))) / 10,
    );
    setYouGet(youGet + closerGets);
    setPublicGoodsGet(publicGoodsGet + toPublicGoods);
  }, [stream]);

  return (
    <div>
      <h1>{user}</h1>
      <h1>{stream?.name}</h1>
    </div>
  );
};

export default CloseableStreams;
