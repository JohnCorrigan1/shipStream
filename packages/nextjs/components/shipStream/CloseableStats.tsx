interface Props {
  youGet: number;
  publicGoodsGet: number;
}

const CloseableStats = ({ youGet, publicGoodsGet }: Props) => {
  return (
    <div className="stats shadow min-w-xs max-w-xs ">
      <div className="stat">
        <div className="stat-title">You get</div>
        <div className="stat-value text-primary">{youGet} eth</div>
      </div>

      <div className="stat">
        <div className="stat-title">To public goods</div>
        <div className="stat-value text-secondary">{publicGoodsGet} eth</div>
      </div>
    </div>
  );
};

export default CloseableStats;
