import { useContext } from "react";
import { AppContext } from "../context/appContext";
import Textbox from "./Basic/Textbox";

const Form = () => {
  const context = useContext(AppContext);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const route = (event.target as any)["path"].value;
    // no empty route
    if (!route) {
      return;
    }
    if (context) {
      context.getFiles(route);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="my-2 flex gap-2">
      <div className="w-96">
        <Textbox name="path" />
      </div>
      <input
        type="submit"
        value="Submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      />
    </form>
  );
};

export default Form;
