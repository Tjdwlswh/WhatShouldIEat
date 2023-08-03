import styled from 'styled-components';
import Button from '../../components/common/Button';

import { createPost } from '../../modules/create';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

const StyledButton = styled(Button)``;

const CreateActionButtonContainer = () => {
  const dispatch = useDispatch();
  const { ingredients, type } = useSelector(({ create }) => ({
    ingredients: create.ingredients,
    type: create.type,
  }));
  const { token } = useSelector(state => state.user);

  const onPublish = () => {
    dispatch(
      createPost({
        ingredients,
        type,
        token,
      }),
    );
  };

  return <StyledButton onClick={onPublish}>레시피 만들기 버튼</StyledButton>;
};

export default CreateActionButtonContainer;
