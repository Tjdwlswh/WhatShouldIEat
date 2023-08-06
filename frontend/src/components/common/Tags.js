import { TagBoxBlock, TagForm, AiReturnbox } from '../main/create/AiComponents';
import { TagList } from '../main/create/CreateAiReturnForm';

import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const TagUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [localTags, setLocalTags] = useState([]);

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
      <AiReturnbox>
        <TagBoxBlock>
          <div className="three">
            <TagList tags={localTags} onRemove={onRemove} />
          </div>
          <TagForm onSubmit={onSubmit}>
            <input placeholder="태그를 입력하세요" value={input} onChange={onChange} />
            <button type="submit">추가</button>
          </TagForm>
        </TagBoxBlock>
      </AiReturnbox>
    </>
  );
};

export default TagUpdate;
