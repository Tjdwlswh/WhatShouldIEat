import styled from 'styled-components';
import CommentContatiner from '../../../container/common/CommentContainer';

const Container = styled.div`
  width: 100%;
  margin-top: 1.25rem;
  @media (min-width: 576px) {
    margin-right: auto;
    margin-left: auto;
  }
`;

const FlexBox = styled.div`
  @media (min-width: 576px) {
    flex-wrap: wrap;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1px;
  }
`;

const CommentTemp = () => {
  return (
    <Container>
      <FlexBox>
        <CommentContatiner />
      </FlexBox>
    </Container>
  );
};

export default CommentTemp;
