import uniqid from 'uniqid';
import Application, { ApplicationModel } from '../models/application';
import { ApplicationCreateBody } from '../schemas/application';
import { ResourceNotFoundError } from '../errors/http';
import { generateSchema } from '../utils/template';

export const getAllApplicationsForUser = (owner: string): Promise<ApplicationModel[]> => {
  return Application.find({ owner }, { _id: 0, __v: 0 }).exec();
};

const prepareApplicationFromBody = (owner: string, body: ApplicationCreateBody): ApplicationModel => {
  return {
    name: body.name,
    owner,
    domain: uniqid('FD-'),
    template: {
      raw_schema: body.schema,
      schema: generateSchema(body.schema)
    },
    connectors: body.connectors || []
  };
};

export const createApplicationForUser = async (owner: string, body: ApplicationCreateBody): Promise<ApplicationModel> => {
  const application = prepareApplicationFromBody(owner, body);
  await new Application(application).save();
  return application;
};

export const getApplicationForUserByDomain = async (owner: string, domain: string): Promise<ApplicationModel> => {
  const application = await Application.findOne({ owner, domain }, { _id: 0, __v: 0 }).exec();

  if (!application) {
    throw new ResourceNotFoundError(`Application ${domain} was not found.`);
  }

  return application;
};

export const deleteApplicationForUserByDomain = async (owner: string, domain: string): Promise<void> => {
  const result = await Application.deleteOne({ owner, domain });

  if (result.deletedCount < 1) {
    throw new ResourceNotFoundError(`Application ${domain} was not found.`);
  }
};
