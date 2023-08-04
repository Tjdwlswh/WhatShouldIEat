import createFormData from '../utils/createFormData';
import client from './client';

export const createPost = async ({ type, ingredients, aiRecipeId, token }) => {
  return await client.post(
    '/airecipe',
    { type, ingredients, aiRecipeId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const savePost = async ({
  foodname,
  ingredients,
  recipe,
  tags,
  aiRecipeId,
  image,
  token,
}) => {
  const formData = createFormData({
    foodname,
    ingredients,
    recipe,
    tags,
    aiRecipeId,
    image,
  });
  return await client.post('/myrecipes', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const readPost = async ({ recipeId, token }) => {
  return await client.get(`/recipes/${recipeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

///recipes/:recipeId
