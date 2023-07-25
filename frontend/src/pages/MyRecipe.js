import HeaderContainer from '../container/common/HeaderContainer';
import MyRecipeForm from '../components/main/myrecipe/MyRecipeForm';
import MyRecipeTemp from '../components/main/myrecipe/MyRecipeTemp';

const MyRecipe = () => {
  return (
    <div>
      <HeaderContainer />
      <MyRecipeTemp>
        <MyRecipeForm />
      </MyRecipeTemp>
    </div>
  );
};

export default MyRecipe;
