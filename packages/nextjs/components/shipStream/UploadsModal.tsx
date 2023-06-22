import { MutableRefObject, useEffect, useState } from "react";
import Upload from "./Upload";
import { useAccount, useProvider } from "wagmi";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

interface UploadsModalProps {
  modal: MutableRefObject<HTMLDialogElement | null>;
  streamId: number;
}

interface Uploads {
  upload: string;
  uploadTime: number;
  transactionHash: string;
}

const UploadsModal = ({ modal, streamId }: UploadsModalProps) => {
  const { address } = useAccount();
  const provider = useProvider();
  const [uploads, setUploads] = useState<Uploads[]>([]);
  const handleClose = () => {
    modal.current?.close();
  };

  const { data: uploadEvents } = useScaffoldEventHistory({
    contractName: "ShipStream",
    eventName: "StringUploaded",
    fromBlock: Number(process.env.NEXT_PUBLIC_DEPLOY_BLOCK) || 0,
    filters: { streamCreator: address },
    blockData: true,
  });

  const getTimeFromBlock = async (blockNumber: number) => {
    const block = await provider.getBlock(blockNumber);
    return block.timestamp;
  };

  useEffect(() => {
    if (uploadEvents) {
      console.log(uploadEvents);
      const temp: any = uploadEvents.filter(event => event.args[1].toString() == streamId.toString());
      temp.forEach(async (event: any) => {
        const upload = event.args[2];
        const uploadTime = await getTimeFromBlock(event.log.blockNumber);
        const transactionHash = event.log.transactionHash;
        setUploads(prev => [...prev, { upload, uploadTime, transactionHash }]);
      });

      // setUploads(prev =>
      // prev.filter((upload, index, self) => index === self.findIndex(t => t.uploadTime === upload.uploadTime)),
      // );

      setUploads(prev => prev.sort((a, b) => b.uploadTime - a.uploadTime));
    }
    console.log("uploads", uploads);
  }, [uploadEvents]);

  return (
    <dialog className="w-4/5 lg:w-2/3 h-2/3 xl:w-1/2 xl:h-1/2 bg-base-100 rounded-lg" ref={modal}>
      <div className="flex flex-col items-center p-5 xl:p-10 gap-5">
        <h1 className="text-2xl font-bold text-primary-content">Stream uploads</h1>
        <div className="w-full flex flex-col gap-3">
          {uploads.length > 0 &&
            uploads.map((upload, index) => (
              <Upload
                key={index}
                upload={upload.upload}
                uploadTime={upload.uploadTime.toString()}
                transactionHash={upload.transactionHash}
              />
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
