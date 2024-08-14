/* eslint-disable no-use-before-define */
import axios from 'axios';
import useMessageDispatcher from 'hooks/useMessageDispatcher';
import React, { useRef, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Add from './Add';
import List from './List';

const initialValues = {
    renderType: 'ADD',
    id: '',
    connectionType: '',
    userId: '',
    vehicleTypeId: '',
    vehicleModalId: '',
    chargingStationId: '',
    date: '',
    time: '',
    amount: 0,
    vehicleType: [],
    vehicleList: [],
    stationList: [],
    previousBookings: [],
    ongoingBookings: []
};

const StationBookingsSetup = () => {
    const [renderType, setRenderType] = useState('LIST');
    const [isLoading, setIsLoading] = useState(false);
    const showMessage = useMessageDispatcher();
    const formikRef = useRef();

    const fetchVehicleTypes = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/v1/charging-station/get-vehicleType-list`);
            if (response.status === 200) {
                setIsLoading(false);
                if (response.data.code !== '403') {
                    formikRef?.current?.setFieldValue(`vehicleType`, response?.data?.data);
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
    const fetchVehicles = async (vehicleType) => {
        try {
            setIsLoading(true);
            const response = await axios.get(`/v1/charging-station/get-vehicle-list?vehicleTypeId=${vehicleType}`);
            if (response.status === 200) {
                setIsLoading(false);
                if (response.data.code !== '403') {
                    formikRef?.current?.setFieldValue(`vehicleList`, response?.data?.data);
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
    const fetchChargingStations = async () => {
        try {
            const response = await axios.get(`/v1/charging-station/charging-stations/list`);
            if (response.status === 200) {
                if (response.data.code !== '403') {
                    formikRef?.current?.setFieldValue(`stationList`, response?.data?.data);
                }
            }
        } catch (error) {
            if (!error.response) {
                showMessage({ message: error.message, color: 'error' });
            } else {
                showMessage({ message: error.response.data.Msg, color: 'error' });
            }
        }
    };
    const handleAddBookings = async () => {
        const payload = {};

        try {
            const response = await axios.post(`/v1/charging-station/get-booking-against-charging-station`, payload);
            if (response.status === 200) {
                if (response.data.code !== '403') {
                    // setup add bookings
                }
            }
        } catch (error) {
            if (!error.response) {
                showMessage({ message: error.message, color: 'error' });
            } else {
                showMessage({ message: error.response.data.Msg, color: 'error' });
            }
        }
    };
    const fetchPreviousBookings = async (date) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/v1/charging-station/get-booking-previous?date=${date || ''}`);
            if (response.status === 200) {
                setIsLoading(false);
                if (response.data.code !== '403') {
                    formikRef?.current?.setFieldValue(`previousBookings`, response?.data?.data);
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
    const fetchOngoinBookings = async (date) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/v1/charging-station/get-booking-ongoing?date=${date || ''}`);
            if (response.status === 200) {
                setIsLoading(false);
                if (response.data.code !== '403') {
                    formikRef?.current?.setFieldValue(`ongoingBookings`, response?.data?.data);
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
    return (
        <Formik initialValues={initialValues} innerRef={formikRef} onSubmit={handleAddBookings}>
            {({ errors, touched, values, setFieldValue, resetForm }) =>
                renderType === 'ADD' ? (
                    <Add
                        values={values}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        touched={touched}
                        setRenderType={setRenderType}
                        resetForm={resetForm}
                        fetchVehicleTypes={fetchVehicleTypes}
                        fetchVehicles={fetchVehicles}
                        fetchChargingStations={fetchChargingStations}
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
                        fetchPreviousBookings={fetchPreviousBookings}
                        fetchOngoinBookings={fetchOngoinBookings}
                    />
                )
            }
        </Formik>
    );
};

export default StationBookingsSetup;
