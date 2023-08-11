import styled from 'styled-components';
import Responsive from '../../common/Responsive';

const CreateAiReturnTempBlock = styled.section`
  background-color: #eee;
  width: 100%;
  padding: 3rem;
`;

const Container = styled(Responsive)``;

const FlexBox = styled.div`
  @media (min-width: 576px) {
  }
`;

const CreateAiReturnTemp = ({ children }) => {
  return (
    <CreateAiReturnTempBlock>
      <Container>
        <FlexBox>{children}</FlexBox>
      </Container>
    </CreateAiReturnTempBlock>
  );
};

export default CreateAiReturnTemp;
