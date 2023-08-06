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
