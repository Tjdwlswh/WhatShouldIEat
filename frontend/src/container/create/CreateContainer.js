import { useDispatch, useSelector } from 'react-redux';
import CreateForm from '../../components/main/create/CreateForm';
import { changeField } from '../../modules/create.js';

const CreateContainer = () => {
  const dispatch = useDispatch();
  const {ingredients,type} = useSelector((state )=> ({
    ingredients: state.create.ingredients,
    type: state.create.type  
  }));

  console.log(ingredients,type);

  const onChangeTags = (nextTags) => {
    dispatch(changeField({ key: 'ingredients', value: nextTags }));
   
  };

  const onChangeCheck = (check) => {
   
    dispatch(changeField({key:'type', value: check}))
  }

  return <CreateForm onChangeTags={onChangeTags} onChangeCheck={onChangeCheck} ingredients={ingredients} />;
};

export default CreateContainer;
