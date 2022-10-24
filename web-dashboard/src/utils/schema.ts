export const getPathForSchema = (schema: any): string[] => {
  return Object.keys(schema.properties)
    .reduce((acc: string[], key: string) => {
      return acc.concat(schema.properties[key].type !== 'object' ?
        key :
        getPathForSchema(schema.properties[key])
          .map((p: string) => `${key}.${p}`));
    }, []);
};
