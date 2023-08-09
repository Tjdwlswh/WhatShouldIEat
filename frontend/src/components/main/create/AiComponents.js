import styled from 'styled-components';
import palette from '../../../lib/styles/palette';

export const TagBoxBlock = styled.div`
  width: 100%;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TagForm = styled.form`
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  width: 256px;
  border: 1px solid ${palette.gray[9]};
  margin-top: 1rem;
  input,
  button {
    outline: none;
    border: none;
    font-size: 1rem;
  }

  input {
    padding: 0.5rem;
    flex: 1;
    min-width: 0;
  }
  button {
    cursor: pointer;
    padding-left: 1rem;
    padding-right: 1rem;
    border: none;
    background: ${palette.gray[8]};
    color: white;
    font-weight: bold;
    &:hover {
      background: ${palette.gray[6]};
    }
  }
`;

export const TagListBlock = styled.div`
  display: flex;
  margin-top: 0%.5rem;
`;

export const Tag = styled.div`
  margin-right: 0.5rem;
  color: ${palette.gray[9]};
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
    color: ${palette.gray[7]};
  }
`;

export const CreateAireturnBlock = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const AiReturnbox = styled.div`
  width: 70%;
  background-color: ${palette.gray[3]};
  padding: 1rem 3rem;
  display: flex;
  flex-direction: column;

  h3 {
    width: 100%;
    background-color: #e8eaf6;
    display: block;
    font-size: 1.5;
    height: 3rem;
    line-height: 1.7;
  }

  .one {
    min-height: 3rem;
    margin-top: 2rem;
    width: 100%;
    background-color: #e8eaf6;
  }

  .two {
    margin-top: 3rem;
    min-height: 6rem;
    width: 100%;
    background-color: #e8eaf6;
  }

  .three {
    width: 100%;
    height: 2rem;
    display: flex;
    justify-content: center;
  }

  .divbox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 0 solid #e0e0e0;
  }

  .twobtn {
    margin-top: 1rem;
    text-align: center;
    width: 100%;
  }

  .margin {
    margin-right: 0.5rem;
  }
`;
