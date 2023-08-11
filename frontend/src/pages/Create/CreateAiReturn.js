import CreateAiReturnTemp from '../../components/main/create/CreateAiReturnTemp';
import CreateAiReturnForm from '../../components/main/create/CreateAiReturnForm';
import { Helmet } from 'react-helmet-async';

const CreateAiReturn = () => {
  return (
    <div>
      <Helmet>
        <title>AI레시피 생성 - 뭐해먹지?</title>
      </Helmet>
      <CreateAiReturnTemp>
        <CreateAiReturnForm />
      </CreateAiReturnTemp>
    </div>
  );
};

export default CreateAiReturn;
