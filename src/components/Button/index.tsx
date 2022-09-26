import React, { ReactNode } from "react";
/** classnames */
import classnames from "classnames";

interface Props {
  name: () => ReactNode | string;
  operator: string;
  calculate: (operator: string) => void | ReactNode;
}

const Button: React.FC<Props> = ({ name, operator, calculate }) => {
  return (
    <button
      type="button"
      className={classnames(
        "w-full inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
        { ["font-extralight text-lg"]: operator === "clear" }
      )}
      onClick={() => calculate(operator)}
    >
      {name()}
    </button>
  );
};

export default Button;
