import { useSelector } from 'react-redux';
import ProfileCard from '../../components/common/ProfileCard';

const ProfileCardContainer = ({ email }) => {
  const userEmail = useSelector(state => state.user.user?.email);
  const props = {
    profileImg: `${process.env.PUBLIC_URL}/logo.png`,
    email,
    nickName: 'test',
    provider: 'local',
    follower: '80K',
    like: '803K',
    recipe: '1.4K',
    isMine: userEmail === email,
  };
  return <ProfileCard props={props} />;
};

export default ProfileCardContainer;
