import React from 'react';
import { CircularProgress, Grid } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const PreviousBookings = ({ isLoading, values }) => (
    <>
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
                {values?.previousBookings?.length > 0 && (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Vehicle</TableCell>
                                <TableCell>Vehicle Type</TableCell>
                                <TableCell>Mileage</TableCell>
                                <TableCell>Port</TableCell>
                                <TableCell>Charging Station</TableCell>
                                <TableCell>Address</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {values?.previousBookings?.map((row) => (
                                <TableRow>
                                    <TableCell>{row?.userName}</TableCell>
                                    <TableCell>{row?.amount}</TableCell>
                                    <TableCell>{row?.vehicleModal?.name}</TableCell>
                                    <TableCell>{row?.vehicleModal?.type}</TableCell>
                                    <TableCell>{row?.vehicleModal?.mileage}</TableCell>
                                    <TableCell>{row?.port}</TableCell>
                                    <TableCell>{row?.chargingStation?.name}</TableCell>
                                    <TableCell>{row?.chargingStation?.address}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
        )}
    </>
);

export default PreviousBookings;
