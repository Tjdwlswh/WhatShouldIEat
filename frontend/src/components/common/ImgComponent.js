import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import Button from './Button';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 15rem;
  padding: 1rem;
`;

const ButtonBox = styled.div`
  display: flex;
  margin-top: 1rem;
  button {
    padding: 0.15rem;
    margin: 0 0.2rem;
    width: 6rem;
  }
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  img {
    max-width: 200px;
    max-height: 200px;
  }
`;

const ImgComponent = ({ image, setImage }) => {
  const inputRef = useRef();

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(image.preview_URL);
    };
  }, [image.preview_URL]);

  const saveImage = e => {
    e.preventDefault();
    if (e.target.files[0]) {
      URL.revokeObjectURL(image.preview_URL);
      const preview_URL = URL.createObjectURL(e.target.files[0]);
      setImage(() => ({
        image_file: e.target.files[0],
        preview_URL: preview_URL,
      }));
    }
  };

  const handleUploadClick = () => {
    inputRef.current.click();
  };

  const handleDeleteClick = () => {
    URL.revokeObjectURL(image.preview_URL);
    setImage(() => ({
      image_file: {},
      preview_URL: 'logo.png',
    }));
  };

  const sendImageToServer = async () => {
    if (image.image_file) {
      const formData = new FormData();
      formData.append('imgfile', image.image_file);
      await axios.post('경로', formData);
      alert('서버에 등록이 완료되었습니다.');
      setImage({
        image_file: '',
        preview_URL: 'logo.png',
      });
    } else {
      alert('사진을 등록하세요!');
    }
  };

  return (
    <Wrapper>
      <ImgBox>
        <img src={image.preview_URL} alt="preview" />
      </ImgBox>
      <input
        type="file"
        accept="image/jpg, image/jpeg, image/png"
        onChange={saveImage}
        ref={inputRef}
        style={{ display: 'none' }}
      />
      <ButtonBox>
        <Button onClick={handleUploadClick}>사진 등록</Button>
        <Button onClick={handleDeleteClick}>제거</Button>
      </ButtonBox>
    </Wrapper>
  );
};

export default ImgComponent;
