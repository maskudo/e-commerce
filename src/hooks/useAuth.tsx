import {useState} from 'react';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  return {
    user,
  };
}
