const PAGES: Record<string, string> = {
  'pages.register.disabled.header.text': 'Account registration is currently disabled.',
  'pages.register.disabled.body.description': "If you're the owner of this server, please make sure that the application has been configured to allow account registration, then try again.",
  'pages.register.disabled.buttons.login.label': 'Go to log in'
};

const FORMS: Record<string, string> = {
  'forms.login.header.text': 'Log in to Freenalytics',
  'forms.login.username.label': 'Username',
  'forms.login.password.label': 'Password',
  'forms.login.buttons.login.label': 'Log in',
  'forms.login.extra.register.text': "Don't have an account yet?",
  'forms.login.errors.header.text': 'Could not log you in',

  'forms.register.header.text': 'Create an Account',
  'forms.register.username.label': 'Username',
  'forms.register.password.label': 'Password',
  'forms.register.password_confirm.label': 'Confirm Password',
  'forms.register.buttons.register.label': 'Register',
  'forms.register.errors.header.text': 'Could not complete user registration'
};

const ERRORS: Record<string, string> = {
  'errors.request.header.text': 'Oops!',
  'errors.request.body.description': 'An error has occurred while talking to the server. Try refreshing the page.',

  'errors.auth.login.message': 'Username or password is incorrect.'
};

const strings: Record<string, string> = {
  ...PAGES,
  ...FORMS,
  ...ERRORS
};

export default strings;
