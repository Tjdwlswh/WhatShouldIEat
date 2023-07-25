import HeaderContainer from "../container/common/HeaderContainer"
import MyRecipeForm from "../components/main/recipe/MyRecipeForm"
import MyRecipeTemp from "../components/main/recipe/MyRecipeTemp"


const MyRecipe = () => {
    return(
        <div>
            <HeaderContainer />
            <MyRecipeTemp>
                <MyRecipeForm />
            </ MyRecipeTemp>
        </div>
    )
    }


    
export default MyRecipe