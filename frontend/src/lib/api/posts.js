import client from './client';

export const createPost = ({ tags }) => client.post('경로', { tags });
