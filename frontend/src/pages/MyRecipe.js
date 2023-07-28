import MyRecipeForm from '../components/main/myrecipe/MyRecipeForm';
import MyRecipeTemp from '../components/main/myrecipe/MyRecipeTemp';

const MyRecipe = () => {
  return (
    <div>
      <MyRecipeTemp>
        <MyRecipeForm />
      </MyRecipeTemp>
    </div>
  );
};

export default MyRecipe;
