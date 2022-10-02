import Application, { ApplicationModel } from '../models/application';

export const getAllApplicationsForUser = (owner: string): Promise<ApplicationModel[]> => {
  return Application.find({ owner }, { _id: 0, __v: 0 }).exec();
};
