import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';

const DataNotFound = ({ text, secondaryText, style }) => (
    <Container>
        <Grid container spacing={3} direction="column" justifyContent="center" alignItems="center" style={style}>
            <Grid item>
                <Box>
                    <ScreenSearchDesktopIcon sx={{ color: '#00326D' }} fontSize="large" />
                </Box>
            </Grid>
            <Grid item>
                <Typography variant="h4" color="textSecondary">
                    {text || 'Oops! Data not available.'}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary" align="center">
                    {secondaryText || 'We apologize, but the data you are looking for is not available at the moment.'}
                </Typography>
            </Grid>
        </Grid>
    </Container>
);

export default DataNotFound;
