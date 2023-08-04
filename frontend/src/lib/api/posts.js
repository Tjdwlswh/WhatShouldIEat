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

export const savePost = async ({ foodname, ingredients, recipe, tags, aiRecipeId, token }) => {
  return await client.post(
    '/myrecipes',
    { foodname, ingredients, recipe, tags, aiRecipeId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const readPost = async ({ recipeId, token }) => {
  return await client.get(`/recipes/${recipeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listPosts = async ({ token }) => {
  return await client.get('/myrecipes', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
