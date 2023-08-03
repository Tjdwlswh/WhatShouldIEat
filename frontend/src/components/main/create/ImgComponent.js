import styled from "styled-components";
import palette from "../../../lib/styles/palette";
import {useEffect, useState,useRef} from 'react';
import axios from 'axios';




const Wrapper = styled.div`
      display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .img-wrapper{
        margin: 50px 0 20px 0;
        img{
            width: 200px;
            height: 200px;
        }
    }
    .upload-button{
        button{
            margin: 0 5px;
        }
    }
`

const Uploader = (e) => {

    const inputRef = useRef()
    const [image, setImage] = useState({
        image_file: "",
        preview_URL : "logo.png"
    });
   


    const saveImage = (e) => {
        e.preventDefault();
        if(e.target.files[0]){
            URL.revokeObjectURL(image.preview_URL);
            const preview_URL = URL.createObjectURL(e.target.files[0])
            setImage(()=>({
                image_file: e.target.files[0],
                preview_URL : preview_URL
            }))

        }
    }

    const deleteImge = () => {
        URL.revokeObjectURL(image.preview_URL)
        setImage({
            image_file: "",
            preview_URL : "logo.png"
        })
    }

    useEffect(()=>{
        return()=> {
            URL.revokeObjectURL(image.preview_URL)
        }
    },[])

    const sendImageToServer = async () => {
        if(image.image_file){
            const formData = new FormData()
            formData.append('imgfile', image.image_file)
            await axios.post('경로',formData);
            alert('서버에 등록이 완료되었습니다.')
            setImage({
                image_file : "",
                preview_URL: "logo.png"
            })
        } else {
            alert("사진을 등록하세요!")
        }
    }

    return(
       <Wrapper>
            <input type="file" accept="image/jpg, image/jpeg, image/png" onChange={saveImage} onClick={(e)=>{e.target.value = null}}
                ref={inputRef} style={{display : "none"}} />

       </Wrapper>
    )

}

export default Uploader;