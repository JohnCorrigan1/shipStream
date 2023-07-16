import { useState } from "react";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import CloseableStats from "~~/components/shipStream/CloseableStats";
import CloseableStreams from "~~/components/shipStream/CloseableStreams";

const Closeable: NextPage = () => {
  const [publicGoodsGet, setPublicGoodsGet] = useState(0);
  const [youGet, setYouGet] = useState(0);
  return (
    <>
      <MetaHeader title="Ship Steam | Scaffold-ETH 2" description="Ship Stream created with 🏗 Scaffold-ETH 2">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className=" p-5 flex flex-col w-screen max-w-screen">
        <CloseableStats youGet={youGet} publicGoodsGet={publicGoodsGet} />
        <CloseableStreams
          publicGoodsGet={publicGoodsGet}
          setPublicGoodsGet={setPublicGoodsGet}
          youGet={youGet}
          setYouGet={setYouGet}
        />
      </div>
    </>
  );
};

export default Closeable;
