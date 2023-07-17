import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import CloseableStats from "~~/components/shipStream/CloseableStats";
import CloseableStreams from "~~/components/shipStream/CloseableStreams";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Closeable: NextPage = () => {
  const { writeAsync } = useScaffoldContractWrite({
    contractName: "ShipStream",
    functionName: "closeAllCloseableStreams",
  });

  return (
    <>
      <MetaHeader title="Ship Steam | Scaffold-ETH 2" description="Ship Stream created with 🏗 Scaffold-ETH 2">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className=" p-5 flex flex-col">
        <div className="w-full flex flex-col gap-5 justify-center items-center p-5">
          <CloseableStats />
          <button onClick={writeAsync} className="btn btn-primary">
            Close all
          </button>
        </div>
        <CloseableStreams />
      </div>
    </>
  );
};

export default Closeable;
