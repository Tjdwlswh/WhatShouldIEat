import { useState } from 'react';
import ImgComponent from '../../components/common/ImgComponent';
/*
  <ImgContainer onImageSelected={handleImageSelected} />
  콜백함수를 prop으로 전달해서 const handleImageSelected = (file) => {} 로 사용
*/
const ImgContainer = ({ onImageSelected }) => {
  return <ImgComponent onImageSelected={onImageSelected} />;
};

export default ImgContainer;
