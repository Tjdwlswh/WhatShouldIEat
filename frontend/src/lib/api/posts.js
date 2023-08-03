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

export const readAiPost = id => client.get(`/airecipe/${id}`);
