const PAGES = {
  'pages.applications.title': 'Applications',
  'pages.applications.buttons.create.label': 'Create New',

  'pages.create_application.title': 'Create New Application',
  'pages.create_application.instructions.header.text': 'Some Information',
  'pages.create_application.instructions.description.1.text': 'Fill out this form to create an application to track the information you specify in the template section.',
  'pages.create_application.instructions.description.2.text': 'The template should be a JSONSchema written in YML. The idea is that you define the structure of the data that will be uploaded in the future. This schema will be used for validation when uploading data to the platform.',
  'pages.create_application.instructions.description.3.text': 'Keep in mind that the template cannot be updated once you create the application. If for some reason you need to update the template then create a new application. Updating the template implies that the previously saved data will be invalid and hence defeat the purpose of the schema validation.',
  'pages.create_application.instructions.description.4.text': 'The connectors section corresponds to pre-made libraries that can be used to interface with your application schema. Since you are the one that needs to implement the client to upload the data to the platform, it makes sense to create a reusable solution for multiple applications that make use of the same template.',
  'pages.create_application.instructions.description.5.text': 'Official templates and connectors are coming soon.',

  'pages.application.dashboard.title': 'Dashboard | {app}',
  'pages.application.settings.title': 'Settings | {app}',
  'pages.application.settings.header.text': 'Settings',
  'pages.application.settings.success.description.text': 'Your application has updated successfully.',

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

const COMMON = {
  'common.navbar.items.applications.text': 'My Applications',
  'common.navbar.items.login.text': 'Login',
  'common.navbar.items.sign_out.text': 'Sign Out',

  'common.footer.text': 'Freenalytics was made as a final college project. Found a bug or have a suggestion? Check out the <e>GitHub repository</e>.',

  'common.application.card.created_at.text': 'Created: {time}',
  'common.application.card.last_modified.text': 'Last modified: {time}',

  'common.application_sidebar.items.dashboard.text': 'Dashboard',
  'common.application_sidebar.items.settings.text': 'Settings',

  'common.alerts.empty.description.text': 'No content is available at the moment for this section.',

  'common.form.application_type_picker.mobile.text': 'Mobile',
  'common.form.application_type_picker.web.text': 'Web',
  'common.form.application_type_picker.server.text': 'Server',
  'common.form.application_type_picker.desktop.text': 'Desktop',
  'common.form.application_type_picker.other.text': 'Other',

  'common.form.application_connectors_form_field.label': 'Connectors',
  'common.form.application_connectors_form_field.package_url.label': 'Package URL',
  'common.form.application_connectors_form_field.language.label': 'Language',
  'common.form.application_connectors_form_field.buttons.add.label': 'Add Connector'
};

const FORMS = {
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
  'forms.register.errors.fields.password_confirm.required': 'Password confirmation is required.',

  'forms.create_application.name.label': 'Application Name',
  'forms.create_application.type.label': 'Application Type',
  'forms.create_application.schema.label': 'Template Schema',
  'forms.create_application.schema.placeholder': 'Write your JSONSchema in YML here.',
  'forms.create_application.buttons.create.label': 'Create',
  'forms.create_application.errors.header.text': 'Could not create your application',
  'forms.create_application.errors.fields.name.required': 'Application name is required.',
  'forms.create_application.errors.fields.type.valid': 'Invalid application type, can only be one of: {types}',
  'forms.create_application.errors.fields.type.required': 'Application type is required.',
  'forms.create_application.errors.fields.schema.required': 'Application schema is required.',
  'forms.create_application.errors.fields.connectors.package_url.uri': 'Connector package URL must be a valid URL.',
  'forms.create_application.errors.fields.connectors.package_url.required': 'Connector package URL is required.',
  'forms.create_application.errors.fields.connectors.language.required': 'Connector language is required.',

  'forms.application_settings.name.label': 'Application Name',
  'forms.application_settings.type.label': 'Application Type',
  'forms.application_settings.buttons.save.label': 'Save',
  'forms.application_settings.errors.header.text': 'Could not save your application settings',
  'forms.application_settings.errors.fields.name.required': 'Application name cannot be empty.',
  'forms.application_settings.errors.fields.type.valid': 'Invalid application type, can only be one of: {types}',
  'forms.application_settings.errors.fields.type.required': 'Application type is required.',
  'forms.application_settings.errors.fields.connectors.package_url.uri': 'Connector package URL must be a valid URL.',
  'forms.application_settings.errors.fields.connectors.package_url.required': 'Connector package URL is required.',
  'forms.application_settings.errors.fields.connectors.language.required': 'Connector language is required.'
};

const ERRORS = {
  'errors.request.header.text': 'Oops!',
  'errors.request.body.description': 'An error has occurred while talking to the server. Try refreshing the page.',

  'errors.auth.login.default.message': 'Username or password is incorrect.',
  'errors.auth.register.default.message': 'Something happened when trying to create your account.',
  'errors.auth.register.user_exists.message': 'This username is already taken.',
  'errors.auth.register.locked.message': 'You cannot create a new account. Try again later.'
};

const strings = {
  ...PAGES,
  ...COMMON,
  ...FORMS,
  ...ERRORS
};

export default strings;
