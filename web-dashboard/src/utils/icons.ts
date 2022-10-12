import { library } from '@fortawesome/fontawesome-svg-core';
import { faServer } from '@fortawesome/free-solid-svg-icons';
import { faFaceSurprise } from '@fortawesome/free-regular-svg-icons';

export const loadIcons = () => {
  library.add(faServer, faFaceSurprise);
};
