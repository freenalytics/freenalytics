import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faServer, faMobileScreen, faEarthAmericas, faDesktop, faRobot,
  faHouse, faWrench, faArrowRight, faArrowLeft, faUser,
  faKey, faFont, faCode, faCircleInfo
} from '@fortawesome/free-solid-svg-icons';
import { faFaceSurprise } from '@fortawesome/free-regular-svg-icons';

export const loadIcons = () => {
  library.add(
    faServer, faFaceSurprise, faMobileScreen, faEarthAmericas, faDesktop,
    faRobot, faHouse, faWrench, faArrowRight, faArrowLeft,
    faUser, faKey, faFont, faCode, faCircleInfo
  );
};
