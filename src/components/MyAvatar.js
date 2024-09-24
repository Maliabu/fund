// hooks
import useAuth from '../hooks/useAuth';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();
const userData = user.user;
   const Home =`https://fund.cyanase.app/fund/profile_pic/${userData.profile_picture}`;
    
  return (
    <Avatar
      src={Home}
      alt={userData?.username}
      color={userData?.username? 'default' : createAvatar(userData?.username).color}
      {...other}
    >
      {createAvatar(userData?.username).name}
    </Avatar>
  );
}
