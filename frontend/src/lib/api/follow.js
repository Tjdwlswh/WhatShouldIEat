import client from './client';

export const follow = async ({ token, followingId }) => {
  return await client.get(`/follow/${followingId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
