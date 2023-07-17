import { ethers } from "ethers";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const CloseableStats = () => {
  const { data: stats } = useScaffoldContractRead({
    contractName: "ShipStream",
    functionName: "closeableStreamsDistribution",
  });

  return (
    <div className="stats shadow min-w-sm max-w-md">
      <div className="stat">
        <div className="stat-title">You get</div>
        {stats ? (
          <div className="stat-value text-primary">
            {ethers.utils.formatEther(ethers.BigNumber.from(stats?.closer))} eth
          </div>
        ) : (
          <div className="stat-value text-primary">...</div>
        )}
      </div>

      <div className="stat">
        <div className="stat-title">To public goods</div>
        {stats ? (
          <div className="stat-value text-secondary">
            {ethers.utils.formatEther(ethers.BigNumber.from(stats?.publicGoods))} eth
          </div>
        ) : (
          <div className="stat-value text-secondary">...</div>
        )}
      </div>
    </div>
  );
};

export default CloseableStats;
