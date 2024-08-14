/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Divider,
    Grid,
    IconButton,
    Skeleton,
    Tooltip,
    Typography
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const List = ({ setRenderType, setFieldValue, resetForm, values, isLoading, fetchChargingStations }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const handleEdit = async (row) => {
        const charges = row?.charges?.map((charge) => charge?.id);
        setFieldValue(`id`, row?.id);
        setFieldValue(`name`, row?.name);
        setFieldValue(`type`, row?.type);
        setFieldValue(`chargesId`, charges);
        setFieldValue(`closingTime`, row?.closingTime);
        setFieldValue(`openingTime`, row?.openingTime);
        setFieldValue('renderType', 'EDIT');
        setRenderType('ADD');
    };
    const handleAdd = () => {
        setRenderType('ADD');
        setFieldValue(`renderType`, 'ADD');
        resetForm();
    };
    useEffect(() => {
        fetchChargingStations();
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
                        Charging Stations
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
            ) : values?.stationList?.length > 0 ? (
                <Grid container spacing={3}>
                    {values?.stationList?.map((station) => (
                        <>
                            <Grid item xs={12} sm={3} md={4} key={station?.id}>
                                <Card
                                    sx={{
                                        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                        border: theme.palette.mode === 'dark' ? 'none' : '1px solid',
                                        borderColor: theme.palette.grey[100],
                                        position: 'relative'
                                    }}
                                >
                                    <CardMedia component="img" src={station?.image} alt={station?.name} sx={{ maxHeight: '25vh' }} />
                                    <CardContent sx={{ p: 2, pb: '16px !important' }}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12}>
                                                        <Tooltip title={station?.name} arrow>
                                                            <Typography
                                                                variant="h4"
                                                                sx={{
                                                                    whiteSpace: 'nowrap',
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                    maxWidth: '100%'
                                                                }}
                                                            >
                                                                {station?.name}
                                                            </Typography>
                                                        </Tooltip>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <span style={{ color: 'black' }}>
                                                            <b>Port: </b>
                                                            <Typography variant="h6" component="span">
                                                                {station?.charges
                                                                    ?.map((charge) => `${charge?.type}(${charge?.port})`)
                                                                    .join(' | ') || '-'}
                                                            </Typography>
                                                        </span>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <span style={{ color: 'black' }}>
                                                            <b>Opening Time: </b>
                                                            <Typography variant="h6" component="span">
                                                                {moment(station?.openingTime, 'HH:mm').format('h:mm A')}
                                                            </Typography>
                                                        </span>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <span style={{ color: 'black' }}>
                                                            <b>Closing Time: </b>
                                                            <Typography variant="h6" component="span">
                                                                {moment(station?.closingTime, 'HH:mm').format('h:mm A')}
                                                            </Typography>
                                                        </span>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <Tooltip title="Edit station">
                                        <IconButton
                                            sx={{
                                                position: 'absolute',
                                                top: 8,
                                                right: 8,
                                                color: 'white',
                                                backgroundColor: 'black'
                                            }}
                                            onClick={() => {
                                                handleEdit(station);
                                            }}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Card>
                            </Grid>
                        </>
                    ))}
                </Grid>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
                    <Typography variant="body1">No data available</Typography>
                </Box>
            )}
        </MainCard>
    );
};

export default List;
