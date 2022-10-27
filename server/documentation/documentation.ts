import pkg from '../../package.json';
import { DocumentationMetadata, DocumentationInfo } from './types';

import registrationOpen from './routes/auth/registrationOpen';
import register from './routes/auth/register';
import login from './routes/auth/login';
import changePassword from './routes/auth/changePassword';

import getAllUsers from './routes/users/getAllUsers';
import getCurrentUser from './routes/users/getCurrentUser';
import updateCurrentUser from './routes/users/updateCurrentUser';
import getUserByUsername from './routes/users/getUserByUsername';

import getAllApplicationsForUser from './routes/applications/getAllApplicationsForUser';
import createApplicationForUser from './routes/applications/createApplicationForUser';
import getApplicationByDomain from './routes/applications/getApplicationByDomain';
import updateApplicationByDomain from './routes/applications/updateApplicationByDomain';
import deleteApplicationByDomain from './routes/applications/deleteApplicationByDomain';

import createApplicationData from './routes/applications/createApplicationData';
import getApplicationData from './routes/applications/getApplicationData';

const metadata: DocumentationMetadata = {
  openapi: '3.0.2',
  servers: [
    { url: 'https://$API_URL' }
  ]
};

const info: DocumentationInfo = {
  title: 'Freenalytics API',
  description: 'This site contains the documentation for the Freenalytics API.',
  version: pkg.version
};

const documentationData = {
  metadata,
  info,
  paths: {
    Auth: {
      registrationOpen,
      register,
      login,
      changePassword
    },

    User: {
      getAllUsers,
      getCurrentUser,
      updateCurrentUser,
      getUserByUsername
    },

    Application: {
      getAllApplicationsForUser,
      createApplicationForUser,
      getApplicationByDomain,
      updateApplicationByDomain,
      deleteApplicationByDomain,

      createApplicationData,
      getApplicationData
    }
  }
};

export default documentationData;
export type DocumentationData = typeof documentationData;
