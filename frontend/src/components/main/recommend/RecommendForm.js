import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Responsive from '../../common/Responsive';
import { Link } from 'react-router-dom';
import palette from '../../../lib/styles/palette';
import { useDispatch, useSelector } from 'react-redux';
import { setOriginalPost } from '../../../modules/update';
import { unloadUpdate } from '../../../modules/update';
import imgSrcConverter from '../../../lib/utils/imgSrcConverter';
import numberToUnit from '../../../lib/utils/numberToUnit';
import PaginationBox from '../../common/PaginationBox';

const RecipeGroup = styled(Responsive)`
  gap: 8px;
  padding: 8px;
  .flex {
    display: flex;
    flex-wrap: wrap;
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
  flex: 1;
`;

const Like = styled.div`
  position: relative;
  border-radius: 4px;
  width: 20px;
  height: 20px;
  background-image: url('${process.env.PUBLIC_URL}/heart.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const LikeCount = styled.div`
  font-size: 0.8rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: red;
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
  const [imageError, setImageError] = useState(false);
  const imgAttribute = imgSrcConverter(foodImg, imageError, setImageError, 'food');
  const likeCount = numberToUnit(post.likeCount);

  const newArray = tagArray.filter(item => item !== '');

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
          <Thumbnail>{<img {...imgAttribute} alt="음식사진" />}</Thumbnail>
          <Description>
            <Like>
              <LikeCount>{likeCount}</LikeCount>
            </Like>
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

const RecommendForm = ({ totalItemsCount, page, setPage, recommend, loading, error, user }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  if (error) {
    return <div> 에러가 발생했습니다. </div>;
  }

  return (
    <div style={{ marginTop: 10 }}>
      <RecipeGroup>
        {!loading && recommend && (
          <div className="flex">
            {recommend.map(post => (
              <ItemList user={user} post={post} key={post.id}></ItemList>
            ))}
          </div>
        )}
      </RecipeGroup>
      <PaginationBox page={page} setPage={setPage} totalItemsCount={totalItemsCount} />
    </div>
  );
};

export default RecommendForm;
