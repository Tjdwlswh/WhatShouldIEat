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
} from '../create/AiComponents';

import { useDispatch, useSelector } from 'react-redux';
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

const MyRecipeUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [localTags, setLocalTags] = useState([]);

  const { token } = useSelector(state => state.user);

  const { lastpost } = useSelector(({ update }) => ({
    lastpost: update.lastpost,
  }));

  console.log(lastpost);

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

  return (
    <>
      <CreateAireturnBlock>
        <ImgUpload>
          <img className="imgbox" src="/logo.png" alt="AI 사진" />
          <Button className="onebtn">이미지 업로드</Button>
        </ImgUpload>

        <AiReturnbox>
          <h3 contentEditable="true">{lastpost.foodname}</h3>
          <label className="divbox">
            <div className="one" contentEditable="true">
              {lastpost.ingredients}
            </div>
            <div className="two" contentEditable="true">
              {lastpost.recipe}
            </div>

            <TagBoxBlock>
              <div className="three">
                <TagList tags={localTags} onRemove={onRemove}></TagList>
              </div>
              <TagForm onSubmit={onSubmit}>
                <input placeholder="태그를 다시 입력하세요" value={input} onChange={onChange} />
                <button type="submit">추가</button>
              </TagForm>
            </TagBoxBlock>
          </label>
          <div className="twobtn">
            <Button>수정 완료</Button>
          </div>
        </AiReturnbox>
      </CreateAireturnBlock>
    </>
  );
};

export default MyRecipeUpdate;
