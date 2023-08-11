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
import TagUpdate from '../../common/Tags';
import { setOriginalPost, unloadUpdate } from '../../../modules/update';
import { startLoading, finishLoading } from '../../../modules/loading';
import CommentTemp from '../../common/comment/CommentTemp';
import AskRemoveModal from './AskRemoveModal';
import { removePost } from '../../../lib/api/posts';
import { Helmet } from 'react-helmet-async';
import { ModalWrapper } from '../../../container/common/MiniProfileCardContainer';
import ProfileCardContainer from '../../../container/common/ProfileCardContainer';
import imgSrcConverter from '../../../lib/utils/imgSrcConverter';

const SubInfo = styled.div`
  margin-top: 1rem;
  color: ${palette.gray[6]};
  display: flex;
  justify-content: end;
  margin-bottom: 0.5rem;
  cursor: pointer;
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

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const LikeButton = styled.div`
  display: block;
  white-space: nowrap;
  cursor: pointer;
  font-size: 2rem;
  color: ${palette.accent};
  transition: all 0.2s linear;
  &:hover {
    transform: scale(1.1);
  }
`;

const FoodImgBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const FoodImg = styled.img`
  max-width: 600px;
  height: 300px;
  object-fit: cover;
`;

const MyRecipeForm = ({ post, error, loading, user, recipeId, token, like, setLike }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { lastpost } = useSelector(({ update, loading, user }) => ({
    lastpost: update.lastpost,
    loading: loading['update/UPDATE_POST'],
  }));
  const [modal, setModal] = useState(false);
  if (error) {
    if (error.response && error.response.status === 404) {
      return (
        <>
          <CreateAireturnBlock>존재하지 않는 포스트 입니다.</CreateAireturnBlock>
        </>
      );
    }
    return (
      <>
        <CreateAireturnBlock>오류 발생</CreateAireturnBlock>
      </>
    );
  }

  if (loading || !post) {
    return null;
  }

  const { foodname, ingredients, recipe, createdAt, tags, User, userId, foodImg } = post.recipe;
  const imgAttribute = imgSrcConverter(foodImg, imageError, setImageError, 'food');

  const tagArray = tags.split('#');

  const newArray = tagArray.filter(tag => {
    return tag !== '';
  });

  const onClickHandle = () => {
    dispatch(startLoading('setOriginal'));
    dispatch(setOriginalPost(post.recipe));
    dispatch(finishLoading('setOriginal'));

    navigate('/myrecipeUpdate');
  };

  const onRemoveClick = () => {
    setModal(true);
  };
  const onCancel = () => {
    setModal(false);
  };

  const onRemove = async () => {
    try {
      await removePost({ recipeId, token });

      navigate('/myrecipes');
    } catch (e) {
      console.log(e);
    }
  };

  const onConfirm = () => {
    setModal(false);
    onRemove();
  };

  const handleClickHeart = () => {
    setLike(!like);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleClickNickname = () => {
    if (User) setShowModal(true);
  };

  return (
    <>
      <CreateAireturnBlock>
        <AiReturnbox>
          <SubInfo>
            <span>
              <div onClick={handleClickNickname}>{User ? User.nickName : '탈퇴한 회원입니다'}</div>
            </span>
            {showModal && (
              <ModalWrapper onClick={handleClose}>
                <ProfileCardContainer userId={userId} onClickClose={handleClose} />
              </ModalWrapper>
            )}
            <span>{new Date(createdAt).toLocaleDateString()}</span>
          </SubInfo>
          <FoodImgBox>
            <FoodImg {...imgAttribute} alt="요리 사진" />
          </FoodImgBox>
          <h5>요리이름</h5>
          <h3>{lastpost ? lastpost.foodname : foodname}</h3>
          <label className="divbox">
            <h5 className="mar">재료</h5>
            <div className="one">{lastpost ? lastpost.ingredients : ingredients}</div>
            <div>
              <h5 className="mar">레시피</h5>
              <div className="two">{lastpost ? lastpost.recipe : recipe}</div>
            </div>
          </label>
          <Tags>
            {newArray.map(tag => (
              <div className="tag">#{tag}</div>
            ))}
          </Tags>
          <ButtonBox>
            <LikeButton onClick={handleClickHeart}>{like ? '💕' : '🤍'}</LikeButton>
            {userId === user?.id && (
              <div className="twobtn">
                <Button onClick={onRemoveClick} className="margin">
                  레시피 삭제
                </Button>
                <Button onClick={onClickHandle}>레시피 수정</Button>
              </div>
            )}
          </ButtonBox>
          <CommentTemp />
        </AiReturnbox>
      </CreateAireturnBlock>
      <AskRemoveModal visible={modal} onConfirm={onConfirm} onCancel={onCancel} />
    </>
  );
};

export default MyRecipeForm;
