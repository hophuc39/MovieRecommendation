import { auth } from '../firebaseSetup';

export const getAuthToken = async (): Promise<string | null> => {
  const user = auth.currentUser;
  if (!user) {
    return null;
  }
  return await user.getIdToken();
};

export const attachAuthHeader = async () => {
  const token = await getAuthToken();
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
}; 