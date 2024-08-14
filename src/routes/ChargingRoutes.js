import React, { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

const Vehicles = Loadable(lazy(() => import('views/master-setup/vehicles')));
const Charges = Loadable(lazy(() => import('views/master-setup/charges')));
const ChargingStation = Loadable(lazy(() => import('views/master-setup/charging-station')));

const ChargingRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
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
        }
    ]
};
export default ChargingRoutes;
