import styled from "styled-components";
import Button from "../../common/Button";

//임시적으로 만들어 놓은 style

const CreateBlock = styled.div`
     display: flex;
     justify-content: space-between;
    
    .select {
        background-color: #D4E2D4;
        padding : 1rem;
        border-radius: 5px;
        margin: 1rem;
        width: 40%;
    }

    .row {
        padding: 1rem;
        display: inline-block;
        font-size: 1rem;
        font-weight: bold;
        margin: 1rem;
        border-radius: 5px;
    }

     .plus {
        padding: 0.5;
        font-size: 0.5rem;
        font-weight: bold;
        border: 5px;
        margin: 1rem;

     }
`
const Ingredient = styled.div`
      padding: 0.5rem;
      border-radius: 5px;
      background-color:#DBC4F0;
      font-size: 1.5rem;
      font-weight: bold;
      width: 100%;
      margin-top: 1rem;
`



const CreateForm = () => {
    return(
        <CreateBlock>
            <div className="select">
                <Ingredient>재료1</Ingredient>
                <Ingredient>재료2</Ingredient>
                <Ingredient>재료3</Ingredient>
                <Ingredient>재료4</Ingredient>
                <Ingredient>재료5</Ingredient>

              <Button style={{marginTop:20}}>레시피 만들기 버튼</Button>
            </div>
            <form>
                <input className="row" />
                <Button>추가 버튼</Button>
            </form>
        </CreateBlock>
    )
    
}



export default CreateForm

/* 
            1. UI를 만든다
            <br />
            2. form submit
            <br />
            3. input name, value onChange 자동완성기능은 filter 반복문 "마" 자만 나오는것 
            <br />
            4. button submit onclick = e.preventDefault
            <br />
            5. map 반복문으로 배열안에 추가된 value가 state에 있으면 선택한 재료라는 탭에 집어넣어준다 - useState 로 관리
            5-1 리덕스로 state 관리해서 db에 보내준다
            <br />
            6. 선택한재료 라는 탭에 수정 or 삭제 버튼을 달아준다
            <br />
            7. 레시피 만들기 버튼 누르면 /recipe/make 라는 경로로 다음 화면으로 넘어간다
             */





