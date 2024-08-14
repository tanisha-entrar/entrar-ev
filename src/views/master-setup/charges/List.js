import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MainCard from 'ui-component/cards/MainCard';
import { Box, Button, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const List = ({ setRenderType, setFieldValue, resetForm, values, fetchCharges, isLoading }) => {
    const navigate = useNavigate();
    const handleAdd = () => {
        setRenderType('ADD');
        setFieldValue(`type`, 'ADD');
        resetForm();
    };
    useEffect(() => {
        fetchCharges();
    }, []);
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
                        Charges
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
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Vehicle Type</TableCell>
                                <TableCell>Port</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {values?.chargesList?.map((row) => (
                                <TableRow>
                                    <TableCell>{row?.type}</TableCell>
                                    <TableCell>{row?.port}</TableCell>
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
