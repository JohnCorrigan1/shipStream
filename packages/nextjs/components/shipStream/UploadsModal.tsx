import { MutableRefObject, useEffect, useState } from "react";
import Upload from "./Upload";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

interface UploadsModalProps {
  modal: MutableRefObject<HTMLDialogElement | null>;
  streamId: number;
}

const UploadsModal = ({ modal, streamId }: UploadsModalProps) => {
  const { address } = useAccount();
  const [sortedUploads, setSortedUploads] = useState<any[]>([]);

  const handleClose = () => {
    modal.current?.close();
  };

  const { data: uploads } = useScaffoldContractRead({
    contractName: "ShipStream",
    functionName: "uploadsOf",
    args: [address, ethers.BigNumber.from(streamId)],
  });

  useEffect(() => {
    if (uploads) {
      setSortedUploads([]);
      for (let i = uploads.length; i > 0; i--) {
        setSortedUploads(sortedUploads => [...sortedUploads, uploads[i - 1]]);
      }
    }
  }, [uploads]);

  return (
    <dialog className="w-4/5 lg:w-2/3 h-2/3 xl:w-1/2 xl:h-1/2 bg-base-100 rounded-lg scroll-smooth" ref={modal}>
      <div className="flex flex-col items-center p-5 xl:p-10 gap-5">
        <h1 className="text-2xl font-bold text-primary-content">Stream uploads</h1>
        <div className="w-full flex flex-col gap-3">
          {sortedUploads.length > 0 &&
            sortedUploads.map((upload, index) => (
              <Upload key={index} upload={upload?.upload} uploadTime={upload?.uploadTime.toString()} />
            ))}
        </div>
      </div>
      <button
        onClick={handleClose}
        className="rounded-full bg-base-300 bg-opacity-70 absolute top-5 right-5 hover:scale-105 active:scale-95 "
      >
        <XMarkIcon className="w-8 h-8 text-primary-content" />
      </button>
    </dialog>
  );
};

export default UploadsModal;
