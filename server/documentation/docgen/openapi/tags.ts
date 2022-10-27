import { DocumentationData } from '../../documentation';

export const generateTagDescription = (tag: string) => {
  return `This section contains the supported operations for ${tag}.`;
};

export const generateTags = (documentation: DocumentationData) => {
  return Object.keys(documentation.paths).map((tag) => {
    return {
      name: tag,
      description: generateTagDescription(tag)
    };
  });
};
