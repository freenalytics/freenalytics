import { library } from '@fortawesome/fontawesome-svg-core';
import { faServer, faMobileScreen, faEarthAmericas, faDesktop, faRobot } from '@fortawesome/free-solid-svg-icons';
import { faFaceSurprise } from '@fortawesome/free-regular-svg-icons';

export const loadIcons = () => {
  library.add(faServer, faFaceSurprise, faMobileScreen, faEarthAmericas, faDesktop, faRobot);
};
