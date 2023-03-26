import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function MediaCard() {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image="./HotelView.jpg"
                title="view picture"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Room
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    *Room criteria*
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Book this room</Button>
            </CardActions>
        </Card>
    );
}
export default function RowAndColumnSpacing() {
    return (
        <Box sx={{ width: '100%', mt: 20, ml:2, mr:2, maxWidth:1500}}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={3}>
                    <MediaCard/>
                </Grid>
                <Grid item xs={3}>
                    <MediaCard/>
                </Grid>
                <Grid item xs={3}>
                    <MediaCard/>
                </Grid>
                <Grid item xs={3}>
                    <MediaCard/>
                </Grid>
            </Grid>
        </Box>
    );
}