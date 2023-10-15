"use client";

import Image from "next/image";
import defaultImg from "@/assets/images/FaviconTransparent.png";
import { useEffect, useState } from "react";
import Link from "next/link";

interface MyType {
  id: number;
  dish: number;
  image: string;
}

function findImageIdAndIndex(
  data: MyType[],
  targetDishId: number,
): { index: number; imageId: string } | null {
  for (let index = 0; index < data.length; index++) {
    if (data[index].dish === targetDishId) {
      return { index, imageId: data[index].image };
    }
  }
  return null;
}

const DishCard = ({ dish, imgData }: { dish: any; imgData: any }) => {
  const [image, setImage] = useState<{
    index: number;
    imageId: string;
  } | null>();
  useEffect(() => {
    setImage(findImageIdAndIndex(imgData as MyType[], dish.id));
  }, [dish.id, imgData]);
  return (
    <Link
      href={`${image ? `/recipe/${imgData[image?.index as number].id}` : "/"}`}
      className=" flex h-full w-full flex-col items-center gap-3 rounded-md bg-darkSecondary p-3"
    >
      <Image
        src={!image ? defaultImg : imgData[image.index].image}
        alt="dish image"
        className="h-3/5 w-auto rounded-md"
        height={800}
        width={900}
        priority
      />

      <p className="text-lg text-darkPrimary">@{dish.host.username}</p>
      <p className="text-xl text-darkMainText">{dish.name}</p>
      <p className="w-full break-words p-1 text-center text-lg text-darkParaText">
        {dish.description}
      </p>
      <p className="text-lg text-darkMainText">
        Difficulty: {dish.dish_difficulty}
      </p>
    </Link>
  );
};

export default DishCard;
