export const getPathForSchema = (schema: any): string[] => {
  return Object.keys(schema.properties)
    .reduce((acc: string[], key: string) => {
      return acc.concat(schema.properties[key].type !== 'object' ?
        key :
        getPathForSchema(schema.properties[key])
          .map((p: string) => `${key}.${p}`));
    }, []);
};

export type SchemaDataType = 'string' | 'string[]' | 'number' | 'number[]' | 'integer' | 'integer[]' | 'object[]' | 'boolean' | 'boolean[]' | 'null' | 'null[]';

export const getPathWithTypeForSchema = (schema: any): Record<string, SchemaDataType | null> => {
  return Object.keys(schema.properties)
    .reduce((acc: Record<string, SchemaDataType | null>, key: string) => {
      const property = schema.properties[key];
      const type = property?.type !== 'array' ? property?.type : `${property?.items?.type}[]`;

      if (type === 'object') {
        const recursiveResult = Object.entries(getPathWithTypeForSchema(schema.properties[key]))
          .reduce((acc, [p, type]) => {
            return {
              ...acc,
              [`${key}.${p}`]: type
            };
          }, {});

        return {
          ...acc,
          ...recursiveResult
        };
      }

      return {
        ...acc,
        [key]: type ?? null
      };
    }, {});
};
