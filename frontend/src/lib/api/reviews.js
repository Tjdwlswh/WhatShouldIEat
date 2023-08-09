import client from './client';

export const readReview = async ({ token, page }) => {
  return await client.get(`/comments/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
    },
  });
};

export const readMyRecipeReview = async ({ token, page }) => {
  return await client.get(`/comments/received`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
    },
  });
};

export const writeReview = async ({ token, recipeId, recipeUserId, comment }) => {
  return await client.post(
    `/comments/${recipeId}`,
    {
      comment,
      recipeUserId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const deleteReview = async ({ token, recipeId, commentId }) => {
  return await client.delete(`/comments/${recipeId}/${commentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
