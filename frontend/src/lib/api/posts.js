import client from './client';

export const createPost = async ({ type,ingredients, }) => {
    return await client.post('/airecipe', { type,ingredients })};

export const readAiPost = id => client.get(`/airecipe/${id}`)
 