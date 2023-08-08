import Button from '../../common/Button';
import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreateAireturnBlock,
  AiReturnbox,
  Tag,
  TagBoxBlock,
  TagForm,
  TagListBlock,
} from './AiComponents';
import { useDispatch, useSelector } from 'react-redux';
import { savePost } from '../../../modules/create';
import ImgUploadContainer from '../../../container/common/ImgUploadContainer';

export const TagItem = React.memo(({ tag, onRemove }) => (
  <Tag onClick={() => onRemove(tag)}> #{tag} </Tag>
));

export const TagList = React.memo(({ tags, onRemove }) => (
  <TagListBlock>
    {tags.map(tag => (
      <TagItem key={tag} tag={tag} onRemove={onRemove} />
    ))}
  </TagListBlock>
));

const CreateAiReturnForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [localTags, setLocalTags] = useState([]);
  const [image, setImage] = useState(null);

  const { token } = useSelector(state => state.user);
  const { user } = useSelector(state => state.user);
  const { post, postError, myRecipe } = useSelector(({ create }) => ({
    post: create.post,
    error: create.error,
    myRecipe: create.myRecipe,
  }));
  const { id, foodname, ingredients, recipe } = post ?? {};

  const insertTag = useCallback(
    tag => {
      if (!tag) return;
      if (localTags.includes(tag)) return;
      setLocalTags([...localTags, tag]);
    },
    [localTags],
  );

  const onRemove = useCallback(
    tag => {
      setLocalTags(localTags.filter(t => t !== tag));
    },
    [localTags],
  );

  const onChange = useCallback(e => {
    setInput(e.target.value);
  });

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      insertTag(input.trim());
      setInput('');
    },
    [input, insertTag],
  );

  const handleClickSave = () => {
    let tags = '';
    if (localTags) {
      tags = `#${localTags.join('#')}`;
    }
    dispatch(savePost({ foodname, ingredients, recipe, tags, aiRecipeId: id, token, image }));
    setImage(null);
  };

  const handleImageSelected = file => {
    setImage(file);
  };

  console.log(recipe);

  useEffect(() => {
    if (myRecipe) {
      const { email } = user;
      const { id } = myRecipe;
      navigate(`/${email}/${id}`);
    }
  }, [myRecipe, navigate, user, id]);

  return (
    <>
      <CreateAireturnBlock>
        <ImgUploadContainer onImageSelected={handleImageSelected} />

        <AiReturnbox>
          <h3 contentEditable="true">{foodname}</h3>
          <label className="divbox">
            <div className="one" contentEditable="true">
              {ingredients}
            </div>
            <div className="two" contentEditable="true" value={input} onChange={onChange}>
              {recipe}
            </div>

            <TagBoxBlock>
              <div className="three">
                <TagList tags={localTags} onRemove={onRemove} />
              </div>
              <TagForm onSubmit={onSubmit}>
                <input placeholder="태그를 입력하세요" value={input} onChange={onChange} />
                <button type="submit">추가</button>
              </TagForm>
            </TagBoxBlock>
          </label>
          <div className="twobtn">
            <Button onClick={handleClickSave}>나의 레시피로 저장</Button>
          </div>
        </AiReturnbox>
      </CreateAireturnBlock>
    </>
  );
};

export default CreateAiReturnForm;
