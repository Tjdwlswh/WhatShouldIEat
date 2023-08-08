/*
  const [imageError, setImageError] = useState(false);
  const imgAttribute = imgSrcConverter(imgSrc, imageError, setImageError);
  img태그 호출하는 곳에서 위와 같이 작성 후 매개변수로 호출
  <img {...imgAttribute} alt="사진" />
 */
const imgSrcConverter = (imgSrc, imageError, setImageError) => {
  let imgUrl;
  if (imgSrc) {
    if (imgSrc.startsWith('http')) {
      imgUrl = imgSrc;
    } else {
      imgUrl = `${process.env.REACT_APP_BACK_URL}/uploads/${imgSrc}`;
    }
  } else {
    imgUrl = `${process.env.PUBLIC_URL}/logo.png`;
  }

  const handleImageError = () => {
    setImageError(true);
  };

  return {
    src: imageError ? `${process.env.PUBLIC_URL}/logo.png` : imgUrl,
    onError: handleImageError,
  };
};

export default imgSrcConverter;
