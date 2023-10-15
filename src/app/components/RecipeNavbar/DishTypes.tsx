import { MergedData } from "@/types";
import React from "react";

const DishTypes = ({ dish }: { dish: MergedData }) => {
  return (
    <div
      className={`flex h-1/3 w-full flex-row flex-wrap items-center gap-3 overflow-x-auto overflow-y-hidden rounded bg-darkNavbarBackground px-3 py-1`}
    >
      <div className="flex items-center justify-center gap-3">
        <p className={`text-xl text-darkPrimary`}>Dish type</p>
        <div className={`flex items-center justify-center gap-1`}>
          {dish.dish_type.map((type) => {
            return (
              <div
                className={`w-full rounded-md bg-darkSecondary p-1 text-center text-lg text-darkParaText`}
                key={type.dish_type}
              >
                {type.dish_type}
              </div>
            );
          })}
        </div>
      </div>
      <p
        className={`flex items-center justify-center gap-1 text-lg text-darkPrimary`}
      >
        Difficulty:{" "}
        <span className={`text-md text-darkParaText`}>
          {dish.dish_difficulty}
        </span>
      </p>
    </div>
  );
};

export default DishTypes;
