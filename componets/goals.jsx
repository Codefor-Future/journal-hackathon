// pages/login.jsx
import React, { useState, useEffect } from 'react';


import Navbar from '../componets/navbar/navbar';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/joy/Button';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';

import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import SentimentNeutralOutlinedIcon from '@mui/icons-material/SentimentNeutralOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import SentimentVeryDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';



import { useRouter } from 'next/router'


import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import CircularProgress from '@mui/joy/CircularProgress';



const Write1 = () => {
    const router = useRouter()
    const [value, setValue] = React.useState("rgba(187, 225, 228, 0.5)");
    const [text, setText] = React.useState('');
    const [title, settitle] = useState('')
    const [desc, setdesc] = useState('')
    const [goals, setgoals] = useState([])
    const [metrics, setmetrics] = useState([])
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        fetchGoals()
            .then(data => {
                console.log('fetchGoals successful:', data);
                setgoals(data)
            }
            )
            .catch(error => {
                console.error('fetchGoals failed:', error);
                alert("something went wrong !")
            })
    }
        , [])

    async function save() {
        const url = 'http://172.20.10.14:9090/api/v1/goals';
        const data = {
            start: new Date().toISOString(),
            nlPrompt: desc,
            description: desc,
            numberOfDays: 0,
            nlprompt: true,
        };
        const authorizationToken = router.query.token;
        console.log(data)
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authorizationToken}`,
                },
                body: JSON.stringify(data),
            });
            console.log(response)
            if (!response.ok) {
                throw new Error(`${response.status}`);
            }

            const responseData = await response.json();

            console.log('login response:', responseData); // Replace with further processing
            return responseData; // Or handle success response based on your needs
        } catch (error) {
            console.error('login error:', error.message);
            if (error.message === "401") {
                router.replace('/login')
            }  // Handle errors appropriately
            return null; // Or return a rejection promise for error handling in caller
        }
    }
    async function fetchGoals() {
        const url = 'http://172.20.10.14:9090/api/v1/goals';
        const authorizationToken = router.query.token;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authorizationToken}`,
                },
            });
            console.log(response)
            if (!response.ok) {
                throw new Error(`${response.status}`);
            }

            const responseData = await response.json();

            console.log('login response:', responseData); // Replace with further processing
            return responseData; // Or handle success response based on your needs
        } catch (error) {
            console.error('login error:', error.message);
            // if (error.message === "401") {
            //     router.replace('/login')
            // }  // Handle errors appropriately
            return null; // Or return a rejection promise for error handling in caller
        }
    }
    async function fetchMetrics() {
        const url = `http://172.20.10.14:9090/api/v1/metrics?start=${new Date("1-03-2024").toISOString()}&end=${new Date().toISOString()}`;
        const authorizationToken = router.query;
        console.log(authorizationToken)
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${router.query.token}`,
                },
            });
            console.log(response)
            if (!response.ok) {
                throw new Error(`${response.status}`);
            }

            const responseData = await response.json();

            console.log('fetch metrics response:', responseData); // Replace with further processing
            return responseData; // Or handle success response based on your needs
        } catch (error) {
            console.error('fetch metrics error:', error.message);
            // if (error.message === "401") {
            //     router.replace('/login')
            // }  // Handle errors appropriately
            throw new Error(`${error}`);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        save()
            .then(data => {
                console.log('save successful:', data);
                // router.push(`/home?token=${router.query.token}`)
                fetchGoals()
                    .then(data => {
                        console.log('fetchGoals successful:', data);
                        setgoals(data)
                    }
                    )
                    .catch(error => {
                        console.error('fetchGoals failed:', error);
                        alert("something went wrong !")
                    })
            })
            .catch(error => {
                console.error('save failed:', error);
                alert("something went wrong !")
            })
            .finally(() => {
                setLoading(false);
            })
    };


    return (
        <div style={{ background: `radial-gradient(circle at top, ${value} , white, white)` }}>
            <style jsx global>{`
      body {
        margin: 0px;
        padding: 0px;
      }
    `}</style>
            {/* <link rel="preconnect" href="https://fonts.googleapis.com"> */}
            {/* <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> */}
            <link href="https://fonts.googleapis.com/css2?family=Madimi+One&display=swap" rel="stylesheet"></link>
            <Navbar />
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom style={{ color: 'black', fontFamily: '"Madimi One", sans-serif' }}>
                    {new Date().toDateString()}
                </Typography>
            </Box>
            
            <Box sx={{ px: 5, py: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <Typography variant="h5">
                    Create new goal
                </Typography>
                <FormControl variant="standard" fullWidth>
                    <TextField fullWidth label="Description" id="fullWidth" onChange={e => setdesc(e.target.value)} />
                    <FormHelperText id="component-helper-text">
                        eg: Go to the gym everyday
                    </FormHelperText>
                </FormControl>
            </Box>
            <Box sx={{ px: 3, py: 0 }}>
                <Button onClick={handleSubmit} size="lg" sx={{ width: "100%", mx: 'auto' }} variant="solid" color="primary">
                    {loading?"Saving...":"Save goal"}
                </Button>
            </Box>
            <Box sx={{ px: 3, pt: 6 }}>
                <Typography variant="h5" gutterBottom style={{ color: 'black', fontFamily: '"Madimi One", sans-serif' }}>
                    Your goals
                </Typography>
            </Box>


            <Box sx={{ display: 'flex', overflow: 'scroll' }}>

                {
                    goals?.map(goal => {
                        return (
                            <Card sx={{ minWidth: '200px', m: 3, height: 'auto' }} variant="solid" color="primary" invertedColors>
                                <CardContent orientation="horizontal" sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CircularProgress size="lg" determinate value={goal?.progress*100}>
                                        <TrendingUpOutlinedIcon />
                                    </CircularProgress>
                                    <CardContent>
                                        <Typography level="h3">{goal.title}</Typography>
                                        <Typography level="body-md">{goal.description?.substring(0, 30)}...</Typography>
                                        {/* <Typography level="h2">$ 432.6M</Typography> */}
                                    </CardContent>
                                </CardContent>
                            </Card>
                        )
                    })
                }
            </Box>
        </div>
    );
};

export default Write1;
