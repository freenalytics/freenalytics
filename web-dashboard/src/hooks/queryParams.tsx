import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useQueryParams = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const queryParams = useMemo(() => new URLSearchParams(search), [search]);

  const setQueryParam = (query: string, value: string) => {
    queryParams.set(query, value);
    navigate({ search: queryParams.toString() });
  };

  return {
    queryParams,
    setQueryParam
  };
};

export default useQueryParams;
