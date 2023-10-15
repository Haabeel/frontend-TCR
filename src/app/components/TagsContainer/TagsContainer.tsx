import { DishType, IngredientType } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const TagsContainer = ({
  ingredients,
  dishTypes,
}: {
  ingredients: IngredientType;
  dishTypes: DishType;
}) => {
  const [ingredientSearch, setIngredientSearch] = useState(ingredients);
  const [dishTypeSearch, setDishTypeSearch] = useState(dishTypes);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery.toLowerCase());
  };

  useEffect(() => {
    if (ingredients) {
      setIngredientSearch(
        ingredients.filter((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(searchQuery),
        ),
      );
    }
    if (dishTypes) {
      setDishTypeSearch(
        dishTypes.filter((dishType) =>
          dishType.dish_type.toLowerCase().includes(searchQuery),
        ),
      );
    }
  }, [ingredients, searchQuery, dishTypes]);

  return (
    <div className="flex flex-col items-center gap-3 overflow-y-auto rounded-md bg-darkSidebarBackground Lmobile:h-[70vh] Lmobile:w-[15%]">
      <nav className="flex flex-col items-center gap-2">
        <p className="p-1 text-center text-darkMainText">Filter by Tags</p>
        <input
          onChange={(e) => handleSearch(e)}
          type="text"
          placeholder="search"
          className="h-6 w-3/4 rounded-md bg-darkSecondary p-2 text-darkAccent transition duration-300 ease-in-out placeholder:text-darkPrimary focus:outline-none placeholder:focus:text-transparent"
        />
      </nav>
      {ingredients && dishTypes && (
        <div className={`flex flex-col gap-2 text-darkMainText`}>
          <p className={`text-center text-lg text-darkMainText`}>Ingredients</p>
          <div className={`grid grid-cols-2 gap-2`}>
            {ingredientSearch &&
              ingredientSearch.length > 0 &&
              ingredientSearch.map((ingredient: any) => {
                return (
                  <p
                    key={ingredient.id}
                    className={`cursor-pointer rounded-md bg-darkSecondary p-1 text-center`}
                  >
                    {ingredient.ingredient}
                  </p>
                );
              })}
          </div>
          <p className={`text-center text-lg text-darkMainText`}>Dish types</p>
          <div className={`grid grid-cols-2 gap-2`}>
            {dishTypeSearch &&
              dishTypeSearch.length > 0 &&
              dishTypeSearch.map((dishType: any) => {
                return (
                  <p
                    key={dishType.id}
                    className={`cursor-pointer rounded-md bg-darkSecondary p-1 text-center`}
                  >
                    {dishType.dish_type}
                  </p>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagsContainer;
