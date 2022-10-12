import React from 'react';
import { Footer as BulmaFooter, Container, Content } from 'react-bulma-components';
import useLocale from '../../../hooks/locale';
import { REPO_URL } from '../../../constants/app';

const Footer = () => {
  const { t } = useLocale();

  return (
    <BulmaFooter>
      <Container>
        <Content>
          {t('common.footer.text', {
            e: (text: string) => (
              <a href={REPO_URL}>{text}</a>
            )
          })}
        </Content>
      </Container>
    </BulmaFooter>
  );
};

export default Footer;
