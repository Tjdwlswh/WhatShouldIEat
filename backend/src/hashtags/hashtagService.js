import { hashtagModel } from './hashtagModel.js';

const hashtagService = {
  addHashtags: async tags => {
    const hashtags = tags.match(/#[^\s#]*/g);
    const result = await hashtagModel.findOrCreate(hashtags);
    //해시태그 모델을 레시피모델과 연결시켜줌
    await post.addHashtags(result.map(r => r[0]));
    return result;
  },
};

export { hashtagService };
