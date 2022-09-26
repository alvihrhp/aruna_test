import React from "react";

interface Props {
  input: { [key: string]: any };
  handleInput: (id: string | number, value: number | boolean | string) => void;
}

const Input: React.FC<Props> = ({ input, handleInput }) => {
  return (
    <input
      {...input.attr}
      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3"
      onChange={(e: React.FormEvent<HTMLInputElement>) =>
        handleInput(e.currentTarget.id, e.currentTarget.value)
      }
    />
  );
};

export default Input;
