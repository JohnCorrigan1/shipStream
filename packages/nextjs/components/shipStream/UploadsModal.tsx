import { MutableRefObject, useEffect } from "react";
import { useAccount } from "wagmi";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

interface UploadsModalProps {
  modal: MutableRefObject<HTMLDialogElement | null>;
  streamId: number;
}

const UploadsModal = ({ modal, streamId }: UploadsModalProps) => {
  const { address } = useAccount();
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

  useEffect(() => {
    if (uploadEvents) {
      console.log(uploadEvents.filter(event => event.args[1].toString() == streamId.toString()));
    }
  }, [uploadEvents]);

  return (
    <dialog className="w-4/5 lg:w-2/3 h-2/3 xl:w-1/2 xl:h-1/2 bg-base-100" ref={modal}>
      <div className="flex flex-col items-center p-5 xl:p-10">
        <h1 className="text-2xl font-bold text-primary-content">Stream uploads</h1>
        <div></div>
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
