const PAGES: Record<string, string> = {
  'pages.applications.title': 'Applications',
  'pages.applications.buttons.create.label': 'Create New',

  'pages.create_application.title': 'Create New Application',

  'pages.application.dashboard.title': 'Dashboard | {app}',

  'pages.login.title': 'Login',

  'pages.register.title': 'Register',
  'pages.register.disabled.header.text': 'Account registration is currently disabled.',
  'pages.register.disabled.body.description': "If you're the owner of this server, please make sure that the application has been configured to allow account registration, then try again.",
  'pages.register.disabled.buttons.login.label': 'Go to log in',
  'pages.register.complete.header.text': 'Your account has been created!',
  'pages.register.complete.body.description': 'To continue, please log in to your account.',
  'pages.register.complete.buttons.login.label': 'Go to log in',

  'pages.not_found.title': 'Not Found'
};

const COMMON: Record<string, string> = {
  'common.navbar.items.applications.text': 'My Applications',
  'common.navbar.items.login.text': 'Login',
  'common.navbar.items.sign_out.text': 'Sign Out',

  'common.footer.text': 'Freenalytics was made as a final college project. Found a bug or have a suggestion? Check out the <e>GitHub repository</e>.',

  'common.application.card.created_at.text': 'Created: {time}',
  'common.application.card.last_modified.text': 'Last modified: {time}',

  'common.alerts.empty.description.text': 'No content is available at the moment for this section.'
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
  'forms.register.errors.header.text': 'Could not complete user registration',
  'forms.register.errors.fields.username.min': 'Username length must be greater than {value}.',
  'forms.register.errors.fields.username.max': 'Username length must be less than {value}.',
  'forms.register.errors.fields.username.required': 'Username is required.',
  'forms.register.errors.fields.password.min': 'Password length must be greater than {value}.',
  'forms.register.errors.fields.password.special_characters': 'Password must have at least one special character.',
  'forms.register.errors.fields.password.lowercase': 'Password must have at least one lowercase letter.',
  'forms.register.errors.fields.password.uppercase': 'Password must have at least one uppercase letter.',
  'forms.register.errors.fields.password.whitespace': 'Password cannot contain spaces.',
  'forms.register.errors.fields.password.required': 'Password is required.',
  'forms.register.errors.fields.password_confirm.different': 'Passwords do not match.',
  'forms.register.errors.fields.password_confirm.required': 'Password confirmation is required.'
};

const ERRORS: Record<string, string> = {
  'errors.request.header.text': 'Oops!',
  'errors.request.body.description': 'An error has occurred while talking to the server. Try refreshing the page.',

  'errors.auth.login.default.message': 'Username or password is incorrect.',
  'errors.auth.register.default.message': 'Something happened when trying to create your account.',
  'errors.auth.register.user_exists.message': 'This username is already taken.',
  'errors.auth.register.locked.message': 'You cannot create a new account. Try again later.'
};

const strings: Record<string, string> = {
  ...PAGES,
  ...COMMON,
  ...FORMS,
  ...ERRORS
};

export default strings;
