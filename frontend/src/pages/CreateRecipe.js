import HeaderContainer from '../container/common/HeaderContainer';
import CreateTemp from '../components/main/create/CreateTemp';
import CreateContainer from '../container/create/CreateContainer';

const CreateRecipe = () => {
  return (
    <div>
      <HeaderContainer />
      <CreateTemp>
        <CreateContainer />
      </CreateTemp>
    </div>
  );
};

export default CreateRecipe;
