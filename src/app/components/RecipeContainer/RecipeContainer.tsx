import { MergedData, Post } from "@/types";
import React from "react";

const RecipeContainer = ({ dish }: { dish: MergedData }) => {
  return (
    <div
      className={`mt-5 flex w-full flex-col items-center justify-center gap-5`}
    >
      <p className={`text-4xl text-darkPrimary`}>Recipe</p>
      <div
        className={`flex h-full w-full flex-col items-stretch justify-center gap-3`}
      >
        {dish.recipes.map((recipe, index) => {
          return (
            <div
              className="flex w-full items-center justify-center gap-1"
              key={index}
            >
              <p
                className={`flex w-[5%] items-center justify-center rounded-md bg-darkNavbarBackground p-3 text-xl text-darkMainText`}
              >
                {index + 1}
              </p>
              <p
                className={`flex w-[95%] rounded-md bg-darkNavbarBackground p-3 text-xl text-darkParaText`}
              >
                {recipe.recipe_text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecipeContainer;
