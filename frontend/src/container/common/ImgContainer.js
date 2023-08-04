import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { setFile } from '../../modules/file';
import ImgComponent from '../../components/common/ImgComponent';

const ImgContainer = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState({
    image_file: {},
    preview_URL: 'logo.png',
  });

  useEffect(() => {
    dispatch(setFile(image.image_file));
  }, [dispatch, image]);

  return <ImgComponent image={image} setImage={setImage} />;
};

export default ImgContainer;
