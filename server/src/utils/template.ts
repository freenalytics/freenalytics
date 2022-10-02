import yml from 'yaml';

export const generateSchema = (ymlSchema: string): object => {
  return yml.parse(ymlSchema);
};
