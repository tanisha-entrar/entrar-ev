import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MainCard from 'ui-component/cards/MainCard';
import { Box, Button, CircularProgress, Divider, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EditIcon from '@mui/icons-material/Edit';

const List = ({ setRenderType, setFieldValue, resetForm, values, fetchVehicleTypes, isLoading }) => {
    const navigate = useNavigate();
    const handleEdit = async (row) => {
        setFieldValue(`id`, row?.id);
        setFieldValue(`vehicleTypeName`, row?.vehicleTypeName);
        setFieldValue('renderType', 'EDIT');
        setRenderType('ADD');
    };
    const handleAdd = () => {
        setRenderType('ADD');
        setFieldValue(`renderType`, 'ADD');
        resetForm();
    };
    useEffect(() => {
        fetchVehicleTypes();
    }, []);
    return (
        <MainCard sx={{ minHeight: '85vh' }}>
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
                        Vehicle Types
                    </Typography>
                </Box>
                <Button variant="contained" color="primary" onClick={handleAdd}>
                    Add +
                </Button>
            </Grid>
            <Divider sx={{ mt: 2, mb: 2 }} />
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
                    {values?.vehicleTypeList?.length > 0 && (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Vehicle Type</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {values?.vehicleTypeList?.map((row) => (
                                    <TableRow>
                                        <TableCell>{row?.vehicleTypeName}</TableCell>
                                        <TableCell>
                                            <Tooltip title="Edit vehicle type">
                                                <IconButton
                                                    onClick={() => {
                                                        handleEdit(row);
                                                    }}
                                                >
                                                    <EditIcon fontSize="small" color="secondary" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>
            )}
        </MainCard>
    );
};

export default List;
