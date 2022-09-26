import React, { useState, ReactNode } from "react";
/** Components */
import { Card, Input, Button } from "./components";
import { Switch } from "@headlessui/react";
import Swal from "sweetalert2";
/** Classnames */
import classnames from "classnames";

const App: React.FC = () => {
  const buttons: { [key: string]: any }[] = [
    {
      symbol: (): ReactNode => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      ),
      operator: "plus",
    },
    {
      symbol: (): ReactNode => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
        </svg>
      ),
      operator: "minus",
    },
    {
      symbol: (): ReactNode => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ),
      operator: "multiply",
    },
    {
      symbol: (): ReactNode => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="w-6 h-6 text-white"
          fill="#ffffff"
        >
          <path d="M272 96c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 320c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM400 288c17.7 0 32-14.3 32-32s-14.3-32-32-32H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H400z" />
        </svg>
      ),
      operator: "divide",
    },
  ];

  const [inputs, setInputs] = useState<{ [key: string]: any }[]>([
    {
      label: "Input 1",
      isChecked: false,
      attr: {
        name: "input-1",
        id: "input-1",
        value: "",
        type: "mumber",
      },
    },
    {
      label: "Input 2",
      isChecked: false,
      attr: {
        name: "input-2",
        id: "input-2",
        value: "",
        type: "mumber",
      },
    },
    {
      label: "Input 3",
      isChecked: false,
      attr: {
        name: "input-3",
        id: "input-3",
        value: "",
        type: "mumber",
      },
    },
  ]);

  const [calulateResult, setCalculateResult] = useState<number>();

  const handleInput = (
    id: string | number,
    value: number | boolean | string
  ): void => {
    let newInputs: { [key: string]: any }[] = [];

    if (typeof value === "boolean") {
      newInputs = inputs.map(
        (input: { [key: string]: any }, inputIdx: number) => {
          if (id === inputIdx) {
            return {
              ...input,
              isChecked: value,
            };
          }
          return {
            ...input,
          };
        }
      );
    } else if (typeof value === "string") {
      newInputs = inputs.map((input: { [key: string]: any }) => {
        if (id === input.attr.id) {
          return {
            ...input,
            attr: { ...input.attr, value: value },
          };
        }
        return {
          ...input,
        };
      });
    }
    setInputs(newInputs);
  };

  const calculate = (operator: string): void | ReactNode => {
    if (operator === "clear") {
      const clearInputs = inputs.map((input: { [key: string]: any }) => {
        return {
          ...input,
          isChecked: false,
          attr: {
            ...input.attr,
            value: "",
          },
        };
      });

      setInputs(clearInputs);

      return;
    }

    const inputChecks: { [key: string]: any }[] = inputs.filter(
      (input: { [key: string]: any }) => {
        return input.isChecked;
      }
    );

    if (inputChecks.length <= 1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Input must be filled more than 1",
      });

      return;
    }

    let sum = Number(inputChecks[0].attr.value);

    for (let i = 1; i < inputChecks.length; i++) {
      if (operator === "plus") {
        sum += Number(inputChecks[i].attr.value);
      } else if (operator === "minus") {
        sum -= Number(inputChecks[i].attr.value);
      } else if (operator === "multiply") {
        sum *= Number(inputChecks[i].attr.value);
      } else {
        sum /= Number(inputChecks[i].attr.value);
      }
    }

    setCalculateResult(sum);
  };

  return (
    <div className="w-screen h-screen">
      <div className="h-full flex flex-col items-center justify-center px-8">
        <Card bgColor="bg-cyan-600/[0.35]" shadowColor="shadow-cyan-700/[0.5]">
          <div className="w-full h-full">
            {inputs.map((input: { [key: string]: any }, inputIdx: number) => (
              <div
                className="w-full flex flex-wrap items-center"
                key={inputIdx}
              >
                <div className="w-[90%] my-1">
                  <label className="block text-sm font-medium text-gray-600/75">
                    {input.label}
                  </label>
                  <div className="my-2">
                    <Input input={input} handleInput={handleInput} />
                  </div>
                </div>
                <div className="w-[10%] text-center relative">
                  <Switch
                    checked={input.isChecked}
                    id={input.attr.id}
                    name={input.attr.name}
                    onChange={(e: boolean) => {
                      handleInput(inputIdx, e);
                    }}
                    className={classnames(
                      "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 absolute bottom-[-11px]",
                      {
                        ["bg-indigo-600"]: input.isChecked,
                        ["bg-gray-200"]: !input.isChecked,
                      }
                    )}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={classnames(
                        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                        {
                          ["translate-x-5"]: input.isChecked,
                          ["translate-x-0"]: !input.isChecked,
                        }
                      )}
                    />
                  </Switch>
                </div>
              </div>
            ))}
            <div className="w-full flex flex-wrap justify-between py-4 border-b border-[#0081c3]">
              {buttons.map(
                (button: { [key: string]: any }, buttonIdx: number) => (
                  <div className="w-[24%]" key={buttonIdx}>
                    <Button
                      name={button.symbol}
                      operator={button.operator}
                      calculate={calculate}
                    />
                  </div>
                )
              )}
            </div>
            <div className="flex flex-wrap w-ful mt-3">
              <span className="font-semibold text-white text-xl">Result :</span>
              {calulateResult !== undefined && (
                <span className="font-semibold text-white text-xl ml-4">
                  {calulateResult}
                </span>
              )}
            </div>
            <div className="mt-5 w-full">
              <Button
                name={() => "Clear"}
                operator="clear"
                calculate={calculate}
              ></Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default App;
