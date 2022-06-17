import { SESSION_KEY__TOKEN } from '../app-constants';

export const getAuthHeader = () => {
  const token = sessionStorage.getItem(SESSION_KEY__TOKEN);

  return {
    authorization: `Bearer ${token}`,
  };
};
