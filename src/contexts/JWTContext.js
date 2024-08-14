import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// third-party
import { Chance } from 'chance';
import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'ui-component/Loader';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { openSnackbar } from 'store/slices/snackbar';
// import axios from 'utils/axios';
// eslint-disable-next-line import/no-unresolved, import/extensions

const chance = new Chance();

// constant
const initialState = {
    isLoggedIn: window.localStorage.getItem('isLoggedIn'),
    isInitialized: false,
    user: null
};

const verifyToken = (serviceToken) => {
    if (!serviceToken) {
        return false;
    }
    const decoded = jwtDecode(serviceToken);
    /**
     * Property 'exp' does not exist on type '<T = unknown>(token, options?: JwtDecodeOptions | undefined) => T'.
     */
    return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken) => {
    if (serviceToken) {
        localStorage.setItem('serviceToken', serviceToken);
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
    } else {
        localStorage.removeItem('serviceToken');
        delete axios.defaults.headers.common.Authorization;
    }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);
    const navigate = useNavigate();
    const role = localStorage.getItem('role');

    useEffect(() => {
        const init = async () => {
            try {
                const response = await axios.get('/v1/user/me', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('serviceToken')}`,
                        'Content-Type': 'application/json'
                    }
                });

                localStorage.setItem('emailVerified', response.data.data.emailVerified);
                localStorage.setItem('userTypes', response.data.data.userType);
                localStorage.setItem('userName', response.data.data.userName);
                dispatch({
                    ...state,
                    type: LOGIN,
                    payload: {
                        isLoggedIn: window.localStorage.getItem('isLoggedIn'),
                        user: response.data.data
                    }
                });
            } catch (err) {
                dispatch({
                    type: LOGOUT
                });
            }
        };
        init();
    }, []);

    const login = async (username, password) => {
        const response = await axios.post(`/v1/auth/signin`, {
            username,
            password
        });
        console.log(response?.data, 'responseeee');
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('role', response.data.role[0].roleName);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('id', response.data.id);
        localStorage.setItem('userTypes', response.data.userType);
        localStorage.setItem('userName', response.data.userName);
        setSession(response.data.token);
        dispatch({
            type: LOGIN,
            payload: {
                isLoggedIn: true,
                user: response.data
            }
        });
    };

    const register = async (email, password, firstName, lastName) => {
        const id = chance.bb_pin();
        const response = await axios.post('/api/account/register', {
            id,
            email,
            password,
            firstName,
            lastName
        });
        let users = response.data;

        if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
            const localUsers = window.localStorage.getItem('users');
            users = [
                ...JSON.parse(localUsers),
                {
                    id,
                    email,
                    password,
                    name: `${firstName} ${lastName}`
                }
            ];
        }

        window.localStorage.setItem('users', JSON.stringify(users));
    };

    const logout = () => {
        setSession(null);
        // localStorage.removeItem('isLoggedIn');
        localStorage.clear();
        dispatch({ type: LOGOUT });
    };

    const resetPassword = (Password, token) => {
        const data = {
            password: Password,
            username: token
        };
        axios
            .post(`/v1/auth/password/change`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('role', response.data.role[0].roleName);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('id', response.data.id);
                localStorage.setItem('userTypes', response.data.userType);
                localStorage.setItem('userName', response.data.userName);
                setSession(response.data.token);
                if (response.data.firstLogin === false) {
                    dispatch({
                        type: LOGIN,
                        payload: {
                            isLoggedIn: true,
                            user: response.data
                        }
                    });
                    window.location.reload();
                }
            })
            .catch((error) => {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Somthing went wrong',
                        variant: 'alert',
                        alert: {
                            color: 'error'
                        },
                        close: false
                    })
                );
            });
    };

    const updateProfile = () => {};

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>
    );
};

JWTProvider.propTypes = {
    children: PropTypes.node
};

export default JWTContext;
