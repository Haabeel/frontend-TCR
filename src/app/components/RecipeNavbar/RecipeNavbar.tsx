import React from "react";
import Image from "next/image";
import { MergedData } from "@/types";
import Ingredients from "./Ingredients";
import DishTypes from "./DishTypes";
import Description from "./Description";

type Image = {
  id: number;
  dish: number;
  image: string;
};

const RecipeNavbar = ({
  image,
  dish,
}: {
  image: Image | undefined;
  dish: MergedData;
}) => {
  return (
    <div
      className={`flex h-[50vh] w-full items-center justify-around gap-3 overflow-hidden rounded-md`}
    >
      {image && (
        <Image
          src={image.image}
          height={800}
          width={700}
          className={`h-full w-1/3 rounded-md`}
          alt="dish Image"
          priority
        />
      )}
      <div className="flex h-full w-2/3 flex-col gap-2">
        <div className="flex h-2/3 w-full items-start justify-between overflow-hidden rounded-md bg-darkNavbarBackground p-3">
          <Ingredients dish={dish} />
          <Description dish={dish} />
        </div>
        <DishTypes dish={dish} />
      </div>
    </div>
  );
};

export default RecipeNavbar;
