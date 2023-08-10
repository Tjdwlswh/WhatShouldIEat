import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import imgSrcConverter from '../../lib/utils/imgSrcConverter';

/*
  레시피 썸네일 144X144 이미지 소스, 태그, 요리이름
*/

const Thumbnail = styled.div`
  position: relative;
  width: 9rem;
  height: 9rem;
  display: flex;
  border: 1px solid black;
  border-radius: 8px;
  overflow: hidden;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const FoodNameLink = styled(Link)`
  position: absolute;
  top: 1rem;
  text-align: center;
  font-weight: bold;
  font-size: 1.5em;
  color: ${palette.accent};
  text-shadow:
    -2px 0 black,
    0 2px black,
    2px 0 black,
    0 -2px black;
`;

const HashTagGroup = styled.div`
  position: absolute;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  bottom: 1px;
  left: 1px;
`;

const HashTagLink = styled(Link)`
  position: relative;
  bottom: 1px;
  left: 1px;
  font-weight: bold;
  font-size: 1.1em;
  color: ${palette.text};
  text-shadow:
    -1px 0 white,
    0 1px white,
    1px 0 white,
    0 -1px white;
`;

const ThumbnailCard = ({ imgSrc, tags, foodname, recipeId }) => {
  const hashTags = tags ? tags.match(/[^#]+/g) : [];

  const [imageError, setImageError] = useState(false);
  const imgAttribute = imgSrcConverter(imgSrc, imageError, setImageError);

  return (
    <Thumbnail>
      <img {...imgAttribute} alt="사진" />
      <FoodNameLink to={`/recipe?postId=${recipeId}`}>{foodname}</FoodNameLink>
      <HashTagGroup>
        {hashTags?.map(hashTag => (
          <HashTagLink to={`/${hashTag}`}>{`#${hashTag}`}</HashTagLink>
        ))}
      </HashTagGroup>
    </Thumbnail>
  );
};

export default ThumbnailCard;
