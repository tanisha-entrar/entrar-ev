import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MainCard from 'ui-component/cards/MainCard';
import { Box, Button, CircularProgress, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const List = ({ setRenderType, setFieldValue, resetForm, values, fetchVehicles, isLoading }) => {
    const vehicleType = ['TWO_WHEELER', 'FOUR_WHEELER', 'BUS', 'BICYCLE', 'ELECTRIC_SCOOTER', 'OTHER'];
    const navigate = useNavigate();
    const handleAdd = () => {
        setRenderType('ADD');
        setFieldValue(`type`, 'ADD');
        resetForm();
    };
    return (
        <MainCard>
            <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'black' }}>
                    <ArrowBackIosIcon
                        fontSize="small"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => {
                            navigate(-1);
                        }}
                    />
                    <Typography variant="h4" color="primary">
                        Vehicles
                    </Typography>
                </Box>
                <Button variant="contained" color="primary" onClick={handleAdd}>
                    Add +
                </Button>
            </Grid>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Grid container spacing={3}>
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
                                fetchVehicles(e.target.value);
                            }}
                        >
                            {vehicleType?.map((port) => (
                                <MenuItem value={port}>{port}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            {isLoading ? (
                <Grid
                    item
                    xs={12}
                    md={12}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <CircularProgress />
                </Grid>
            ) : (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Vehicle Name</TableCell>
                                <TableCell>Vehicle Type</TableCell>
                                <TableCell>Mileage</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {values?.vehicleList?.map((row) => (
                                <TableRow>
                                    <TableCell>{row?.name}</TableCell>
                                    <TableCell>{row?.type}</TableCell>
                                    <TableCell>{row?.mileage}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </MainCard>
    );
};

export default List;
