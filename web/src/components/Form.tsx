import React, { FormEvent } from "react";

type Props = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

const Form = (props: Props) => {
  return (
    <form onSubmit={props.onSubmit} className="my-2">
      <input
        name="path"
        className="shadow appearance-none border rounded py-2 px-3 mr-2 w-96 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <input
        type="submit"
        value="Submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      />
    </form>
  );
};

export default Form;
