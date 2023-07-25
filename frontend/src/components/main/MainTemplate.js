// 배경색, 박스 레이아웃
//1. 백그라운드 스타일컴포넌트 하나
//2. 그 위에  넣을 컴포넌트 하나


import styled from 'styled-components'
import Responsive from '../common/Responsive';

const MainTemplateBlock = styled.section`
    position: relative;
    display: block;
    background-color: #FFB30E !important;
    padding-top: 3rem;
    padding-bottom: 3rem;
    overflow : hidden;  
    box-sizing: border-box;
    width: 100%;
`;

const Container = styled(Responsive)`
  @media (min-width: 576px){

    margin-right: auto;
    margin-left: auto;
 
}
`;

const FlexBox = styled.div`
    @media (min-width:576px){
 
    flex-wrap: wrap;
    display: flex;
    align-items: center;
    justify-content: center;
}
`;

const MainTemplate = ({children}) => {

    return (
        <MainTemplateBlock>
            <Container>
                <FlexBox>
                {children}
                </FlexBox>
            </Container>
        </MainTemplateBlock>
    )
}

export default MainTemplate;