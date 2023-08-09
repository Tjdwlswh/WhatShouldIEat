import Button from '../../common/Button';
import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  CreateAireturnBlock,
  ImgUpload,
  AiReturnbox,
  TagBoxBlock,
  TagForm,
  TagListBlock,
} from '../create/AiComponents';
import palette from '../../../lib/styles/palette';
import TagUpdate from '../../common/Tags';
import { setOriginalPost } from '../../../modules/update';
import { startLoading, finishLoading } from '../../../modules/loading';

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lastpost } = useSelector(({ update, loading }) => ({
    lastpost: update.lastpost,
    // updateError: update.updateError,
    // originalPostId: update.originalPostId,
    // foodname: update.lastpost.foodname,
    // ingredients: update.lastpost.ingredients,
    // recipe: update.lastpost.recipe,
    loading: loading['update/UPDATE_POST'],
  }));

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

  const onClickHandle = () => {
    dispatch(startLoading('setOriginal'));
    dispatch(setOriginalPost(post.recipe));
    dispatch(finishLoading('setOriginal'));

    navigate('/myrecipeUpdate');
  };

  return (
    <>
      <CreateAireturnBlock>
        <ImgUpload>
          <img className="imgbox" src="/logo.png" alt="AI 사진" />
          <Button className="onebtn">이미지 업로드</Button>
        </ImgUpload>

        <AiReturnbox>
          <SubInfo>
            <span>
              <b>{User.nickName}</b>
            </span>
            <span>{new Date(createdAt).toLocaleDateString()}</span>
          </SubInfo>
          <h3>요리이름 :{lastpost ? lastpost.foodname : foodname}</h3>
          <label className="divbox">
            <div className="one">재료 : {lastpost ? lastpost.ingredients : ingredients}</div>
            <div className="two">레시피 : {lastpost ? lastpost.recipe : recipe}</div>
          </label>

          <Tags>
            {tagArray.map(tag => (
              <div contentEditable="true" className="tag">
                #{tag}
              </div>
            ))}
          </Tags>
          <div className="twobtn">
            <Button className="margin">레시피 삭제</Button>
            <Button onClick={onClickHandle}>레시피 수정</Button>
          </div>
        </AiReturnbox>
      </CreateAireturnBlock>
    </>
  );
};

export default MyRecipeForm;
