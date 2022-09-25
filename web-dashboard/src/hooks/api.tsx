import { useContext } from 'react';
import AppContext from '../context/AppContext';

const useApi = () => {
  const context = useContext(AppContext);

  return {
    client: context!.client
  };
};

export default useApi;
