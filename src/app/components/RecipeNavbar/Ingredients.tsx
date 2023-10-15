import { MergedData } from "@/types";
import React, { Fragment } from "react";

const Ingredients = ({ dish }: { dish: MergedData }) => {
  return (
    <div
      className={`flex h-[40vh] w-[40%]  flex-col items-center justify-center overflow-hidden`}
    >
      <p className={`text-xl text-darkPrimary`}>Ingredients</p>
      <div
        className={`grid h-2/3 w-full grid-cols-[1fr_3fr_2fr_2fr] place-content-center place-items-center overflow-y-auto`}
      >
        <div></div>
        {["Ingredient", "Quantity", "Unit"].map((key) => (
          <div key={key} className="text-lg text-darkMainText">
            {key}
          </div>
        ))}
        {dish.ingredients.map((ingredient, index) => (
          <Fragment key={index}>
            <div className="text-lg text-darkParaText">{index + 1}</div>
            <div className="text-lg text-darkParaText">
              {ingredient.ingredient}
            </div>
            <div className="text-lg text-darkParaText">
              {ingredient.quantity}
            </div>
            <div className="text-lg text-darkParaText">{ingredient.units}</div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Ingredients;
