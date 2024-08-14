import { Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { ErrorMessage, Form, getIn } from 'formik';
import React from 'react';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';

const Add = ({ values, setFieldValue, errors, touched, setRenderType, resetForm }) => {
    const ports = [
        'DC_BARREL_JACK',
        'XLR_CONNECTOR',
        'ANDERSON_POWERPOLE',
        'ROSENBERGER',
        'TYPE1_SAE_J1772',
        'TYPE2_MENNEKES',
        'CCS1',
        'CCS2',
        'CHADEMO'
    ];
    return (
        <Form>
            <MainCard sx={{ minHeight: '500vh' }}>
                <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4" color="primary">
                        {values?.renderType === 'ADD' ? 'Add Ports' : 'Update Ports'}
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
                                <MenuItem value="CAR">Car</MenuItem>
                                <MenuItem value="BIKE">Bike</MenuItem>
                            </Select>
                            <ErrorMessage name="type" component="div" className="error-message">
                                {(msg) => <div style={{ color: 'red', fontSize: '12px', fontWeight: '400', margin: '5px' }}>{msg}</div>}
                            </ErrorMessage>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>Select Port Type *</InputLabel>
                            <Select
                                name="port"
                                id="port"
                                label="Select Port Type *"
                                value={values.port}
                                onChange={(e) => {
                                    setFieldValue('port', e.target.value);
                                }}
                                error={getIn(errors, `port`) && getIn(touched, `port`)}
                                helperText={getIn(errors, `port`) && getIn(touched, `port`) && getIn(errors, `port`)}
                            >
                                {ports?.map((port) => (
                                    <MenuItem value={port}>{port}</MenuItem>
                                ))}
                            </Select>
                            <ErrorMessage name="port" component="div" className="error-message">
                                {(msg) => <div style={{ color: 'red', fontSize: '12px', fontWeight: '400', margin: '5px' }}>{msg}</div>}
                            </ErrorMessage>
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
