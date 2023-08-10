import MyRecipeList from '../../components/main/myrecipe/MyRecipeList';
import PostListContainer from '../../container/myrecipe/MyRecipeListContainer';
import HeaderContainer from '../../container/common/HeaderContainer';
import PaginationContainer from '../../container/PaginationContainer';

const MyRecipeListPage = () => {
  return (
    <>
      {' '}
      <PostListContainer />
      <PaginationContainer />
    </>
  );
};

export default MyRecipeListPage;
