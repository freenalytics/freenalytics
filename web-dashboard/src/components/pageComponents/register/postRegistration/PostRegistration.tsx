import React from 'react';
import { Box, Heading, Button } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import useLocale from '../../../../hooks/locale';
import { PUBLIC_ROUTES } from '../../../../constants/routes';

const PostRegistration: React.FC = () => {
  const { t } = useLocale();

  return (
    <Box className="registration-complete">
      <Heading textAlign="center" size={5}>
        {t('pages.register.complete.header.text')}
      </Heading>

      <p>
        {t('pages.register.complete.body.description')}
      </p>

      <Button.Group align="center">
        <Button color="primary" renderAs={Link} to={PUBLIC_ROUTES.login}>
          {t('pages.register.complete.buttons.login.label')}
        </Button>
      </Button.Group>
    </Box>
  );
};

export default PostRegistration;
