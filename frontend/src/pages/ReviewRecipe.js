import HeaderContainer from "../container/common/HeaderContainer"
import ReviewForm from "../components/main/review/ReviewForm"
import ReviewTemp from "../components/main/review/ReviewTemp"


const ReviewRecipe = () => {
    return(
        <div>
            <HeaderContainer />
            <ReviewTemp>
                <ReviewForm />
            </ReviewTemp>
        </div>
    )
    }


    
export default ReviewRecipe