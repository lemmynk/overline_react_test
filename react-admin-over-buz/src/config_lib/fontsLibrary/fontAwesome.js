import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  // Lib icon fonts
  faAlignJustify,
  faAlignLeft,
  faArrowLeft,
  faBars,
  faBookmark,
  faCaretDown,
  faCaretRight,
  faCoffee,
  faEdit,
  faHome,
  faTable,
  faTimes,
  faTrash,
  faSearch,
  faSignOutAlt,
  // Other app icon fonts
  faFlag,
} from '@fortawesome/free-solid-svg-icons';

const factory = () =>
  library.add(
    // Lib icon fonts
    faAlignJustify,
    faAlignLeft,
    faArrowLeft,
    faBars,
    faBookmark,
    faCaretDown,
    faCaretRight,
    faCoffee,
    faEdit,
    faHome,
    faTable,
    faTimes,
    faTrash,
    faSearch,
    faSignOutAlt,
    // Other app icon fonts
    faFlag,
  );

export default factory;
