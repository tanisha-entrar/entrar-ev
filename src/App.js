// routing
import Routes from 'routes';

// project imports
import Locales from 'ui-component/Locales';
import NavigationScroll from 'layout/NavigationScroll';
import RTLLayout from 'ui-component/RTLLayout';
import Snackbar from 'ui-component/extended/Snackbar';
import ThemeCustomization from 'themes';

import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
import axios from 'axios';

axios.interceptors.request.use(
    (config) => {
        const serviceToken = window.localStorage.getItem('serviceToken');
        if (serviceToken) {
            config.headers.Authorization = `Bearer ${serviceToken}`;
        }
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    // eslint-disable-next-line arrow-body-style
    (error) => {
        return Promise.reject(error);
    }
);

axios.defaults.baseURL = 'http://192.168.68.136:5000/api';

// ==============================|| APP ||============================== //

const App = () => (
    <ThemeCustomization>
        <RTLLayout>
            <Locales>
                <NavigationScroll>
                    <AuthProvider>
                        <>
                            <Routes />
                            <Snackbar />
                        </>
                    </AuthProvider>
                </NavigationScroll>
            </Locales>
        </RTLLayout>
    </ThemeCustomization>
);

export default App;
