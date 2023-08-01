import styled from 'styled-components';
import Button from '../../common/Button';
import palette from '../../../lib/styles/palette';

 const CreateAireturnBlock = styled.div`
    display: flex;
 `

 const ImgUpload = styled.div`
    width : 30%;
 
    background-color: ${palette.gray[3]};
    padding: 2rem;
    display: flex;
    flex-direction: column;
    .imgbox{
        width : 100%;
    }
    .onebtn{
        margin-top: 2rem;
    }
 `

 const AiReturnbox = styled.div`
    width: 70%;
   
    background-color: ${palette.gray[3]};
    padding: 1rem 3rem;
    input{
       
        width: 50%;
        border-radius: 5px;
        border: 0 solid #e0e0e0;
    }
    .one{
        min-height:3rem;
        margin-top: 2rem;
    }

    .two{
        margin-top: 3rem;
        min-height:6rem;
    }
    
    .three{
        margin-top: 1rem;
        min-height:1rem;
    }

    .four{
        margin-top: 1rem;
        min-height:1rem;
    }

    h3{
        text-align: center;
    }
    .divbox{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 0 solid #e0e0e0;
    }

    .twobtn{
        margin-top: 2rem;
        text-align: center;
        width: 100%;
    }
   
 `

const CreateAiReturnForm = () => {
    return(
        <CreateAireturnBlock>
            <ImgUpload>
            <img className='imgbox' src='/logo.png' alt='AI 사진' />
            <Button className="onebtn">이미지 업로드</Button>
            </ImgUpload>
            <AiReturnbox>
                <h3>요리명</h3>
                <label className='divbox'>
                <input placeholder='재료들' className='one' contentEditable="true"></input>
                <input placeholder='레시피' className='two' contentEditable="true"></input>
                <div className='three'> #태그들 </div>
                <input placeholder='태그를 입력하세요' className='four'></input>
                </label>
                <div className='twobtn'>
                <Button>나의 레시피로 저장</Button>
                </div>
            </AiReturnbox>
        </CreateAireturnBlock>
    )
}

export default CreateAiReturnForm;