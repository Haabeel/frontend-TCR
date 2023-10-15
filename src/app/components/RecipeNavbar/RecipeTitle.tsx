import { MergedData } from "@/types";
import React from "react";

const RecipeTitle = ({ dish }: { dish: MergedData }) => {
  return (
    <h1
      className={`flex flex-col items-center justify-center text-8xl uppercase tracking-wider text-darkMainText`}
    >
      <p>{dish.name}</p>
      <div className="flex items-center justify-center gap-3">
        <p className="text-xl lowercase tracking-normal">
          @{dish.host.username}{" "}
          {dish.host.first_name && dish.host.last_name !== "" ? "|" : ""}
        </p>
        <p className="text-xl lowercase tracking-normal">
          {dish.host.first_name}
        </p>
        <p className="text-xl lowercase tracking-normal">
          {dish.host.last_name}
        </p>
      </div>
    </h1>
  );
};

export default RecipeTitle;
