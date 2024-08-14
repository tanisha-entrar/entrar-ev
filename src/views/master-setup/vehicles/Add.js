import { Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { ErrorMessage, Form, getIn } from 'formik';
import React, { useEffect } from 'react';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';

const Add = ({ values, setFieldValue, errors, touched, setRenderType, resetForm, fetchVehicleTypes }) => {
    useEffect(() => {
        fetchVehicleTypes();
    }, []);
    return (
        <Form>
            <MainCard sx={{ minHeight: '500vh' }}>
                <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4" color="primary">
                        {values?.renderType === 'ADD' ? 'Add Vehicles' : 'Update Vehicles'}
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
                            <InputLabel>Select Vehicle Type *</InputLabel>
                            <Select
                                name="type"
                                id="type"
                                label="Select Vehicle Type *"
                                value={values.type}
                                onChange={(e) => {
                                    setFieldValue('type', e.target.value);
                                }}
                                error={getIn(errors, `type`) && getIn(touched, `type`)}
                                helperText={getIn(errors, `type`) && getIn(touched, `type`) && getIn(errors, `type`)}
                            >
                                {values?.vehicleType?.map((type) => (
                                    <MenuItem value={type?.id}>{type?.vehicleTypeName}</MenuItem>
                                ))}
                            </Select>
                            <ErrorMessage name="type" component="div" className="error-message">
                                {(msg) => <div style={{ color: 'red', fontSize: '12px', fontWeight: '400', margin: '5px' }}>{msg}</div>}
                            </ErrorMessage>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                            <TextField
                                fullWidth
                                id="name"
                                name="name"
                                label="Vehicle Name"
                                InputLabelProps={{ required: true }}
                                value={values?.name}
                                onChange={(e) => setFieldValue('name', e.target.value)}
                                error={touched?.name && Boolean(errors?.name)}
                                helperText={touched?.name ? errors?.name : ''}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                            <TextField
                                fullWidth
                                id="mileage"
                                name="mileage"
                                label="Mileage"
                                InputLabelProps={{ required: true }}
                                value={values?.mileage}
                                onChange={(e) => setFieldValue('mileage', e.target.value)}
                                error={touched?.mileage && Boolean(errors?.mileage)}
                                helperText={touched?.mileage ? errors?.mileage : ''}
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
