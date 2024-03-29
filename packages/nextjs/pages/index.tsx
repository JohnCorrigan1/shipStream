import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import ShipStreamData from "~~/components/shipStream/ShipStreamData";
import ShipStreamInteraction from "~~/components/shipStream/ShipStreamInteraction";

const ShipStream: NextPage = () => {
  return (
    <>
      <MetaHeader title="Ship Steam | Scaffold-ETH 2" description="Ship Stream created with 🏗 Scaffold-ETH 2">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className=" p-5 grid gap-5 2xl:grid-cols-2 flex-grow">
        <ShipStreamInteraction />
        <ShipStreamData />
      </div>
    </>
  );
};

export default ShipStream;
