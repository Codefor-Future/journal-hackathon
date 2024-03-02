import * as React from 'react';
import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { useRouter } from 'next/router'
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import CircularProgress from '@mui/joy/CircularProgress';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Entry from './entry'

export default function Home() {
    const router = useRouter()
    const [entries, setentries] = useState([])
    const [size, setsize] = useState(5)
    // const [token, settoken] = useState(null)

    const showmore = () => {
        setsize(size + 10)
    }

    const fetch1 = async (token) => {
        const response = await fetch('http://172.20.10.14:9090/api/v1/diary/diary-pages', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 401) {

            router.push(`/login`)
            return
        }
        else if (!response.ok) {
            throw Error(response)
        }
        const jsonData = await response.json();

        setentries(jsonData);
        console.log(jsonData)
    }

    useEffect(() => {
        try {
            fetch1(router.query.token)

        } catch (error) {
            console.log(error)
            alert("Something went wrong")
        }
    }, []);


    return (
        <Box sx={{ pt: 2, px: 3 }}>
            <Box sx={{ my: 2, display: 'flex', gap: 1 }}>
                <Link
                    // href={`/write?token=${router.query.token}`}
                    component="button"
                    variant="body2"
                    onClick={() => {
                        router.push(`/write?token=${router.query.token}`)
                    }} underline="none" variant="body2" sx={{ display: 'block', flex: 1, textAlign: 'center', borderRadius: '30px', py: 2, background: '#3f51b5', fontSize: "18px", color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span>Today</span>
                </Link>
                <Link
                    component="button"
                    variant="body2"
                    onClick={() => {
                        router.push(`/goals?token=${router.query.token}`)
                    }} underline
                    // href={`/goals?token=${router.query.token}`}
                    underline="none" variant="body2" sx={{ display: 'block', flex: 1, textAlign: 'center', borderRadius: '30px', py: 2, background: 'orange', fontSize: "18px", color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span>Goals</span>
                </Link>
            </Box>
            <Box sx={{width:'100%', display: 'flex', mb:5}} >
                <Link
                sx={{width: '100%'}}
                    component="button"
                    variant="body2"
                    onClick={() => {
                        router.push(`/insights?token=${router.query.token}`)
                    }} underline
                    // href={`/goals?token=${router.query.token}`}
                    underline="none" variant="body2" sx={{ display: 'block', flex: 1, textAlign: 'center', borderRadius: '30px', py: 2, background: 'purple', fontSize: "18px", color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span>Insights</span>
                </Link>
            </Box>
            <Typography variant="h5" gutterBottom style={{ color: 'black', fontFamily: '"Madimi One", sans-serif' }}>
                Previous {size} days
            </Typography>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {
                    entries.slice(0, size).map((entry, index) => {
                        return (
                            <Entry key={index} entry={entry} index={index} />
                        )
                    })
                }
            </List>
            <Button variant="text" size="small" sx={{ mb: 3 }} onClick={showmore}>Show more</Button>

            <Typography variant="h5" gutterBottom style={{ color: 'black', fontFamily: '"Madimi One", sans-serif', }}>
                Your goals
            </Typography>
            <Box sx={{ display: 'flex', overflow: 'scroll' }}>
                <Card sx={{ minWidth: '200px', m: 3, height: 'auto' }} variant="solid" color="primary" invertedColors>
                    <CardContent orientation="horizontal" sx={{ display: 'flex', alignItems: 'center' }}>
                        <CircularProgress size="lg" determinate value={20}>
                            <TrendingUpOutlinedIcon />
                        </CircularProgress>
                        <CardContent>
                            <Typography level="body-md">Did you go to gym today?</Typography>
                            {/* <Typography level="h2">$ 432.6M</Typography> */}
                        </CardContent>
                    </CardContent>
                    <CardActions sx={{ display: 'flex' }}>
                        <Button variant="soft" size="md" sx={{ flex: 1 }} >
                            Yes
                        </Button>
                        <Button variant="solid" size="md" sx={{ flex: 1 }}>
                            No
                        </Button>
                    </CardActions>
                </Card>

                <Card sx={{ minWidth: '200px', my: 3, height: 'auto' }} variant="solid" color="primary" invertedColors>
                    <CardContent orientation="horizontal" sx={{ display: 'flex', alignItems: 'center' }}>
                        <CircularProgress size="lg" determinate value={20}>
                            <TrendingUpOutlinedIcon />
                        </CircularProgress>
                        <CardContent>
                            <Typography level="body-md">Did you go to gym today?</Typography>
                            {/* <Typography level="h2">$ 432.6M</Typography> */}
                        </CardContent>
                    </CardContent>
                    <CardActions sx={{ display: 'flex' }}>
                        <Button variant="soft" size="md" sx={{ flex: 1 }} >
                            Yes
                        </Button>
                        <Button variant="solid" size="md" sx={{ flex: 1 }}>
                            No
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </Box>
    );
}