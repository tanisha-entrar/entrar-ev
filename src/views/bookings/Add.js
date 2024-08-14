import { Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { ErrorMessage, Form, getIn } from 'formik';
import React, { useEffect } from 'react';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';

const Add = ({
    values,
    setFieldValue,
    errors,
    touched,
    setRenderType,
    resetForm,
    fetchVehicleTypes,
    fetchVehicles,
    fetchChargingStations
}) => {
    const connectionType = ['ELECTRIC', 'HYBRID', 'GASOLINE', 'DIESEL', 'MANUAL', 'AUTOMATIC', 'CCS', 'OTHER'];
    useEffect(() => {
        fetchVehicleTypes();
        fetchChargingStations();
    }, []);
    return (
        <Form>
            <MainCard sx={{ minHeight: '500vh' }}>
                <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4" color="primary">
                        {values?.renderType === 'ADD' ? 'Book Station' : 'Update Booking'}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            setRenderType('LIST');
                            resetForm();
                        }}
                    >
                        List
                    </Button>
                </Grid>
                <Divider sx={{ mt: 2, mb: 3 }} />
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>Select Connection Type *</InputLabel>
                            <Select
                                name="connectionType"
                                id="connectionType"
                                label="Select Connection Type *"
                                value={values.connectionType}
                                onChange={(e) => {
                                    setFieldValue('connectionType', e.target.value);
                                }}
                                error={getIn(errors, `connectionType`) && getIn(touched, `connectionType`)}
                                helperText={
                                    getIn(errors, `connectionType`) && getIn(touched, `connectionType`) && getIn(errors, `connectionType`)
                                }
                            >
                                {connectionType?.map((connection) => (
                                    <MenuItem value={connection}>{connection}</MenuItem>
                                ))}
                            </Select>
                            <ErrorMessage name="connectionType" component="div" className="error-message">
                                {(msg) => <div style={{ color: 'red', fontSize: '12px', fontWeight: '400', margin: '5px' }}>{msg}</div>}
                            </ErrorMessage>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>Select Vehicle Type *</InputLabel>
                            <Select
                                name="vehicleTypeId"
                                id="vehicleTypeId"
                                label="Select Vehicle Type *"
                                value={values.vehicleTypeId}
                                onChange={(e) => {
                                    setFieldValue('vehicleTypeId', e.target.value);
                                    fetchVehicles(e.target.value);
                                }}
                                error={getIn(errors, `vehicleTypeId`) && getIn(touched, `vehicleTypeId`)}
                                helperText={
                                    getIn(errors, `vehicleTypeId`) && getIn(touched, `vehicleTypeId`) && getIn(errors, `vehicleTypeId`)
                                }
                            >
                                {values?.vehicleType?.map((type) => (
                                    <MenuItem value={type?.id}>{type?.vehicleTypeName}</MenuItem>
                                ))}
                            </Select>
                            <ErrorMessage name="vehicleTypeId" component="div" className="error-message">
                                {(msg) => <div style={{ color: 'red', fontSize: '12px', fontWeight: '400', margin: '5px' }}>{msg}</div>}
                            </ErrorMessage>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>Select Vehicle *</InputLabel>
                            <Select
                                name="vehicleModalId"
                                id="vehicleModalId"
                                label="Select Vehicle *"
                                value={values.vehicleModalId}
                                onChange={(e) => {
                                    setFieldValue('vehicleModalId', e.target.value);
                                }}
                                error={getIn(errors, `vehicleModalId`) && getIn(touched, `vehicleModalId`)}
                                helperText={
                                    getIn(errors, `vehicleModalId`) && getIn(touched, `vehicleModalId`) && getIn(errors, `vehicleModalId`)
                                }
                            >
                                {values?.vehicleList?.map((vehicle) => (
                                    <MenuItem value={vehicle?.id}>{vehicle?.name}</MenuItem>
                                ))}
                            </Select>
                            <ErrorMessage name="vehicleModalId" component="div" className="error-message">
                                {(msg) => <div style={{ color: 'red', fontSize: '12px', fontWeight: '400', margin: '5px' }}>{msg}</div>}
                            </ErrorMessage>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>Select Charging Station *</InputLabel>
                            <Select
                                name="chargingStationId"
                                id="chargingStationId"
                                label="Select Charging Station *"
                                value={values.chargingStationId}
                                onChange={(e) => {
                                    setFieldValue('chargingStationId', e.target.value);
                                }}
                                error={getIn(errors, `chargingStationId`) && getIn(touched, `chargingStationId`)}
                                helperText={
                                    getIn(errors, `chargingStationId`) &&
                                    getIn(touched, `chargingStationId`) &&
                                    getIn(errors, `chargingStationId`)
                                }
                            >
                                {values?.stationList?.map((station) => (
                                    <MenuItem value={station?.id}>{station?.name}</MenuItem>
                                ))}
                            </Select>
                            <ErrorMessage name="chargingStationId" component="div" className="error-message">
                                {(msg) => <div style={{ color: 'red', fontSize: '12px', fontWeight: '400', margin: '5px' }}>{msg}</div>}
                            </ErrorMessage>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                            <TextField
                                fullWidth
                                id="amount"
                                name="amount"
                                label="Enter Amount"
                                InputLabelProps={{ required: true, shrink: true }}
                                value={values?.amount}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const newValue = value.replace(/\D/, '');
                                    setFieldValue('amount', newValue);
                                }}
                                error={touched?.amount && Boolean(errors?.amount)}
                                helperText={touched?.amount ? errors?.amount : ''}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                            <TextField
                                fullWidth
                                id="date"
                                type="date"
                                name="date"
                                label="Select Date"
                                InputLabelProps={{ required: true, shrink: true }}
                                value={values?.date}
                                onChange={(e) => setFieldValue('date', e.target.value)}
                                error={touched?.date && Boolean(errors?.date)}
                                helperText={touched?.date ? errors?.date : ''}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                            <TextField
                                fullWidth
                                id="time"
                                type="time"
                                name="time"
                                label="Select Time"
                                InputLabelProps={{ required: true, shrink: true }}
                                value={values?.time}
                                onChange={(e) => setFieldValue('time', e.target.value)}
                                error={touched?.time && Boolean(errors?.time)}
                                helperText={touched?.time ? errors?.time : ''}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3} mt={1}>
                        <Button type="submit" variant="contained" color="secondary">
                            {values?.renderType === 'ADD' ? 'Add' : 'Update'}
                        </Button>
                    </Grid>
                </Grid>
            </MainCard>
        </Form>
    );
};

export default Add;
