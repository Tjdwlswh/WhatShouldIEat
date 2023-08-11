import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import MiniProfileCardContainer from '../../../container/common/MiniProfileCardContainer';
import AskModal from '../AskModal';

const CommentBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  border: 1px solid ${palette.text};
  border-radius: 10px;
  justify-content: space-between;
  color: ${palette.text};
  padding: 5px;
`;

const CommentTextBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  font-size: 1.5rem;
  padding: 0 0.5rem;
`;

const CommentConfigBox = styled.div`
  position: relative;
  top: 0;
  display: flex;
  flex-direction: row;
`;

const CommentCreateDate = styled.p`
  padding: 1px;
  font-size: 0.75rem;
  color: ${palette.text};
`;

const DeleteButton = styled.div`
  cursor: pointer;
`;

const CommentList = ({ comments, userId, onClickDelete, visible, onConfirm, onCancel }) => {
  return (
    <>
      {comments.map(comment => (
        <CommentBox key={comment.id}>
          <MiniProfileCardContainer userId={comment.commenterId} />
          <CommentTextBox>{comment.comment}</CommentTextBox>
          <CommentConfigBox>
            <CommentCreateDate>
              {new Date(comment.createdAt).toLocaleDateString()}
            </CommentCreateDate>
            {userId === comment.commenterId && (
              <DeleteButton onClick={() => onClickDelete(comment.id)}>🗑️</DeleteButton>
            )}
          </CommentConfigBox>
        </CommentBox>
      ))}
      <AskModal
        visible={visible}
        title="후기 삭제"
        description="후기를 정말 삭제하시겠습니까?"
        confirmText="삭제"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  );
};

export default CommentList;
