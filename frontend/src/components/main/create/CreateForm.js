import styled from 'styled-components';
import Button from '../../common/Button';
import palette from '../../../lib/styles/palette';
import React, { useState, useCallback, useEffect } from 'react';
import CreateActionButtonContainer from '../../../container/create/Actionbutton';


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
  min-height: 300px;
`;

const CheckInputbox = styled.div`
  padding: 1rem;
  margin-top: 3rem;
  width: 100%;

 .check{ margin-right : 0.5rem;};

 label{
  margin-right: 1rem;
 }

`

// 하나만 랜더링 되도록 함

const TagItem = React.memo(({ ingredient, onRemove }) => (
  <Tag
    onClick={() => {
      onRemove(ingredient);
    }}
  >
    {ingredient}
  </Tag>
));

const TagList = React.memo(({ ingredients, onRemove }) => (
  <Ingredient>
    {ingredients.map(ingredient => (
      <TagItem key={ingredient} ingredient={ingredient} onRemove={onRemove} />
    ))}
  </Ingredient>
));

const CreateForm = ({ ingredients, onChangeTags,onChangeCheck, onPublish }) => {
  const [input, setInput] = useState('');
  const [localTags, setLocalTags] = useState([]);
  const [check,setCheck] = useState(null)
  const [isFixedChecked, setIsFixedChecked] = useState(false);
  const [isFlexibleChecked, setIsFlexibleChecked] = useState(false);


  console.log(check)
  const insertTag = useCallback(
    (ingredient,check) => {
      if (!ingredient) return;
      //공백이라면 추가하지 않음
      if (localTags.includes(ingredient)) return;
      //이미 똑같은 재료가 있다면 추가하지 않음

      const nextTags = [...localTags, ingredient];
      setLocalTags(nextTags);
      onChangeTags(nextTags);
      onChangeCheck(check)
    },
    [localTags, onChangeTags,onChangeCheck],
  );

  const onRemove = useCallback(
    ingredient => {
      const nextTags = localTags.filter(t => t !== ingredient);
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags],
  );

  const onChange = useCallback(e => {
    setInput(e.target.value);
  }, []);

  const onHandleChange = useCallback(e => {
    setCheck(e.target.value);
    const { name, checked } = e.target;

    if (name === 'fixed') {
      setIsFixedChecked(checked);
      setIsFlexibleChecked(false);
      setCheck(checked ? 'fixed' : null);
    } else if (name === 'flexible') {
      setIsFlexibleChecked(checked);
      setIsFixedChecked(false);
      setCheck(checked ? 'flexible' : null);
    }
  },[]);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      insertTag(input.trim(),check);
      setInput('');
    },
    [input, insertTag,check],
  );

 const onError = useCallback(
    (check) => {
      if(!check){
        alert("type을 정하셔서 체크해주세요")
      }
      return
    },[check]
  )

  useEffect(() => {
    setLocalTags(ingredients);
  }, [ingredients]);

  return (
    <>    <CreateBlock>
      <div className="select">
        <h4>선택한 재료</h4>
        <TagList ingredients={localTags} onRemove={onRemove} />
        <div className="btn">
        <div onClick={()=>{onError(check)}}> 
          <CreateActionButtonContainer onClick={onPublish}  />
          </div>
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
         
          <CheckInputbox>
          <label>
          <input 
          type="checkbox" 
          name='fixed' 
          className='check'
          value="fixed"
          onChange={onHandleChange}
          checked={isFixedChecked}
        
          ></input>
          재료 고정
          </label>
          <label>
          <input 
          type="checkbox"
          name='flexible' 
          value="flexible"
          className='check'
          onChange={onHandleChange}
          checked={isFlexibleChecked}
         
          ></input>
          재료 추가 기능
          </label>
          </CheckInputbox>
        </form>
      </div>
     
    </CreateBlock>

    </>

  );
};

export default CreateForm;
