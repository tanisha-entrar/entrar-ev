import { Navigate, useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import Loadable from 'ui-component/Loadable';
import DashboardRoutes from './DashboardRoutes';
import ChargingRoutes from './ChargingRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([
        { path: '/', element: <Navigate to="/login" replace /> },
        AuthenticationRoutes,
        LoginRoutes,
        MainRoutes,
        DashboardRoutes,
        ChargingRoutes
    ]);
}
