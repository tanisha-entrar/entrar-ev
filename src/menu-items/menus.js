// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons';

// constant
const icons = {
    IconDashboard,
    IconDeviceAnalytics
};

const menus = {
    id: 'master-setup',
    title: <FormattedMessage id="master-setup" />,
    icon: icons.IconDashboard,
    type: 'group',
    children: [
        {
            id: 'charges',
            title: <FormattedMessage id="Charges" />,
            type: 'item',
            url: '/charges',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'charging-station',
            title: <FormattedMessage id="Charging Station" />,
            type: 'item',
            url: '/charging-stations',
            icon: icons.IconDeviceAnalytics,
            breadcrumbs: false
        }
    ]
};

export default menus;
