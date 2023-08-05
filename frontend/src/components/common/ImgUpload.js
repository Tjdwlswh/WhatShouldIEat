import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Button from './Button';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 15rem;
  margin-bottom: 1rem;
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

const ImgUpload = ({ onImageSelected }) => {
  const [imageURL, setImageURL] = useState('/logo.png');
  const inputRef = useRef();

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageURL);
    };
  }, [imageURL]);

  const saveImage = e => {
    e.preventDefault();
    const image = e.target.files[0];

    if (image.size > 5 * 1024 * 1024) {
      alert('업로드 가능한 최대 용량은 5MB입니다. ');
      return;
    }

    if (image) {
      URL.revokeObjectURL(imageURL);
      const preview_URL = URL.createObjectURL(image);
      onImageSelected(image);
      setImageURL(preview_URL);
    }
  };

  const handleUploadClick = e => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleDeleteClick = e => {
    e.preventDefault();
    URL.revokeObjectURL(imageURL);
    setImageURL('/logo.png');
  };

  return (
    <Wrapper>
      <ImgBox>
        <img src={imageURL} alt="preview" />
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

export default ImgUpload;
