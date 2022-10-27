const genericRef = (component: string, name: string) => {
  return `#/components/${component}/${name}`;
};

export const schemaRef = (schemaName: string) => {
  return genericRef('schemas', schemaName);
};

export const requestBodyRef = (schemaName: string) => {
  return genericRef('requestBodies', schemaName);
};

export const exampleRef = (schemaName: string) => {
  return genericRef('examples', schemaName);
};
