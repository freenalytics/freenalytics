import { useEffect } from 'react';
import useLocale from './locale';
import { TranslateValuesForReact, MessageKey } from '../i18n';

const BASE_TITLE = 'Freenalytics';

const useTitle = (titleKey: MessageKey, values?: TranslateValuesForReact) => {
  const { t } = useLocale();

  useEffect(() => {
    document.title = `${t(titleKey, values)} - ${BASE_TITLE}`;
  }, [titleKey, values, t]);
};

export default useTitle;
