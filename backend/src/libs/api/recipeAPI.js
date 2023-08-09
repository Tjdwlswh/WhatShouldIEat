import axios from 'axios';

const getAiRecipe = async ingredient => {
  console.log('AI 서버 레시피 생성 요청');
  const url = `${process.env.AI_URL}/recipe`;
  return await axios.post(url, ingredient, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export { getAiRecipe };
