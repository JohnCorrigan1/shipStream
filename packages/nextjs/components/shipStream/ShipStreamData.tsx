import Stream from "./Stream";

const ShipStreamData: React.FC = () => {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center bg-base-100 shadow-lg rounded-lg max-w-xl p-5">
        <h1>My Streams</h1>
        <p>This is where you can see all of your streams and contribute to them.</p>
        <Stream />
      </div>
    </div>
  );
};

export default ShipStreamData;
