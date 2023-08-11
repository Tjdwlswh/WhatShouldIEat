import MyRecipeTemp from '../../components/main/myrecipe/MyRecipeTemp';
import MyRecipeContainer from '../../container/myrecipe/MyRecipeContainer';
import { Helmet } from 'react-helmet-async';

const MyRecipe = () => {
  return (
    <div>
      <Helmet>
        <title>나의레시피 - 뭐해먹지?</title>
      </Helmet>
      ;
      <MyRecipeTemp>
        <MyRecipeContainer />
      </MyRecipeTemp>
    </div>
  );
};

export default MyRecipe;
