import styled from 'styled-components';
import Button from '../Button';

const CommentBox = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  gap: 5px;
`;

const CommentInputBox = styled.textarea`
  text-align: left;
  vertical-align: top;
  padding: 5px;
  width: 80%;
  height: 100%;
`;

const CommentButton = styled(Button)`
  width: 20%;
`;

const CommentInput = ({ onChange, onClick, comment }) => {
  return (
    <CommentBox>
      <CommentInputBox placeholder="후기를 입력해주세요" value={comment} onChange={onChange} />
      <CommentButton onClick={onClick}>후기입력</CommentButton>
    </CommentBox>
  );
};

export default CommentInput;
