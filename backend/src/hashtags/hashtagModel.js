import { db } from '../../models/index.js';
import { Sequelize } from 'sequelize';

const hashtagModel = {
  findOrCreate: async hashtags => {
    const result = await Promise.all(
      hashtags.map(tag => {
        return db.Hashtag.findOrCreate({
          where: { tag: tag.slice(1).toLowerCase() },
        });
      }),
    );
    return result;  
  },
};

export { hashtagModel };
