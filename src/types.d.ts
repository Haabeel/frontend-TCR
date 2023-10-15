export type UserData = {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  pk: number;
};

type DishType = { dish_type: string }[];
type RecipeType = { recipe_text: string }[];
export type IngredientType = {
  ingredient: string;
  quantity: number;
  units: string;
}[];

type Post = {
  id: number;
  dish_type: DishType;
  recipes: RecipeType;
  ingredients: IngredientType;
  name: string;
  description: string;
  dish_difficulty: number;
};

type HostData = {
  username: string;
  first_name: string;
  last_name: string;
};

type DishData = {
  host: HostData;
};

export type MergedData = DishData & Post;
