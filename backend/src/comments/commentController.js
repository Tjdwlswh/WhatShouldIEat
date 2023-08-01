import { commentService } from './commentService.js';

const commentController = {
  addComment: async (req, res, next) => {
    try {
      //유저 아이디로 정보 불러와서 닉네임,댓글, 생성일 보여주기
      const commenterId = req.user.id;
      const RecipeId = req.params.recipeId;
      const { comment } = req.body;
      const userNickName = req.user.nickName;
      const newComment = await commentService.addComment({ comment, RecipeId, commenterId });
      const commentInfo = { newComment, userNickName };
      return res.status(201).json(commentInfo);
    } catch (err) {
      next(err);
    }
  },
};

export { commentController };
