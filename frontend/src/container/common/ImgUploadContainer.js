import ImgUpload from '../../components/common/ImgUpload';
/*
  <ImgUploadContainer onImageSelected={handleImageSelected} />
  콜백함수를 prop으로 전달해서 const handleImageSelected = (file) => {} 로 사용
*/
const ImgUploadContainer = ({ onImageSelected }) => {
  return <ImgUpload onImageSelected={onImageSelected} />;
};

export default ImgUploadContainer;
