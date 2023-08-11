import styled from 'styled-components';

const ResponsiveBlock = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  max-width: 1024px;
  margin: 0 auto;
  font-family: 'Bricolage Grotesque', sans-serif !important;
  font-family: 'Noto Sans KR', sans-serif !important;
  @media (max-width: 1024px) {
    max-width: 100%;
  }
  @media (max-width: 768px) {
    max-width: 100%;
  }
  @media (min-width: 576px) {
    margin-right: auto;
    margin-left: auto;
  }
`;

const Responsive = ({ children, ...rest }) => {
  return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
};

export default Responsive;
