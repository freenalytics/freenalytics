import { useContext } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import AppContext from '../context/AppContext';

const useApi = () => {
  const context = useContext(AppContext);
  const queryClient = useQueryClient();

  return {
    client: context!.client,
    queryClient
  };
};

export default useApi;
