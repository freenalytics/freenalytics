const FORMS: Record<string, string> = {
  'forms.login.header.text': 'Log in to Freenalytics',
  'forms.login.username.label': 'Username',
  'forms.login.password.label': 'Password',
  'forms.login.buttons.login.label': 'Log in',
  'forms.login.extra.register.text': "Don't have an account yet?",

  'forms.register.header.text': 'Create an Account',
  'forms.register.username.label': 'Username',
  'forms.register.password.label': 'Password',
  'forms.register.password_confirm.label': 'Confirm Password',
  'forms.register.buttons.register.label': 'Register'
};

const ERRORS: Record<string, string> = {
  'errors.request.header.text': 'Oops!',
  'errors.request.body.description': 'An error has occurred while talking to the server. Try refreshing the page.'
};

const strings: Record<string, string> = {
  ...FORMS,
  ...ERRORS
};

export default strings;
