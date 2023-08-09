import client from './client';

export const addFollow = async ({ token, followingId }) => {
  return await client({
    method: 'post',
    url: `/follow/${followingId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeFollow = async ({ token, followingId }) => {
  return await client({
    method: 'delete',
    url: `/follow/${followingId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
