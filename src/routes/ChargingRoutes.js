import React, { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

const VehicleType = Loadable(lazy(() => import('views/master-setup/vehicle-type')));
const Vehicles = Loadable(lazy(() => import('views/master-setup/vehicles')));
const Charges = Loadable(lazy(() => import('views/master-setup/charges')));
const ChargingStation = Loadable(lazy(() => import('views/master-setup/charging-station')));
const StationBookings = Loadable(lazy(() => import('views/bookings')));

const ChargingRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/vehicle-type',
            element: <VehicleType />
        },
        {
            path: '/vehicles',
            element: <Vehicles />
        },
        {
            path: '/charging-stations',
            element: <ChargingStation />
        },
        {
            path: '/charges',
            element: <Charges />
        },
        {
            path: '/bookings',
            element: <StationBookings />
        }
    ]
};
export default ChargingRoutes;
