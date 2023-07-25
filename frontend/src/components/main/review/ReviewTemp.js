import styled from "styled-components";
import Responsive from "../../common/Responsive";

const ReviewBlock = styled.section`
    background-color: #eee;
    width: 100%;
    padding-top: 3rem;
`

const Container = styled(Responsive)`
  @media (min-width: 576px){

    margin-right: auto;
    margin-left: auto;
 
}
`;

const FlexBox = styled.div`
    @media (min-width:576px){
        
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}
`;



const ReviewTemp = ({children}) => {

    return (
        <ReviewBlock>
            <Container>
                <FlexBox>
                {children}  
                </FlexBox>
            </Container>
        </ReviewBlock>
    )
}

export default ReviewTemp;