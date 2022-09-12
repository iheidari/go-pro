import React from "react";

type Props = {
  name: string;
  onChange?: (value: string) => void;
  value?: string;
};

const Textbox = ({ name, onChange, value }: Props) => {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange ? (event) => onChange(event.target.value) : undefined}
      className="w-full shadow appearance-none border rounded py-2 px-3 mr-2 w-96 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  );
};

export default Textbox;
