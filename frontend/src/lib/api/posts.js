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

// export const updatePost = async ({ recipeId, token, post }) => {
//   return await client.put(`/myrecipes/${recipeId}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     post,
//   });
// };

export const listPosts = async ({ token, email, tag, page }) => {
  return await client.get('/myrecipes', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { email, tag, page },
  });
};

//나중에 페이지네이션 하게된다면 email, tag, page, 값을 받아와야 할듯 email 대신에 UserId || nickName 값을 받아와도 됨
