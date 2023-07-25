import HeaderContainer from "../container/common/HeaderContainer"
import RecommendForm from "../components/main/recommend/RecommendForm"
import RecommendTemp from "../components/main/recommend/RecommendTemp"



const RecommendRecipe = () => {
    return(
        <div>
            <HeaderContainer />
            <RecommendTemp>
                <RecommendForm />
            </RecommendTemp>
        </div>
    )
    }


    
export default RecommendRecipe