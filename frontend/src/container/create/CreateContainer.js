import { useDispatch, useSelector } from 'react-redux';
import CreateForm from '../../components/main/create/CreateForm';
import { changeField } from '../../modules/create.js';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ingredients, type } = useSelector(state => ({
    ingredients: state.create.ingredients,
    type: state.create.type,
  }));
  const { post } = useSelector(state => state.create);

  useEffect(() => {
    if (post) {
      navigate('/CreateAi');
    }
  }, [navigate, post]);

  console.log(ingredients, type);

  const onChangeTags = nextTags => {
    dispatch(changeField({ key: 'ingredients', value: nextTags }));
  };

  const onChangeCheck = check => {
    dispatch(changeField({ key: 'type', value: check }));
  };

  return (
    <CreateForm
      onChangeTags={onChangeTags}
      onChangeCheck={onChangeCheck}
      ingredients={ingredients}
    />
  );
};

export default CreateContainer;
