import MyRecipeTemp from '../../components/main/myrecipe/MyRecipeTemp';
import MyRecipeUpdate from '../../components/main/myrecipe/MyRecipeUpdate';
import MyRecipeContainer from '../../container/myrecipe/MyRecipeContainer';
import MyRecipeUpdateTemp from '../../components/main/myrecipe/MyRecipeUpdateTemp';
import { Helmet } from 'react-helmet-async';

const MyRecipeUpdatePage = () => {
  return (
    <>
      <Helmet>
        <title>나의레시피 수정 - 뭐해먹지?</title>
      </Helmet>
      <MyRecipeUpdateTemp>
        <MyRecipeUpdate />
      </MyRecipeUpdateTemp>
    </>
  );
};

export default MyRecipeUpdatePage;
