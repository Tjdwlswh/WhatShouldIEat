import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  box-shadow: 0 4px 8px 1px rgba(0, 0, 0, 0.3);

  background: ${palette.gray[8]};

  &:hover {
    box-shadow:
      4px 4px 6px 0 rgba(255, 255, 255, 0.5),
      -4px -4px 6px 0 rgba(116, 125, 136, 0.5),
      inset -4px -4px 6px 0 rgba(255, 255, 255, 0.2),
      inset 4px 4px 6px 0 rgba(0, 0, 0, 0.4);
  }
  &:active {
    position: relative;
    top: 1px;
  }

  ${props =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      display: block;
      font-size: 1.125rem;
      &:active {
        position: relative;
        top: 2px;
      }
    `}

  ${props =>
    props.cyan &&
    css`
      background: ${palette.gray[9]};
      &:hover {
        background: ${palette.gray[7]};
      }
    `}
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const Button = props => {
  return props.to ? (
    <StyledLink {...props} cyan={props.cyan ? 1 : 0}></StyledLink>
  ) : (
    <StyledButton {...props}></StyledButton>
  );
};

export default Button;
