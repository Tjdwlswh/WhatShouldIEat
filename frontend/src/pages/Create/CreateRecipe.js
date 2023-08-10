import CreateTemp from '../../components/main/create/CreateTemp';
import CreateContainer from '../../container/create/CreateContainer';
import { Helmet } from 'react-helmet-async';

const CreateRecipe = () => {
  return (
    <div>
      <Helmet>
        <title>레시피 생성 - 뭐해먹지?</title>
      </Helmet>
      <CreateTemp>
        <CreateContainer />
      </CreateTemp>
    </div>
  );
};

export default CreateRecipe;
