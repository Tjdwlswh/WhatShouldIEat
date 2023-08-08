import ImgUpload from '../../components/common/ImgUpload';
/* 
  업로더를 호출하는 곳에 아래와 같이 작성 
    const [image, setImage] = useState(null);
    const handleImageSelected = file => {
      setImage(file);
    };
    <ImgUploadContainer onImageSelected={handleImageSelected} imgSrc={imgSrc}/>

  콜백함수를 prop으로 전달해서 사용
  API 통신 이후 file 초기화 필수 => setImage(null);
*/
const ImgUploadContainer = ({ onImageSelected, imgSrc }) => {
  return <ImgUpload onImageSelected={onImageSelected} imgSrc={imgSrc} />;
};

export default ImgUploadContainer;
