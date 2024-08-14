// third-party
import { FormattedMessage } from 'react-intl';

// assets
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import EvStationIcon from '@mui/icons-material/EvStation';
import ElectricScooterIcon from '@mui/icons-material/ElectricScooter';

const menus = {
    id: 'master-setup',
    title: <FormattedMessage id="master-setup" />,
    icon: EvStationIcon,
    type: 'group',
    children: [
        {
            id: 'vehicles',
            title: <FormattedMessage id="Vehicles" />,
            type: 'item',
            url: '/vehicles',
            icon: ElectricScooterIcon,
            breadcrumbs: false
        },
        {
            id: 'charges',
            title: <FormattedMessage id="Charges" />,
            type: 'item',
            url: '/charges',
            icon: ElectricalServicesIcon,
            breadcrumbs: false
        },
        {
            id: 'charging-station',
            title: <FormattedMessage id="Charging Station" />,
            type: 'item',
            url: '/charging-stations',
            icon: EvStationIcon,
            breadcrumbs: false
        }
    ]
};

export default menus;
