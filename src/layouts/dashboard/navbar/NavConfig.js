// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('menue'),

};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'Overview', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      { title: 'funds', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.analytics },
      { title: 'Product', path: PATH_DASHBOARD.general.products, icon: ICONS.ecommerce },
      { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },

    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // MANAGEMENT : USER
      {
        title: 'users',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [

          { title: 'list', path: PATH_DASHBOARD.user.list },
       
        ],
      },

    
    ],
  },

  // APP
  // ----------------------------------------------------------------------

];

export default navConfig;
