import styled from "styled-components";
import Responsive from "../../common/Responsive";


const MyRecipeblock = styled.section`
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
 
    flex-wrap: wrap;
    display: flex;
    align-items: center;
    justify-content: center;
}
`;


const MyRecipeTemp = ({children}) => {

    return (
        <MyRecipeblock>
            <Container>
                <FlexBox>
                {children}  
                </FlexBox>
            </Container>
        </MyRecipeblock>
    )
}

export default MyRecipeTemp;