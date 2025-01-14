import Button from '../../common/Button';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePost, changefield, unloadUpdate } from '../../../modules/update';
import {
  CreateAireturnBlock,
  ImgUpload,
  AiReturnbox,
  Tag,
  TagBoxBlock,
  TagForm,
  TagListBlock,
} from '../create/AiComponents';
import { useDispatch, useSelector } from 'react-redux';
import ImgUploadContainer from '../../../container/common/ImgUploadContainer';

export const TagItem = React.memo(({ ref, onInput, tag, onRemove }) => (
  <Tag onClick={() => onRemove(tag)} ref={ref} onInput={onInput}>
    #{tag}
  </Tag>
));

export const TagList = React.memo(({ ref, onInput, tags, onRemove }) => (
  <TagListBlock>
    {tags.map(tag => (
      <TagItem key={tag} tag={tag} ref={ref} onInput={onInput} onRemove={onRemove} />
    ))}
  </TagListBlock>
));

const MyRecipeUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [localTags, setLocalTags] = useState([]);
  const [image, setImage] = useState(null);
  const { token } = useSelector(state => state.user);
  const { user } = useSelector(state => state.user);
  const { lastpost, updateError, originalPostId, foodname, ingredients, recipe, loading } =
    useSelector(({ update, loading }) => ({
      lastpost: update.lastpost,
      updateError: update.updateError,
      originalPostId: update.originalPostId,
      foodname: update.lastpost.foodname,
      ingredients: update.lastpost.ingredients,
      recipe: update.lastpost.recipe,
      loading: loading['update/UPDATE_POST'],
    }));

  const foodnameRef = useRef(null);
  const ingredientsRef = useRef(null);
  const recipeRef = useRef(null);
  const tagsRef = useRef(null);

  const handleChange = e => {
    const ref =
      e.target.id === 'foodname'
        ? foodnameRef
        : e.target.id === 'ingredients'
        ? ingredientsRef
        : e.target.id === 'recipe'
        ? recipeRef
        : e.target.id === 'tags'
        ? tagsRef
        : null;

    const divId = ref.current.id;
    const content = ref.current.value;
    dispatch(
      changefield({
        form: 'lastpost',
        key: divId,
        value: content,
      }),
    );

    console.log(lastpost);
  };

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

  const handleImageSelected = file => {
    setImage(file);
  };

  const handleClickSave = () => {
    if (originalPostId) {
      const recipeId = originalPostId;
      dispatch(updatePost({ recipeId, token, foodname, ingredients, recipe, image }));
      setImage(null);
      if (!loading) {
        navigate(`/recipe?postId=${originalPostId}`);
        dispatch(unloadUpdate());
      }
    }
  };

  // useEffect(() => {
  //   if (originalPostId) {
  //     const { email } = user;
  //     navigate(`/${email}/${originalPostId}`);
  //   }
  // }, [originalPostId, navigate, user]);

  return (
    <>
      <CreateAireturnBlock>
        <ImgUploadContainer onImageSelected={handleImageSelected} imgSrc={lastpost.foodImg} />
        <AiReturnbox>
          <input
            className="one"
            id="foodname"
            ref={foodnameRef}
            onInput={handleChange}
            placeholder="요리 이름"
            defaultValue={lastpost.foodname}
          ></input>
          <section className="divbox">
            <input
              className="one"
              id="ingredients"
              ref={ingredientsRef}
              placeholder="재료"
              onChange={handleChange}
              defaultValue={lastpost.ingredients}
            ></input>
            <input
              className="two"
              id="recipe"
              ref={recipeRef}
              placeholder="레시피"
              onChange={handleChange}
              defaultValue={lastpost.recipe}
            ></input>

            <TagBoxBlock>
              <div className="three">
                <div contentEditable="true" id="tags" ref={tagsRef} onInput={handleChange}>
                  {lastpost.tags}{' '}
                </div>
                <TagList tags={localTags} onRemove={onRemove}></TagList>
              </div>
              <TagForm onSubmit={onSubmit}>
                <input placeholder="태그를 다시 입력하세요" value={input} onChange={onChange} />
                <button type="submit">추가</button>
              </TagForm>
            </TagBoxBlock>
          </section>
          <div className="twobtn">
            <Button onClick={handleClickSave}>수정 완료</Button>
          </div>
        </AiReturnbox>
      </CreateAireturnBlock>
    </>
  );
};

export default MyRecipeUpdate;
