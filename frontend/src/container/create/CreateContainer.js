import { useDispatch, useSelector } from 'react-redux';
import CreateForm from '../../components/main/create/CreateForm';
import { changeField } from '../../modules/create.js';

const CreateContainer = () => {
  const dispatch = useDispatch();
  const tags = useSelector(state => state.create.tags);

  console.log(tags);

  const onChangeTags = nextTags => {
    dispatch(changeField({ key: 'tags', value: nextTags }));
  };

  return <CreateForm onChangeTags={onChangeTags} tags={tags} />;
};

export default CreateContainer;
