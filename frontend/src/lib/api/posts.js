import client from './client';

export const createPost = async ({ type,ingredients, }) => {
    return await client.post('/airecipe', { type,ingredients })};
