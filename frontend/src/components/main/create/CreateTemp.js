import styled from 'styled-components';
import Responsive from '../../common/Responsive';

const CreateTempBlock = styled.section`
  background-color: #eee;
  width: 100%;
  padding: 3rem;
  background-image: url('recipe.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center 60%;
`;

const Container = styled(Responsive)``;

const FlexBox = styled.div`
  @media (min-width: 576px) {
  }
`;

const CreateTemp = ({ children }) => {
  return (
    <CreateTempBlock>
      <Container>
        <FlexBox>{children}</FlexBox>
      </Container>
    </CreateTempBlock>
  );
};

export default CreateTemp;
