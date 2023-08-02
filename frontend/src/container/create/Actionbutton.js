import styled from 'styled-components';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../modules/create';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';

const StyledButton = styled(Button)``;

const CreateActionButtonContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ingredients,type, post, postError } = useSelector(({ create }) => ({
    ingredients: create.ingredients,
    type: create.type,
    post: create.post,
    postError: create.postError,
  }));

  const onPublish = () => {
    dispatch(
      createPost({
        ingredients,type
      }),
      
    );
  };

  useEffect(() => {
    if (post) {
      const { _id, user } = post;
      navigate(`/${user.email}/${_id}`);
    
    }
    if (postError) {
      console.log(postError);
    }
  }, [navigate, post, postError]);
  return <StyledButton onPublish={onPublish}>레시피 만들기 버튼</StyledButton>;
};

export default CreateActionButtonContainer;
