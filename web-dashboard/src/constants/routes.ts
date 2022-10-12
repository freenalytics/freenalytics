export const PUBLIC_ROUTES = {
  login: '/login',
  register: '/register'
};

export const PROTECTED_ROUTES = {
  applications: '/'
};

export const DYNAMIC_PROTECTED_ROUTES = {
  application: (domain: string) => `/application/${domain}`
};
