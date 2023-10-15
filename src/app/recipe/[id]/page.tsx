"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { MergedData, UserData } from "@/types";
import RecipeNavbar from "@/app/components/RecipeNavbar/RecipeNavbar";
import RecipeContainer from "@/app/components/RecipeContainer/RecipeContainer";
import RecipeTitle from "@/app/components/RecipeNavbar/RecipeTitle";
import DishTypes from "@/app/components/RecipeNavbar/DishTypes";
type Image = {
  id: number;
  dish: number;
  image: string;
};
const Recipe = () => {
  const params = useParams();
  const [image, setImage] = useState<Image>();
  const [dish, setDish] = useState<MergedData>();
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/dishes/images/${params.id}/`)
      .then((response) => setImage(response.data))
      .catch((error) => console.log(error));
  }, [params.id]);
  useEffect(() => {
    if (image !== undefined) {
      axios
        .get(`http://localhost:8000/api/dishes/${image.dish}/`)
        .then((response) => {
          setDish(response.data);
        })
        .catch((error) => {
          console.error("Error fetching dish data:", error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-start gap-3 overflow-x-hidden bg-darkBackground pb-2 pl-4 pr-6 pt-2">
      {dish && (
        <>
          <RecipeTitle dish={dish} />
          <RecipeNavbar image={image} dish={dish} />
          <RecipeContainer dish={dish} />
        </>
      )}
    </div>
  );
};

export default Recipe;
