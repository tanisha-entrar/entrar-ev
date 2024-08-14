import { Button, Divider, FormControl, Grid, TextField, Typography } from '@mui/material';
import { Form } from 'formik';
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';

const Add = ({ values, setFieldValue, errors, touched, setRenderType, resetForm }) => (
    <Form>
        <MainCard sx={{ minHeight: '500vh' }}>
            <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" color="primary">
                    {values?.renderType === 'ADD' ? 'Add Vehicle Type' : 'Update Vehicle Type'}
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
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                        <TextField
                            fullWidth
                            id="vehicleTypeName"
                            name="vehicleTypeName"
                            label="Vehicle Type Name"
                            InputLabelProps={{ required: true }}
                            value={values?.vehicleTypeName}
                            onChange={(e) => setFieldValue('vehicleTypeName', e.target.value)}
                            error={touched?.vehicleTypeName && Boolean(errors?.vehicleTypeName)}
                            helperText={touched?.vehicleTypeName ? errors?.vehicleTypeName : ''}
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

export default Add;
