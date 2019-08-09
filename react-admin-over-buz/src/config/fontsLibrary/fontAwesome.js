import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons'
/*
Usage:
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
*/
import {
  // Lib icon fonts
  faAlignJustify,
  faAlignLeft,
  faArrowDown,
  faArrowLeft,
  faArrowUp,
  faBars,
  // faCalendar,
  // faCalendarAlt,
  faCaretDown,
  faCaretRight,
  faCoffee,
  faEdit,
  // faExclamationTriangle,
  faHome,
  // faLanguage,
  // faLink,
  // faLock,
  faSpinner,
  // faTable,
  faTimes,
  faTrash,
  // faTv,
  faSearch,
  faSignOutAlt,
  // Other app icon fonts
  // faBookmark,
  // faDirections,
  // faFlag,
  // faPager,
  // faWindowRestore,
} from '@fortawesome/free-solid-svg-icons';

const factory = () =>
  library.add(
    // Lib icon fonts
    faAlignJustify,
    faAlignLeft,
    faArrowDown,
    faArrowLeft,
    faArrowUp,
    faBars,
    // faCalendar,
    // faCalendarAlt,
    faCaretDown,
    faCaretRight,
    faCoffee,
    faEdit,
    // faExclamationTriangle,
    faHome,
    // faLanguage,
    // faLink,
    // faLock,
    faSpinner,
    // faTable,
    faTimes,
    faTrash,
    // faTv,
    faSearch,
    faSignOutAlt,
    // Other app icon fonts
    // faBookmark,
    // faDirections,
    // faFlag,
    // faPager,
    // faWindowRestore,
  );

export default factory;
