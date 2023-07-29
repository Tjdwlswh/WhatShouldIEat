import axios from 'axios';

const getAiRecipe = async ingredient => {
  console.log('AI 서버 레시피 생성 요청');
  const url = `${process.env.AI_URL}/recipe`;
  return axios.post(url, ingredient);
};

export { getAiRecipe };
