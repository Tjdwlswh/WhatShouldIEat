import ImgUpload from '../../components/common/ImgUpload';
/*
  <ImgUploadContainer onImageSelected={handleImageSelected} />
  콜백함수를 prop으로 전달해서 const handleImageSelected = (file) => {} 로 사용
  API 통신 이후 file 초기화 필수
*/
const ImgUploadContainer = ({ onImageSelected, imgSrc }) => {
  return <ImgUpload onImageSelected={onImageSelected} imgSrc={imgSrc} />;
};

export default ImgUploadContainer;
