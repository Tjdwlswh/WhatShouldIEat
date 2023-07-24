import styled, {css} from 'styled-components';
import palette from '../../lib/styles/palette'
import {Link} from 'react-router-dom'


const buttonStyle = css`
    border: none;
    border-radius: 4px;
    font-size : 1rem;
    font-weight : bold;
    padding : 0.25rem 1rem;
    color : white;
    outline : none;
    cursor : pointer;

    background : ${palette.gray[8]};
    &:hover {
        background : ${palette.gray[6]}
    }
    ${props => props.fullWidth && 
    css`
    padding-top : 0.75rem;
    padding-bottom : 0.75rem;
    width: 100%;
    font-size: 1.125rem;
    `}
    
    ${props => props.cyan && 
    css`
    background : ${palette.gray[9]};
    &:hover {
        background: ${palette.gray[7]};
    }
    `}

`;

const StyledButton = styled.button`
${buttonStyle}`

const StyledLink = styled(Link)`
${buttonStyle}`

const Button = props => {
    return props.to ? (
        <StyledLink {...props} cyan={props.cyan ? 1 : 0} ></StyledLink> 
    ) : (
        <StyledButton {...props} ></StyledButton> 
    )
    

}


export default Button