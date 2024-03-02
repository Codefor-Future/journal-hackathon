// pages/login.jsx
import React, { useState, useEffect } from 'react';


import Write from '../componets/textEditor/main-bu';
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
import Textarea from '@mui/joy/Textarea';
import FormControl from '@mui/joy/FormControl';
import LoadingButton from '@mui/lab/LoadingButton';


import { useRouter } from 'next/router'


import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import CircularProgress from '@mui/joy/CircularProgress';



const Write1 = () => {
  const router = useRouter()
  const [value, setValue] = React.useState("rgba(187, 225, 228, 0.5)");
  const [text, setText] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [goals, setgoals] = useState([])
  const [cardLoading, setcardLoading] = useState(false)

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

  const getEmotionFromColorValue = (v) => {
    switch (v) {
      case "rgba(248, 251, 56, 0.5)":
        return "Happy"
      case "rgba(187, 225, 228, 0.5)":
        return "Neutral"
      case "rgba(128, 0, 128, 0.431)":
        return "Sad"
      case "rgba(251, 56, 56, 0.5)":
        return "Angry"
    }
  }

  async function login() {
    const url = 'http://172.20.10.14:9090/api/v1/diary/diary-pages';
    const data = {
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      content: text,
      emoji: getEmotionFromColorValue(value),
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    login()
      .then(data => {
        console.log('save successful:', data);
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          router.push(`/home?token=${router.query.token}`)
        }, 1000)
      })
      .catch(error => {
        console.error('save failed:', error);
      })
      .finally(() => {
        setLoading(false);
      })
  };

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
        <Typography variant="body1">
          Describe your day in one emoji
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 10 }}>
        <ToggleButtonGroup
          spacing={{ xs: 2, md: 2, lg: 3 }}
          variant={"soft"}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <Button sx={{ height: '60px', width: '60px', }} value="rgba(248, 251, 56, 0.5)">
            <EmojiEmotionsOutlinedIcon />
          </Button>
          <Button sx={{ height: '60px', width: '60px' }} value="rgba(187, 225, 228, 0.5)">
            <SentimentNeutralOutlinedIcon />
          </Button>
          <Button sx={{ height: '60px', width: '60px' }} value="rgba(128, 0, 128, 0.431)">
            <SentimentDissatisfiedOutlinedIcon />
          </Button>
          <Button sx={{ height: '60px', width: '60px' }} value="rgba(251, 56, 56, 0.5)">
            <SentimentVeryDissatisfiedOutlinedIcon />
          </Button>
        </ToggleButtonGroup>
      </Box>
      {/* <Write emotion={value} /> */}


      <Typography variant="h6" gutterBottom style={{ color: 'black', fontFamily: '"Madimi One", sans-serif', textAlign: 'center' }}>
        Anything exciting happen today?
      </Typography>
      <FormControl style={{ padding: '20px', fontZize: '20px' }}>
        <Textarea
          style={{ padding: '10px', fontZize: '20px', outline: 'none' }}
          variant="plain"
          size="sm"
          placeholder="Type in here…"
          value={text}
          onChange={(event) => setText(event.target.value)}
          minRows={2}
          maxRows={4}
          startDecorator={
            <Box sx={{ display: 'flex', gap: 0.5, flex: 1 }}>
              {/* <IconButton variant="outlined" color="neutral" onClick={addEmoji('👍')}>
                👍
              </IconButton>
              <IconButton variant="outlined" color="neutral" onClick={addEmoji('🏖')}>
                🏖
              </IconButton>
              <IconButton variant="outlined" color="neutral" onClick={addEmoji('😍')}>
                😍
              </IconButton> */}
              {/* <Button variant="outlined" color="neutral" sx={{ ml: 'auto' }}>
                See all
              </Button> */}
            </Box>
          }
          endDecorator={
            <Typography level="body-xs" sx={{ ml: 'auto' }}>
              {text.length} character(s)
            </Typography>
          }
          sx={{ minWidth: 300 }}
        />
      </FormControl>

      <Box sx={{ display: 'flex', overflow: 'scroll', gap:2, p:3 }}>
        
        {
          goals?.map((goal, index) => {
            return (
              <Card key={index} sx={{ minWidth: '200px', height: 'auto' }} variant="solid" color="primary" invertedColors>
                <CardContent orientation="horizontal" sx={{ display: 'flex', alignItems: 'center' }}>
                  <CircularProgress size="lg" determinate value={20}>
                    <TrendingUpOutlinedIcon />
                  </CircularProgress>
                  <CardContent>
                    <Typography level="body-md">{goal?.question}</Typography>
                    {/* <Typography level="h2">$ 432.6M</Typography> */}
                  </CardContent>
                </CardContent>
                <CardActions sx={{ display: 'flex' }}>
                  <LoadingButton onClick={async e => {
                    try {
                      setcardLoading(true)
                      const url = `http://172.20.10.14:9090/api/v1/goals/${goal.id}`;
                      const data = {
                        complete: true
                      };
                      const authorizationToken = router.query.token;
                      const response = await fetch(url, {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${authorizationToken}`,
                        },
                        body: JSON.stringify(data),
                      });

                      if (!response.ok) {
                        throw new Error(`HTTP error: ${response.status}`);
                      }

                      const updatedData = await response.json();
                      console.log('Updated data:', updatedData);
                      let arr = goals
                      arr.splice(index, 1)
                      setgoals(arr)
                      return updatedData; // Or handle the response as needed
                      
                    } catch (error) {
                      console.error('Error updating data:', error);
                      return null; // Or handle the error appropriately
                    }finally{
                      setcardLoading(false)
                    }
                  }}  sx={{ flex: 1, background:'white', color:'black' }}
                    size="small"
                    loading={cardLoading}
                    loadingPosition="end"
                    variant="solid"
                    color="white"
                  >
                    <span>Yes</span>
                  </LoadingButton>
                </CardActions>
              </Card>
            )
          })
        }
      </Box>

      <Box sx={{ px: 3, py: 2 }}>
        <Button onClick={handleSubmit} size="lg" sx={{ width: "100%", mx: 'auto' }} variant="solid" color="primary">
          Submit
        </Button>
        <LoadingButton
          size="lg"
          onClick={handleSubmit}
          // endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="center"
          sx={{ width: "100%", mx: 'auto' }} variant="solid" color="primary"
        >
          <span> .</span>
        </LoadingButton>
      </Box>


    </div>
  );
};

export default Write1;
