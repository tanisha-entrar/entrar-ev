// third-party
import { FormattedMessage } from 'react-intl';

// assets
import BikeScooterIcon from '@mui/icons-material/BikeScooter';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import EvStationIcon from '@mui/icons-material/EvStation';
import ElectricScooterIcon from '@mui/icons-material/ElectricScooter';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

const menus = {
    id: 'application',
    type: 'group',
    children: []
};
const adminMenu = () => {
    const masterData = [
        {
            id: 'master-setup',
            title: <FormattedMessage id="Master Setup" />,
            icon: EvStationIcon,
            type: 'collapse',
            children: [
                {
                    id: 'vehicle-type',
                    title: <FormattedMessage id="Vehicle Type" />,
                    type: 'item',
                    url: '/vehicle-type',
                    icon: BikeScooterIcon,
                    breadcrumbs: true
                },
                {
                    id: 'vehicles',
                    title: <FormattedMessage id="Vehicles" />,
                    type: 'item',
                    url: '/vehicles',
                    icon: ElectricScooterIcon,
                    breadcrumbs: true
                },
                {
                    id: 'charges',
                    title: <FormattedMessage id="Charges" />,
                    type: 'item',
                    url: '/charges',
                    icon: ElectricalServicesIcon,
                    breadcrumbs: true
                },
                {
                    id: 'charging-station',
                    title: <FormattedMessage id="Charging Station" />,
                    type: 'item',
                    url: '/charging-stations',
                    icon: EvStationIcon,
                    breadcrumbs: true
                }
            ]
        },
        {
            id: 'bookings',
            title: <FormattedMessage id="Bookings" />,
            type: 'item',
            url: '/bookings',
            icon: BookOnlineIcon,
            children: []
        }
    ];
    menus.children = masterData;
};
const role = localStorage.getItem('role');
if (role === 'ROLE_USER') {
    adminMenu();
}
// const menus = {
// id: 'master-setup',
// title: <FormattedMessage id="master-setup" />,
// icon: EvStationIcon,
// type: 'group',
// children: [
//         {
//             id: 'vehicles',
//             title: <FormattedMessage id="Vehicles" />,
//             type: 'item',
//             url: '/vehicles',
//             icon: ElectricScooterIcon,
//             breadcrumbs: false
//         },
//         {
//             id: 'charges',
//             title: <FormattedMessage id="Charges" />,
//             type: 'item',
//             url: '/charges',
//             icon: ElectricalServicesIcon,
//             breadcrumbs: false
//         },
//         {
//             id: 'charging-station',
//             title: <FormattedMessage id="Charging Station" />,
//             type: 'item',
//             url: '/charging-stations',
//             icon: EvStationIcon,
//             breadcrumbs: false
//         }
//     ]
// };

export default menus;
