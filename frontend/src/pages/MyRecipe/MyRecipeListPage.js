import MyRecipeList from '../../components/main/myrecipe/MyRecipeList';
import PostListContainer from '../../container/myrecipe/MyRecipeListContainer';
import HeaderContainer from '../../container/common/HeaderContainer';
import PaginationContainer from '../../container/PaginationContainer';
import { Helmet } from 'react-helmet-async';

const MyRecipeListPage = () => {
  return (
    <>
      <Helmet>
        <title>나의레시피 목록 - 뭐해먹지?</title>
      </Helmet>
      <PostListContainer />
      <PaginationContainer />
    </>
  );
};

export default MyRecipeListPage;
