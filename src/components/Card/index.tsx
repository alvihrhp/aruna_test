import React, { Children, ReactNode } from "react";

interface Props {
  children: ReactNode;
  bgColor: string;
  shadowColor: string;
}

const Card: React.FC<Props> = ({ children, bgColor, shadowColor }) => {
  return (
    <div
      className={`rounded shadow-lg w-full ${bgColor} ${shadowColor} py-4 px-5`}
    >
      {children}
    </div>
  );
};

export default Card;
