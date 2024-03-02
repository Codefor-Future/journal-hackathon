import React, { useState, useEffect } from 'react';
import { Fab, Menu, MenuItem, Grow, ClickAwayListener } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';




import { useRouter } from 'next/router'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js'
Chart.register(ArcElement);

const ExpandableFab = () => {
    const router = useRouter()
    const [open, setOpen] = useState(false);

    const [metrics, setmetrics] = useState([])

    useEffect(() => {
        fetchMetrics()
            .then(data => {
                console.log('fetch metricss successful:', data);
                setmetrics(data)
            }
            )
            .catch(error => {
                console.error('fetch metricss failed:', error);
                alert("ensure you have good internet connection !")
            })
    }
        , [])

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

    return (
        <>
            <Typography variant="h5" gutterBottom style={{ color: 'black', fontFamily: '"Madimi One", sans-serif' }}>
                Insights
            </Typography>
            <Box sx={{ width: '150px', mx: 'auto' }}>
                {
                    metrics.emojiMap && <Doughnut style={{ width: '150px', height: '150px', margin: 'auto' }} data={{
                        labels: ['Angry', 'Happy', 'Sad', 'Neutral'],
                        datasets: [
                            {
                                label: '# of Votes',
                                data: [metrics?.emojiMap.Angry, metrics?.emojiMap.Happy, metrics?.emojiMap.Sad, metrics?.emojiMap.Neutral,],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                ],
                                borderWidth: 1,
                            },
                        ],
                    }} />
                }
            </Box>
            <Box sx={{ px: 5, py: 3, textAlign: 'left' }}>
                <Typography variant="" gutterBottom style={{ color: 'black', }}>
                    {metrics?.message}
                </Typography>
            </Box>
        </>
    )
};

export default ExpandableFab;
