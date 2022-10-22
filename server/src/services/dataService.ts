import Data, { DataModel } from '../models/data';

export const createDataForApplication = async (domain: string, validData: object): Promise<DataModel> => {
  return await new Data({ domain, payload: validData }).save();
};
