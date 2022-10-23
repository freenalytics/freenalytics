export const PUBLIC_ROUTES = {
  login: '/login',
  register: '/register'
};

export const PROTECTED_ROUTES = {
  applications: '/',
  createApplication: '/create'
};

export const DYNAMIC_PROTECTED_ROUTES = {
  applicationDashboard: (domain: string) => `/application/${domain}`,
  applicationInformation: (domain: string) => `/application/${domain}/information`,
  applicationSettings: (domain: string) => `/application/${domain}/settings`
};
