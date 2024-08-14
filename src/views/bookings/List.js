import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import MainCard from 'ui-component/cards/MainCard';
import { Button, CircularProgress, Divider, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import OngoingBookings from './OngoingBookings';
import PreviousBookings from './PreviousBookings';

const List = ({ setRenderType, setFieldValue, resetForm, values, fetchPreviousBookings, fetchOngoinBookings, isLoading }) => {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const navigate = useNavigate();

    const handleAdd = () => {
        setRenderType('ADD');
        setFieldValue(`renderType`, 'ADD');
        resetForm();
    };
    useEffect(() => {
        fetchPreviousBookings();
        fetchOngoinBookings();
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
                        Station Bookings
                    </Typography>
                </Box>
                <Button variant="contained" color="primary" onClick={handleAdd}>
                    Add +
                </Button>
            </Grid>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange}>
                            <Tab label="Ongoing Bookings" value="1" />
                            <Tab label="Previous Bookings" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <OngoingBookings isLoading={isLoading} values={values} />
                    </TabPanel>
                    <TabPanel value="2">
                        <PreviousBookings isLoading={isLoading} values={values} />
                    </TabPanel>
                </TabContext>
            </Box>
        </MainCard>
    );
};

export default List;
