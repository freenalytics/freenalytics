import { useEffect } from 'react';
import useLocale from './locale';

const BASE_TITLE = 'Freenalytics';

const useTitle = (titleKey: string) => {
  const { t } = useLocale();

  useEffect(() => {
    document.title = `${t(titleKey)} - ${BASE_TITLE}`;
  }, [titleKey, t]);
};

export default useTitle;
