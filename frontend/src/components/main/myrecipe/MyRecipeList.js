import { useEffect } from 'react';
import styled from 'styled-components';
import Responsive from '../../common/Responsive';
import { Link } from 'react-router-dom';
import palette from '../../../lib/styles/palette';
import { useDispatch, useSelector } from 'react-redux';
import { setOriginalPost } from '../../../modules/update';
import { unloadUpdate } from '../../../modules/update';

const RecipeGroup = styled(Responsive)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
  .flex {
    display: flex;
  }
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

const SubInfo = styled.div`
  color: ${palette.gray[9]};
  span + span:before {
    color: ${palette.gray[4]};
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    content: '\\B7';
  }

  .title {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .tags {
    margin-left: 1rem;
  }
`;

const TagGruop = styled.div`
  display: flex;
  gap: 2px;
`;

const Tags = styled.span`
  font-size: 12px;
  color: orange;
  line-height: 110%;

  &:hover {
    color: ${palette.cyan[6]};
  }
`;

const ItemList = ({ post, user }) => {
  const { foodname, tags, foodImg } = post;
  const tagArray = tags.split('#');
  const dispatch = useDispatch();

  const newArray = tagArray.filter(tag => {
    return tag !== '';
  });

  useEffect(() => {
    return () => {
      dispatch(unloadUpdate());
    };
  }, [dispatch, post.recipe]);

  //foodImg 이거 나중에 사용하기

  return (
    <RecipeGroup className="flex">
      <Link className="flex" to={`/recipe?userId=${post.userId}&postId=${post.id}`}>
        <Recipe>
          <Thumbnail>{<img src={'/logo.png'} alt="음식사진" />}</Thumbnail>
          <Description>
            <Logo src="/logo192.png" alt="로고" />
            <NameGroup>
              <SubInfo>
                <span className="title">{foodname}</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </SubInfo>
              <TagGruop>
                <Tags>
                  {newArray.map(tag => (
                    <Link className="tags" to={`/?tag=${tag}`} key={tag}>
                      #{tag}
                    </Link>
                  ))}
                </Tags>
              </TagGruop>
            </NameGroup>
          </Description>
        </Recipe>
      </Link>
    </RecipeGroup>
  );
};

const MyRecipeList = ({ posts, loading, error, user }) => {
  if (error) {
    return <div> 에러가 발생했습니다. </div>;
  }

  return (
    <div style={{ marginTop: 50 }}>
      <RecipeGroup>
        {!loading && posts && (
          <div className="flex">
            {posts.map(post => (
              <ItemList user={user} post={post} key={post.id}></ItemList>
            ))}
          </div>
        )}
      </RecipeGroup>
    </div>
  );
};

export default MyRecipeList;
