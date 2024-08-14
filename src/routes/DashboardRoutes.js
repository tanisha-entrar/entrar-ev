import React, { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import SuperAdmin from 'middleware/roles/SuperAdmin';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import AdminDashboard from 'views/dashboard/Admin';

const DashboardRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/dashboard/admin',
            element: (
                <SuperAdmin>
                    <AdminDashboard />
                </SuperAdmin>
            )
        }
    ]
};
export default DashboardRoutes;
