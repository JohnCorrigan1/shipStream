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
            {parseFloat(ethers.utils.formatEther(ethers.BigNumber.from(stats?.closer))).toFixed(2)} eth
          </div>
        ) : (
          <div className="stat-value text-primary">...</div>
        )}
      </div>

      <div className="stat">
        <div className="stat-title">To public goods</div>
        {stats ? (
          <div className="stat-value text-secondary">
            {parseFloat(ethers.utils.formatEther(ethers.BigNumber.from(stats?.publicGoods))).toFixed(2)} eth
          </div>
        ) : (
          <div className="stat-value text-secondary">...</div>
        )}
      </div>
    </div>
  );
};

export default CloseableStats;
