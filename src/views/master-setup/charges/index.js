/* eslint-disable no-use-before-define */
import axios from 'axios';
import useMessageDispatcher from 'hooks/useMessageDispatcher';
import React, { useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Add from './Add';
import List from './List';

const initialValues = {
    renderType: 'ADD',
    id: '',
    type: '',
    port: '',
    latitude: '',
    longitude: '',
    chargesList: []
};

const validationSchema = yup.object().shape({
    type: yup.string().required('Vehicle Type is required'),
    port: yup.string().required('Port Type is required')
});

const Charges = () => {
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [error, setError] = useState(null);
    const [renderType, setRenderType] = useState('LIST');
    const [isLoading, setIsLoading] = useState(false);
    const showMessage = useMessageDispatcher();
    const formikRef = useRef();
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
                        setLatitude(latitude);
                        setLongitude(longitude);
                    } catch (error) {
                        setError('Error fetching location details');
                    }
                },
                (error) => {
                    setError(error.message);
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    };

    const handleAddCharges = async (values) => {
        const payload = {
            id: values?.id,
            type: values?.type,
            port: values?.port,
            latitude,
            longitude
        };
        try {
            const response = await axios.post(`/v1/charging-station/add-update/charges`, payload);
            if (response.status === 200) {
                setRenderType('LIST');
                fetchCharges();
            }
        } catch (error) {
            if (!error.response) {
                showMessage({ message: error.message, color: 'error' });
            } else {
                showMessage({ message: error.response.data.Msg, color: 'error' });
            }
        }
    };
    const fetchCharges = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/v1/charging-station/charges/list`);
            if (response.status === 200) {
                setIsLoading(false);
                if (response.data.code !== '403') {
                    formikRef?.current?.setFieldValue(`chargesList`, response?.data?.data);
                }
            }
        } catch (error) {
            setIsLoading(false);
            if (!error.response) {
                showMessage({ message: error.message, color: 'error' });
            } else {
                showMessage({ message: error.response.data.Msg, color: 'error' });
            }
        }
    };
    useEffect(() => {
        fetchCharges();
        getLocation();
    }, []);
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} innerRef={formikRef} onSubmit={handleAddCharges}>
            {({ errors, touched, values, setFieldValue, resetForm }) =>
                renderType === 'ADD' ? (
                    <Add
                        values={values}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        touched={touched}
                        setRenderType={setRenderType}
                        resetForm={resetForm}
                    />
                ) : (
                    <List
                        values={values}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        touched={touched}
                        setRenderType={setRenderType}
                        resetForm={resetForm}
                        isLoading={isLoading}
                        fetchCharges={fetchCharges}
                    />
                )
            }
        </Formik>
    );
};

export default Charges;
