import styled from 'styled-components';
import Button from '../../common/Button';
import palette from '../../../lib/styles/palette';

const ToggleBox = styled.div`
  width: 30rem;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  box-shadow: 0 4px 8px 1px rgba(0, 0, 0, 0.3);
  margin-bottom: 1rem;
  ${props =>
    props.myComment
      ? `#mycomment {
            color: ${palette.gray[8]};
            background-color: ${palette.main};
            pointer-events: none;
          }`
      : `#myrecipe {
            color: ${palette.gray[8]};
            background-color: ${palette.main};
            pointer-events: none;
          }`};
`;

const ToggleSwitch = styled(Button)`
  border-radius: 0px;
`;

const ToggleButton = ({ myComment, setMyComment, setPage }) => {
  const handleClickMyComment = () => {
    setPage(1);
    setMyComment(true);
  };
  const handleClickMyRecipeComment = e => {
    setPage(1);
    setMyComment(false);
  };
  return (
    <ToggleBox myComment={myComment}>
      <ToggleSwitch id="mycomment" onClick={handleClickMyComment} fullWidth={true}>
        내가 남긴 후기
      </ToggleSwitch>
      <ToggleSwitch id="myrecipe" onClick={handleClickMyRecipeComment} fullWidth={true}>
        내 요리에 남겨진 후기
      </ToggleSwitch>
    </ToggleBox>
  );
};

export default ToggleButton;
