import styled from 'styled-components';
import Responsive from '../../common/Responsive';

const Recommendblock = styled.section`
  background-color: #eee;
  width: 100%;
  padding-top: 3rem;
`;

const Container = styled(Responsive)`
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
  }
`;

const RecommendTemp = ({ children }) => {
  return (
    <Recommendblock>
      <Container>
        <FlexBox>{children}</FlexBox>
      </Container>
    </Recommendblock>
  );
};

export default RecommendTemp;
