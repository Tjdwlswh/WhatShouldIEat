import Button from '../../common/Button';
import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreateAireturnBlock,
  ImgUpload,
  AiReturnbox,
  Tag,
  TagBoxBlock,
  TagForm,
  TagListBlock,
} from './AiComponents';
import { useDispatch, useSelector } from 'react-redux';
import Responsive from '../../common/Responsive';
import styled from 'styled-components';
import { savePost } from '../../../modules/create';

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

const AiPostViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;

const CreateAiReturnForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [localTags, setLocalTags] = useState([]);

  const { token } = useSelector(state => state.user);
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
    const tags = `#${localTags.join('#')}`;
    dispatch(savePost({ foodname, ingredients, recipe, tags, aiRecipeId: id, token }));
  };

  useEffect(() => {
    if (myRecipe) {
      navigate('/myrecipe');
    }
  }, [myRecipe, navigate]);

  // if(error) {
  //     if (error.response && error.response.status === 404) {
  //         return <AiPostViewerBlock>AI가 작동을 안해요</AiPostViewerBlock>
  //     }
  //     return <AiPostViewerBlock>오류가 발생했습ㄴ</AiPostViewerBlock>
  // }

  // if(loading || !aipost) {
  //     return null;
  // }

  // const { foodname, ingredients, recipe } = aipost

  return (
    <>
      <CreateAireturnBlock>
        <ImgUpload>
          <img className="imgbox" src="/logo.png" alt="AI 사진" />
          <Button className="onebtn">이미지 업로드</Button>
        </ImgUpload>

        <AiReturnbox>
          <h3 contentEditable="true">{foodname}</h3>
          <label className="divbox">
            <div className="one" contentEditable="true">
              {ingredients}
            </div>
            <div className="two" contentEditable="true">
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
