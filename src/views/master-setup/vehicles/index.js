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
    type: '',
    name: '',
    mileage: '',
    vehicleList: []
};

const validationSchema = yup.object().shape({
    type: yup.string().required('Vehicle Type is required'),
    name: yup.string().required('Name is required'),
    mileage: yup.string().required('Mileage is required')
});

const VehicleSetup = () => {
    const [renderType, setRenderType] = useState('LIST');
    const [isLoading, setIsLoading] = useState(false);
    const showMessage = useMessageDispatcher();
    const formikRef = useRef();

    const handleAddVehicles = async (values) => {
        const payload = {
            id: values?.id,
            type: values?.type,
            name: values?.name,
            mileage: values?.mileage
        };
        try {
            const response = await axios.post(`/v1/charging-station/add-update-vehicle`, payload);
            if (response.status === 200) {
                setRenderType('LIST');
            }
        } catch (error) {
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
            const response = await axios.get(`/v1/charging-station/get-vehicle-list?vehicleType=${vehicleType}`);
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

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} innerRef={formikRef} onSubmit={handleAddVehicles}>
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
                        fetchVehicles={fetchVehicles}
                    />
                )
            }
        </Formik>
    );
};

export default VehicleSetup;
