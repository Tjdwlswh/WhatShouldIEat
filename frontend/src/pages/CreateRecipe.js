import HeaderContainer from '../container/common/HeaderContainer';
import CreateTemp from '../components/main/create/CreateTemp';
import CreateForm from '../components/main/create/CreateForm';

const CreateRecipe = () => {
  return (
    <div>
      <HeaderContainer />
      <CreateTemp>
        <CreateForm />
      </CreateTemp>
    </div>
  );
};

export default CreateRecipe;
