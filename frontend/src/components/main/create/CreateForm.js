import styled from 'styled-components';
import Button from '../../common/Button';
import palette from '../../../lib/styles/palette';
import React, { useState, useCallback, useEffect } from 'react';
import CreateActionButtonContainer from './Actionbutton';
//임시적으로 만들어 놓은 style

const CreateBlock = styled.div`
  display: flex;

  .select {
    background-color: #d4e2d4;
    padding: 1rem;
    border-radius: 5px;
    margin: 1rem;
    width: 60%;
  }

  h4 {
    color: ${palette.gray[8]};
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  .block {
    width: 100%;
  }

  .box {
    padding: 1rem;
  }

  .row {
    padding: 1rem;
    display: inline-block;
    font-size: 1rem;
    font-weight: bold;
    margin: 1rem;
    border-radius: 5px;
    width: 70%;
  }

  .btn {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
  }
`;

const Tag = styled.div`
  margin-right: 0.5rem;
  color: ${palette.gray[7]};
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;
const Ingredient = styled.div`
  padding: 0.5rem;
  border-radius: 5px;
  background-color: #dbc4f0;
  font-size: 1.5rem;
  font-weight: bold;
  width: 100%;
  margin-top: 1rem;
`;

// 하나만 랜더링 되도록 함

const TagItem = React.memo(({ tag, onRemove }) => (
  <Tag
    onClick={() => {
      onRemove(tag);
    }}
  >
    #{tag}
  </Tag>
));

const TagList = React.memo(({ tags, onRemove }) => (
  <Ingredient>
    {tags.map(tag => (
      <TagItem key={tag} tag={tag} onRemove={onRemove} />
    ))}
  </Ingredient>
));

const CreateForm = ({ tags, onChangeTags, onPublish }) => {
  const [input, setInput] = useState('');
  const [localTags, setLocalTags] = useState([]);

  const insertTag = useCallback(
    tag => {
      if (!tag) return;
      //공백이라면 추가하지 않음
      if (localTags.includes(tag)) return;
      //이미 똑같은 재료가 있다면 추가하지 않음

      const nextTags = [...localTags, tag];
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags],
  );

  const onRemove = useCallback(
    tag => {
      const nextTags = localTags.filter(t => t !== tag);
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags],
  );

  const onChange = useCallback(e => {
    setInput(e.target.value);
  }, []);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      insertTag(input.trim());
      setInput('');
    },
    [input, insertTag],
  );

  useEffect(() => {
    setLocalTags(tags);
  }, [tags]);

  return (
    <CreateBlock>
      <div className="select">
        <h4>선택한 재료</h4>
        <TagList tags={localTags} onRemove={onRemove} />
        <div className="btn">
          <CreateActionButtonContainer onClick={onPublish} />
        </div>
      </div>
      <div className="block">
        <form className="box" onSubmit={onSubmit}>
          <input
            className="row"
            placeholder="태그를 입력하세요"
            value={input}
            onChange={onChange}
          />
          <Button type="submit">추가 버튼</Button>
        </form>
      </div>
    </CreateBlock>
  );
};

export default CreateForm;
