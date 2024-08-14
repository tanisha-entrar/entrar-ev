import { Autocomplete, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { ErrorMessage, Form, getIn } from 'formik';
import React, { useEffect } from 'react';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';

const Add = ({ values, setFieldValue, errors, touched, err, setRenderType, resetForm, uploadStationImage, fetchCharges }) => {
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
    useEffect(() => {
        fetchCharges();
    }, []);
    return (
        <Form>
            <MainCard>
                <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4" color="primary">
                        {values?.renderType === 'ADD' ? 'Add Charging Station' : 'Update Charging Station'}
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
                <Divider sx={{ mt: 2, mb: 2 }} />
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                            <TextField
                                fullWidth
                                id="name"
                                name="name"
                                label="Station Name"
                                InputLabelProps={{ required: true }}
                                value={values?.name}
                                onChange={(e) => setFieldValue('name', e.target.value)}
                                error={touched?.name && Boolean(errors?.name)}
                                helperText={touched?.name ? errors?.name : ''}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Autocomplete
                            multiple
                            options={values?.chargesList}
                            value={values?.chargesId?.map((id) => values?.chargesList?.find((option) => option?.id === id))}
                            onChange={(event, newValue) => {
                                const chargesId = newValue.map((option) => option?.id);
                                setFieldValue(`chargesId`, chargesId);
                            }}
                            getOptionLabel={(option) => `${option?.port} (${option?.type})`}
                            renderInput={(params) => <TextField {...params} label="Select Charges *" />}
                            error={getIn(errors, `chargesId`) && getIn(touched, `chargesId`)}
                            helperText={getIn(errors, `chargesId`) && getIn(touched, `chargesId`) && getIn(errors, `chargesId`)}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                            <TextField
                                fullWidth
                                type="file"
                                id="imagePath"
                                name="imagePath"
                                label="Upload Image"
                                InputLabelProps={{ shrink: true, required: true }}
                                onChange={(e) => uploadStationImage(e)}
                            />
                            {err && <Typography sx={{ color: 'red' }}>Image is required</Typography>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                            <TextField
                                fullWidth
                                type="time"
                                id="openingTime"
                                name="openingTime"
                                label="Opening Time"
                                InputLabelProps={{ shrink: true, required: true }}
                                value={values?.openingTime}
                                onChange={(e) => setFieldValue('openingTime', e.target.value)}
                                error={touched?.openingTime && Boolean(errors?.openingTime)}
                                helperText={touched?.openingTime ? errors?.openingTime : ''}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                            <TextField
                                fullWidth
                                type="time"
                                id="closingTime"
                                name="closingTime"
                                label="Closing Time"
                                InputLabelProps={{ shrink: true, required: true }}
                                value={values?.closingTime}
                                onChange={(e) => setFieldValue('closingTime', e.target.value)}
                                error={touched?.closingTime && Boolean(errors?.closingTime)}
                                helperText={touched?.closingTime ? errors?.closingTime : ''}
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
