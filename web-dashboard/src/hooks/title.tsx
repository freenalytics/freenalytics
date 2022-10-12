import { useEffect } from 'react';
import useLocale from './locale';
import { TranslateValuesForReact } from '../i18n';

const BASE_TITLE = 'Freenalytics';

const useTitle = (titleKey: string, values?: TranslateValuesForReact) => {
  const { t } = useLocale();

  useEffect(() => {
    document.title = `${t(titleKey, values)} - ${BASE_TITLE}`;
  }, [titleKey, values, t]);
};

export default useTitle;
