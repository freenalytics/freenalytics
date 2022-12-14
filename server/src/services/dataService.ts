import { parseAsync } from 'json2csv';
import redisClient from '../redis/client';
import Data, { DataModel } from '../models/data';
import Application from '../models/application';
import { getPathForTemplate } from '../utils/template';
import { ResourceNotFoundError } from '../errors/http';
import { WithPagination } from '../models/types';

export interface GetDataOptions {
  limit: number
  start: number
}

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
  const data = { domain, payload: validData } as DataModel;
  await new Data(data).save();
  return data;
};

export const getDataForApplicationForUser = async (domain: string, owner: string, options: GetDataOptions): Promise<WithPagination<DataModel[]>> => {
  const application = await Application.findOne({ domain, owner });
  if (!application) {
    throw new ResourceNotFoundError(`Application ${domain} was not found.`);
  }

  const numOfDocuments = await Data.countDocuments({ domain });

  if (numOfDocuments < options.start) {
    throw new ResourceNotFoundError(`Start cursor out of bounds. There are only ${numOfDocuments} data entries.`);
  }

  const result = await Data.find({ domain }, { _id: 0, __v: 0 })
    .sort({ createdAt: -1 })
    .skip(options.start)
    .limit(options.limit)
    .exec();

  return {
    result,
    pagination: {
      limit: options.limit,
      current: options.start,
      previous: Math.max(0, options.start - options.limit),
      next: Math.min(numOfDocuments - 1, options.start + options.limit),
      total: numOfDocuments,
      isLast: options.start + options.limit >= numOfDocuments
    }
  };
};

export const getDataForApplicationForUserAsCsv = async (domain: string, owner: string): Promise<string> => {
  const application = await Application.findOne({ domain, owner });
  if (!application) {
    throw new ResourceNotFoundError(`Application ${domain} was not found.`);
  }

  const schema = await getApplicationSchema(domain);
  const data = await Data.find({ domain }, { _id: 0, __v: 0 });

  const fields = ['createdAt', ...getPathForTemplate(schema)];
  const dataTransformer = (entry: DataModel) => {
    return {
      createdAt: entry.createdAt,
      ...entry.payload
    };
  };

  return await parseAsync(data, { fields, transforms: [dataTransformer] });
};
