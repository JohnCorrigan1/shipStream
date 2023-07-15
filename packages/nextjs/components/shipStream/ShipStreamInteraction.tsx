import Link from "next/link";
import InteractionForm from "./InteractionForm";

const ShipStreamInteraction: React.FC = () => {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center bg-base-100 shadow-lg rounded-lg max-w-3xl w-full p-5 xl:p-10">
        <h1 className="text-xl font-semibold">Create a Stream</h1>
        <p>
          Create a stream to keep yourself accountable for your goals. Set a duration and frequency. Interact with this
          contract once per frequency by uploading a message. If you miss an upload the stream will be closeable and the
          balance sent to a public goods address.{" "}
          <Link className="text-blue-500 underline font-bold hover:text-blue-600" href="/closeable">
            Show me closeable streams.
          </Link>
        </p>
        <InteractionForm />
      </div>
    </div>
  );
};

export default ShipStreamInteraction;
