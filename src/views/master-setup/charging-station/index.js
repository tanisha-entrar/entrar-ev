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
    name: '',
    type: '',
    port: '',
    latitude: '',
    longitude: '',
    chargesId: [],
    imagePath: '',
    address: '',
    openingTime: '',
    closingTime: '',
    stationList: [],
    chargesList: []
};

const validationSchema = yup.object().shape({
    name: yup.string().required('Station Name is required'),
    chargesId: yup.array().min(1, 'Select atleast one charge').required('Charges are required'),
    openingTime: yup.string().required('Opening Time is required'),
    closingTime: yup.string().required('Closing Time is required')
});

const ChargingStationSetup = () => {
    const [renderType, setRenderType] = useState('LIST');
    const [isLoading, setIsLoading] = useState(false);
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [img, setImg] = useState(null);
    const [err, setErr] = useState('');
    const showMessage = useMessageDispatcher();
    const formikRef = useRef();
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    const uploadStationImage = async (event) => {
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        formData.append('fileName', event.target.files[0].name);
        formData.append('folder ', 'EVCV_LOGO');
        axios.post('/v1/utils/fileUpload/pre/signed/generic', formData).then((response) => {
            const file = response.data?.data?.path;
            if (file) {
                setImg(file);
                setErr('');
            } else {
                setErr('Image is required');
            }
        });
    };
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const response = await axios.get(
                            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                        );
                        const address = response.data?.address;
                        const country = address?.country;
                        const state = address?.state;
                        const city = address?.city;
                        const district = address?.state_district;
                        const suburb = address?.suburb;
                        const postcode = address?.postcode;
                        console.log(address, 'address71address71');
                        setLatitude(latitude);
                        setLongitude(longitude);
                        setLocation(`${postcode}, ${suburb}, ${district}, ${city}, ${state}, ${country} `);
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
    const handleAddChargingStations = async (values) => {
        const payload = {
            id: values?.id,
            name: values?.name,
            latitude,
            longitude,
            chargesId: values?.chargesId,
            imagePath: img,
            address: location,
            openingTime: values?.openingTime,
            closingTime: values?.closingTime
        };
        try {
            const response = await axios.post(`/v1/charging-station/add-update/charging-station`, payload);
            if (response.status === 200) {
                setRenderType('LIST');
                fetchChargingStations();
            }
        } catch (error) {
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
    useEffect(() => {
        getLocation();
    }, []);
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} innerRef={formikRef} onSubmit={handleAddChargingStations}>
            {({ errors, touched, values, setFieldValue, resetForm }) =>
                renderType === 'ADD' ? (
                    <Add
                        values={values}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        touched={touched}
                        err={err}
                        setRenderType={setRenderType}
                        resetForm={resetForm}
                        uploadStationImage={uploadStationImage}
                        fetchCharges={fetchCharges}
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
                        fetchChargingStations={fetchChargingStations}
                    />
                )
            }
        </Formik>
    );
};

export default ChargingStationSetup;
