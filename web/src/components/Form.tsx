import { FormEvent } from "react";
import Textbox from "./Basic/Textbox";

type Props = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

const Form = (props: Props) => {
  return (
    <form onSubmit={props.onSubmit} className="my-2 flex gap-2">
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
