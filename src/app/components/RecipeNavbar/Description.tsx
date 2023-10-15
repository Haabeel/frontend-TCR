import { MergedData } from "@/types";
import React from "react";

const Description = ({ dish }: { dish: MergedData }) => {
  return (
    <div
      className={`flex h-full w-[40%] flex-col items-center justify-start overflow-hidden`}
    >
      <p className={`text-xl text-darkPrimary`}>Description</p>
      <p className={`text-md w-full break-words text-darkParaText`}>
        {dish.description}
      </p>
    </div>
  );
};

export default Description;
