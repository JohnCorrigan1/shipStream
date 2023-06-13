import InteractionForm from "./InteractionForm";

const ShipStreamInteraction: React.FC = () => {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center bg-base-100 shadow-lg rounded-lg max-w-3xl w-full p-5">
        <h1>Create a Stream</h1>
        <p>
          Create a stream to keep yourself accountable for your goals. You can create a stream for anything you want to
          do, like learning a new skill, reading a book, or even just drinking more water.
        </p>
        <InteractionForm />
      </div>
    </div>
  );
};

export default ShipStreamInteraction;
