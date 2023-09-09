import {useAuth} from '../hooks/useAuth';
import AuthStack from './authStack';
import UserStack from './userStack';

export default function NavigationIndex() {
  const {user} = useAuth();
  return user ? <UserStack /> : <AuthStack />;
}
