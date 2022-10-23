import redisClient from '../redis/client';
import Data, { DataModel } from '../models/data';
import Application from '../models/application';
import { ResourceNotFoundError } from '../errors/http';

export const getApplicationSchema = async (domain: string): Promise<object> => {
  const key = `${domain}:schema`;
  const cacheHit = await redisClient.exists(key);

  if (cacheHit) {
    const cachedSchema = await redisClient.get(key);
    return JSON.parse(cachedSchema!);
  }

  const application = await Application.findOne({ domain }).exec();

  if (!application) {
    throw new ResourceNotFoundError(`Application ${domain} was not found.`);
  }

  await redisClient.set(key, JSON.stringify(application.template.schema));
  return application.template.schema;
};

export const createDataForApplication = async (domain: string, validData: object): Promise<DataModel> => {
  return await new Data({ domain, payload: validData }).save();
};
