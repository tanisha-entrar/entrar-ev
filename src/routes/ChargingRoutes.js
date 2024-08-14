import React, { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

const Charges = Loadable(lazy(() => import('views/charges')));
const ChargingStation = Loadable(lazy(() => import('views/charging-station')));

const ChargingRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
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
