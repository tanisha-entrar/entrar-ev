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
    vehicleTypeName: '',
    vehicleTypeList: []
};

const validationSchema = yup.object().shape({
    vehicleTypeName: yup.string().required('Vehicle Type is required')
});

const VehicleTypeSetup = () => {
    const [renderType, setRenderType] = useState('LIST');
    const [isLoading, setIsLoading] = useState(false);
    const showMessage = useMessageDispatcher();
    const formikRef = useRef();

    const handleAddVehicleType = async (values) => {
        try {
            const response = await axios.post(`/v1/charging-station/add-update-vehicleType?vehicleTypeName=${values?.vehicleTypeName}`, {});
            if (response.status === 200) {
                setRenderType('LIST');
                fetchVehicleTypes();
            }
        } catch (error) {
            if (!error.response) {
                showMessage({ message: error.message, color: 'error' });
            } else {
                showMessage({ message: error.response.data.Msg, color: 'error' });
            }
        }
    };
    const fetchVehicleTypes = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/v1/charging-station/get-vehicleType-list`);
            if (response.status === 200) {
                setIsLoading(false);
                if (response.data.code !== '403') {
                    formikRef?.current?.setFieldValue(`vehicleTypeList`, response?.data?.data);
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
        <Formik initialValues={initialValues} validationSchema={validationSchema} innerRef={formikRef} onSubmit={handleAddVehicleType}>
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
                        fetchVehicleTypes={fetchVehicleTypes}
                    />
                )
            }
        </Formik>
    );
};

export default VehicleTypeSetup;
