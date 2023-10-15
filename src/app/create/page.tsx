"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import "@/app/globals.css";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ingredient {
  value: string;
  quantity: number;
  unit: string;
}

interface Post {
  dish_type: { dish_type: string }[];
  recipes: { recipe_text: string }[];
  ingredients: { ingredient: string; quantity: number; units: string }[];
  name: string;
  description: string;
  dish_difficulty: number;
}

const Create = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [darkmode, setDarkmode] = useState(false);
  const [inputValues, setInputValues] = useState("");
  const [radioNum, setRadioNum] = useState(1);
  const [typeInput, setTypeInput] = useState("");
  const [text, setText] = useState("");
  const [dishTypes, setDishTypes] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<File>();
  const [typeIngredients, setTypeIngredients] = useState<ingredient>({
    value: "",
    quantity: 0,
    unit: "",
  });
  const [ingredients, setIngredients] = useState<ingredient[]>([]);
  const [typeRecipe, setTypeRecipe] = useState("");
  const [recipes, setRecipes] = useState<string[]>([]);
  const [post, setPost] = useState<Post>({
    name: "",
    description: "",
    dish_difficulty: 1,
    dish_type: [],
    ingredients: [],
    recipes: [],
  });
  const characterLimit = 500;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setType: (args0: string) => void,
    type: string | number | ingredient[] | string[],
  ) => {
    const { name, value } = e.target;
    setType(value);
    if (name === "name" && typeof type === "string") {
      setPost((prevPost) => ({
        ...prevPost,
        name: type,
      }));
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    setSelectedImage(file);
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    if (inputText.length <= characterLimit) {
      setText(inputText);
    }
    setPost((prevPost) => ({
      ...prevPost,
      description: text,
    }));
  };

  const handleIngredientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTypeIngredients({
      ...typeIngredients,
      [name]: value,
    });
  };

  const handleAdd = (
    TypeInputfunc: (arg0: string) => void,
    currentState: string[],
    setStateFunction: (arg0: string[]) => void,
    value: string,
    remove = false,
    name: string,
    nestText: string,
  ) => {
    if (value === "") return;
    if (currentState.includes(value)) {
      TypeInputfunc("");
      return;
    }
    updateState(currentState, setStateFunction, value, remove, name, nestText);
    TypeInputfunc("");
  };

  const handleIngredientAdd = () => {
    const contains = () => {
      for (const ingredient of ingredients) {
        if (
          ingredient.value.toLowerCase() === typeIngredients.value.toLowerCase()
        )
          return true;
        continue;
      }
      return false;
    };
    if (
      typeIngredients.value === "" ||
      typeIngredients.quantity === 0 ||
      typeIngredients.unit === "" ||
      contains()
    ) {
      setTypeIngredients({ value: "", quantity: 0, unit: "" });
      return;
    }

    setIngredients([...ingredients, typeIngredients]);
    setTypeIngredients({ value: "", quantity: 0, unit: "" });

    const _ingredients = ingredients.map((ingredient) => ({
      ingredient: ingredient.value,
      quantity: ingredient.quantity,
      units: ingredient.unit,
    }));

    setPost((prevPost) => ({
      ...prevPost,
      ingredients: _ingredients,
    }));
  };

  const handleDelete = (
    state: string[],
    setState: (args0: string[]) => void,
    value: string,
    remove = false,
    name: string,
    nestText: string,
  ) => {
    updateState(state, setState, value, remove, name, nestText);
  };

  const handleIngredientRemove = (nameToDelete: string) => {
    const updatedIngredients = ingredients.filter(
      (ingredient) => ingredient.value !== nameToDelete,
    );
    setIngredients(updatedIngredients);

    const _ingredients = ingredients.map((ingredient) => ({
      ingredient: ingredient.value,
      quantity: ingredient.quantity,
      units: ingredient.unit,
    }));

    setPost((prevPost) => ({
      ...prevPost,
      ingredients: _ingredients,
    }));
    console.log(post);
  };

  const updateState = (
    currentState: string[],
    setStateFunction: (arg0: string[]) => void,
    value: string,
    remove = false,
    name: string,
    nestText: string,
  ) => {
    if (remove) {
      const updatedList = currentState.filter((item) => item !== value);
      setStateFunction(updatedList);
    } else {
      setStateFunction([...currentState, value]);
    }

    const _currentState = currentState.map((state) => ({
      [nestText]: state,
    }));
    setPost((prevPost) => ({
      ...prevPost,
      [name]: _currentState,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!post) return;
    if (
      post.name === "" ||
      post.description === "" ||
      post.dish_difficulty === 1 ||
      post.dish_type.length === 0 ||
      post.ingredients.length === 0 ||
      post.recipes.length === 0 ||
      selectedImage === undefined
    ) {
      alert("Please fill in all the fields before submitting.");
    } else {
      axios
        .post("http://localhost:8000/api/dishes/", post, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then(async (request) => {
          const formData = new FormData();
          formData.append("dish", request.data.id);
          formData.append("image", selectedImage as File);
          axios
            .post("http://localhost:8000/api/dishes/images/", formData, {
              headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((request) => router.push(`recipe/${request.data.id}`))
            .catch((error) => console.log(error.response));
        })
        .catch((error) => console.log(error.response.data));
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setDarkmode(JSON.parse(localStorage.getItem("darkMode") as string));
    if (!isLoading) {
      if (!token) {
        router.push("/");
      }
    }
  }, [isLoading, router, token]);

  useEffect(() => {
    const _ingredients = ingredients.map((ingredient) => ({
      ingredient: ingredient.value,
      quantity: ingredient.quantity,
      units: ingredient.unit,
    }));

    const _dishTypes = dishTypes.map((dish) => ({
      dish_type: dish,
    }));

    const _recipes = recipes.map((recipe) => ({
      recipe_text: recipe,
    }));

    setPost({
      name: inputValues,
      dish_difficulty: radioNum,
      dish_type: _dishTypes,
      ingredients: _ingredients,
      recipes: _recipes,
      description: text,
    });
  }, [dishTypes, ingredients, inputValues, radioNum, recipes, text]);

  return (
    <div className="flex min-h-screen min-w-full flex-col items-center justify-start gap-10 overflow-x-hidden bg-darkBackground">
      <h1 className="h-[10vh] text-7xl tracking-wider text-darkMainText">
        Create Post
      </h1>
      <form
        encType="multipart/form-data"
        className="grid h-screen w-screen grid-cols-2 place-items-center gap-3 px-20"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-darkNavbarBackground p-0">
          <label htmlFor={"name"} className={`text-lg text-darkMainText`}>
            Dish name
          </label>
          <input
            id={"name"}
            type={"text"}
            name={"name"}
            value={inputValues}
            onChange={(e) => handleChange(e, setInputValues, inputValues)}
            className={`h-10 w-2/3 rounded-md bg-darkSecondary p-2 text-darkAccent placeholder:text-darkPrimary focus:outline-none placeholder:focus:text-transparent`}
          />
        </div>
        <div
          className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-darkNavbarBackground`}
        >
          <p className={`text-lg text-darkMainText`}>Difficulty</p>
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className={`text-md flex h-10 w-10 items-center justify-center rounded-md ${
                  num === radioNum
                    ? "bg-darkButtons text-darkSecondary"
                    : "bg-darkSecondary text-darkPrimary"
                } cursor-pointer hover:bg-darkButtons hover:text-darkSecondary `}
                onClick={() => {
                  setRadioNum(num);
                  setPost((prevPost) => ({
                    ...prevPost,
                    dish_difficulty: radioNum,
                  }));
                }}
              >
                {num}
              </div>
            ))}
          </div>
        </div>
        <div
          className={`row-span-6 flex h-full w-full flex-col items-center justify-start gap-2 bg-darkNavbarBackground p-2`}
        >
          <p className={`text-lg text-darkMainText`}>Dish type</p>
          <div className="flex items-center justify-center gap-2">
            <input
              type="text"
              name="dish_type"
              value={typeInput}
              onChange={(e) => handleChange(e, setTypeInput, typeInput)}
              className={`rounded-md bg-darkSecondary p-2 lowercase text-darkAccent placeholder:text-darkPrimary focus:outline-none placeholder:focus:text-transparent`}
            />
            <button
              type="button"
              className={`h-10 w-14 rounded-md bg-darkSecondary text-darkPrimary hover:bg-darkButtons hover:text-darkSecondary`}
              onClick={() =>
                handleAdd(
                  setTypeInput,
                  dishTypes,
                  setDishTypes,
                  typeInput,
                  false,
                  "dish_type",
                  "dish_type",
                )
              }
            >
              Add
            </button>
          </div>
          <p className="text-sm text-darkMainText">click to remove</p>
          <div
            className={`grid h-full w-full grid-cols-5 gap-1 overflow-y-auto rounded-md border-2 border-darkAccent`}
          >
            {dishTypes?.map((type) => (
              <div
                onClick={() =>
                  handleDelete(
                    dishTypes,
                    setDishTypes,
                    type,
                    true,
                    "dish_type",
                    "dish_type",
                  )
                }
                key={type}
                className="flex cursor-pointer items-center justify-center gap-1 rounded-md bg-darkSecondary p-2 text-darkParaText"
              >
                {type}
              </div>
            ))}
          </div>
        </div>
        <div
          className={`row-span-6 flex h-full w-full flex-col items-center justify-start gap-2 bg-darkNavbarBackground p-2`}
        >
          <p className={`text-lg text-darkMainText`}>Ingredients</p>
          <div className="flex items-center justify-center gap-2">
            <input
              type="text"
              name="value"
              id="type"
              value={typeIngredients.value}
              placeholder="ingredient"
              onChange={(e) => handleIngredientChange(e)}
              className={`rounded-md bg-darkSecondary p-2 lowercase text-darkAccent placeholder:text-darkPrimary focus:outline-none placeholder:focus:text-transparent`}
            />
            <input
              type="number"
              min={0}
              name="quantity"
              value={
                typeIngredients.quantity === 0 ? "" : typeIngredients.quantity
              }
              placeholder="quantity"
              onChange={(e) => handleIngredientChange(e)}
              className={`} rounded-md bg-darkSecondary      p-2 lowercase text-darkAccent placeholder:text-darkPrimary focus:outline-none placeholder:focus:text-transparent`}
            />
            <input
              type="text"
              name="unit"
              value={typeIngredients.unit}
              placeholder="unit"
              onChange={(e) => handleIngredientChange(e)}
              className={`} rounded-md bg-darkSecondary      p-2 lowercase text-darkAccent placeholder:text-darkPrimary focus:outline-none placeholder:focus:text-transparent`}
            />
            <button
              type="button"
              className={`h-10 w-14 rounded-md bg-darkSecondary text-darkPrimary hover:bg-darkButtons hover:text-darkSecondary`}
              onClick={() => handleIngredientAdd()}
            >
              Add
            </button>
          </div>
          <p className="text-sm text-darkMainText">click to remove</p>
          <div
            className={`grid h-full w-full grid-cols-1 place-content-start rounded-md border-2 border-darkAccent `}
          >
            {ingredients?.map((ingredient, index) => (
              <div
                onClick={() => handleIngredientRemove(ingredient.value)}
                key={index}
                className="flex w-full cursor-pointer items-center justify-center gap-1 rounded-md p-2 text-darkParaText"
              >
                <p className="flex w-1/4 cursor-pointer items-center justify-center rounded-md bg-darkSecondary p-2 text-darkParaText">
                  {index + 1}
                </p>
                <p className="flex w-full cursor-pointer items-center justify-center rounded-md bg-darkSecondary p-2 text-darkParaText">
                  {ingredient.value}
                </p>
                <p className="flex w-full cursor-pointer items-center justify-center rounded-md bg-darkSecondary p-2 text-darkParaText">
                  {ingredient.quantity}
                </p>
                <p className="flex w-full cursor-pointer items-center justify-center rounded-md bg-darkSecondary p-2 text-darkParaText">
                  {ingredient.unit}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`flex h-full w-full flex-col items-center justify-start gap-2 bg-darkNavbarBackground p-2`}
        >
          <label
            htmlFor="picture"
            className={`flex h-10 w-2/3 cursor-pointer items-center justify-center rounded-md bg-darkSecondary text-lg tracking-wide text-darkPrimary`}
          >
            {selectedImage ? "Change the image" : "Add an image"}
          </label>
          <input
            type="file"
            name="picture"
            id="picture"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          {selectedImage && (
            <>
              <p className="text-md text-white">{selectedImage.name}</p>
              <button
                type="button"
                onClick={() => setSelectedImage(undefined)}
                className="h-10 w-2/3 rounded-md bg-darkSecondary text-darkPrimary hover:bg-darkButtons hover:text-darkSecondary"
              >
                Remove
              </button>
            </>
          )}
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-darkNavbarBackground p-0">
          <label htmlFor="description" className={`text-lg text-darkMainText`}>
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={text}
            onChange={(e) => handleTextareaChange(e)}
            className={`text-md h-32 w-2/3 resize-none rounded-md bg-darkSecondary p-2 text-darkParaText focus:outline-none placeholder:focus:text-transparent`}
          />
          <p className="text-gray-500">
            {characterLimit - text.length} characters remaining
          </p>
        </div>
        <div className="col-span-2 flex h-full w-full flex-col items-center justify-center bg-darkNavbarBackground p-2">
          <p className={`text-lg text-darkMainText`}>Recipe</p>
          <div className="flex h-full w-full items-center justify-center gap-2">
            <input
              type="text"
              name="recipe"
              value={typeRecipe}
              placeholder="recipe"
              onChange={(e) => handleChange(e, setTypeRecipe, typeRecipe)}
              className={`w-full rounded-md bg-darkSecondary p-2 lowercase text-darkAccent placeholder:text-darkPrimary focus:outline-none placeholder:focus:text-transparent`}
            />
            <button
              type="button"
              className={`h-10 w-14 rounded-md bg-darkSecondary text-darkPrimary hover:bg-darkButtons hover:text-darkSecondary`}
              onClick={() =>
                handleAdd(
                  setTypeRecipe,
                  recipes,
                  setRecipes,
                  typeRecipe,
                  false,
                  "recipes",
                  "recipe_text",
                )
              }
            >
              Add
            </button>
          </div>
          <p className="text-sm text-darkMainText">click to remove</p>
          <div
            className={`grid h-full w-full grid-cols-1 place-content-start `}
          >
            {recipes.map((recipe, index) => (
              <div
                key={index}
                onClick={() =>
                  handleDelete(
                    recipes,
                    setRecipes,
                    recipe,
                    true,
                    "recipes",
                    "recipe_text",
                  )
                }
                className="flex w-full cursor-pointer items-center justify-center gap-1 rounded-md p-2 text-darkParaText"
              >
                <p className="flex w-1/4 cursor-pointer items-center justify-center rounded-md bg-darkSecondary p-2 text-darkParaText">
                  {index + 1}
                </p>
                <p className="flex w-full cursor-pointer items-center justify-center rounded-md bg-darkSecondary p-2 text-darkParaText">
                  {recipe}
                </p>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="col-span-2 w-full rounded-md bg-darkSecondary text-3xl tracking-wider text-darkPrimary hover:bg-darkButtons hover:text-darkSecondary"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default Create;
