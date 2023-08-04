import Button from '../../common/Button';
import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  CreateAireturnBlock,
  AiReturnbox,
  TagBoxBlock,
  TagForm,
  TagListBlock,
} from '../create/AiComponents';
import palette from '../../../lib/styles/palette';
import ImgContainer from '../../../container/common/ImgContainer';

const SubInfo = styled.div`
  margin-top: 1rem;
  color: ${palette.gray[6]};
  display: flex;
  justify-content: end;
  margin-bottom: 0.5rem;
  span + span:before {
    color: ${palette.gray[5]};
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    content: '\\B7';
  }
`;
const Tags = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  .tag {
    display: inline-block;
    color: ${palette.cyan[9]};
    text-decoration: none;
    margin-right: 0.5rem;
    font-size: 1.3rem;
    font-weight: bold;
    /* &:hover {
      color: ${palette.cyan[6]};
    } */
  }
`;

const MyRecipeForm = ({ post, error, loading }) => {
  if (error) {
    if (error.response && error.response.status === 404) {
      return <CreateAireturnBlock>존재하지 않는 포스트 입니다.</CreateAireturnBlock>;
    }
    return <CreateAireturnBlock>오류 발생</CreateAireturnBlock>;
  }

  if (loading || !post) {
    return null;
  }

  const { foodname, ingredients, recipe, createdAt, tags, User } = post.recipe;

  const tagArray = tags.split('#');
  tagArray.shift();

  console.log(tagArray);
  const { comment } = post;

  const handleImageSelected = file => {
    console.log(file);
  };

  return (
    <>
      <CreateAireturnBlock>
        <ImgContainer onImageSelected={handleImageSelected} />

        <AiReturnbox>
          <SubInfo>
            <span>
              <b>{User.nickName}</b>
            </span>
            <span>{new Date(createdAt).toLocaleDateString()}</span>
          </SubInfo>
          <h3 contentEditable="true">요리이름 : {foodname}</h3>
          <label className="divbox">
            <div className="one" contentEditable="true">
              재료 : {ingredients}
            </div>
            <div className="two" contentEditable="true">
              레시피 : {recipe}
            </div>
          </label>

          <Tags>
            {tagArray.map(tag => (
              <div className="tag">#{tag}</div>
            ))}
          </Tags>

          <div className="twobtn">
            <Button>전체 레시피 삭제</Button>
          </div>
        </AiReturnbox>
      </CreateAireturnBlock>
    </>
  );
};

export default MyRecipeForm;
