import { useEffect } from 'react';
import styled from 'styled-components';
import Responsive from '../../common/Responsive';
import { Link } from 'react-router-dom';

const RecipeGroup = styled(Responsive)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
`;

const Recipe = styled.div`
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 200px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;
const Description = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Logo = styled.img`
  border-radius: 4px;
  width: 50px;
  object-fit: cover;
  height: 50px;
`;
const NameGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Name = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #a1a1a1;
  line-height: 110%;
  margin: 0;
`;

const TagGruop = styled.div`
  display: flex;
  gap: 2px;
`;

const HashTag = styled.span`
  font-size: 12px;
  color: orange;
  line-height: 110%;
`;

export const ItemList = () => {
  return (
    <Link to={``}>
      <Recipe>
        <Thumbnail>
          <img src="/logo.png" alt="음식사진" />
        </Thumbnail>
        <Description>
          <Logo src="/logo192.png" alt="로고" />
          <NameGroup>
            <Name>여기는 이름</Name>
            <TagGruop>
              <HashTag>여기는 태그</HashTag>
            </TagGruop>
          </NameGroup>
        </Description>
      </Recipe>
    </Link>
  );
};

const MyRecipeList = () => {
  useEffect(() => {
    //서버 api 호출
  }, []);

  return (
    <div>
      <RecipeGroup>
        <ItemList />
        <ItemList />
        <ItemList />
        <ItemList />
        <ItemList />
        <ItemList />
        <ItemList />
        <ItemList />
        <ItemList />
        <ItemList />
        <ItemList />
        <ItemList />
        <ItemList />
        <ItemList />
      </RecipeGroup>
    </div>
  );
};

export default MyRecipeList;
