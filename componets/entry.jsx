import React, { useState } from 'react';


import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';



function entry({ index, entry }) {
    const [showDetails, setshowDetails] = useState(false)

    return (
        <>
            <ListItem key={index} onClick={e=>setshowDetails(!showDetails)}>
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: entry.emoji === "Sad" ? 'rgba(128, 0, 128, 0.431)' : entry.emoji === "Happy" ? 'orange' : entry.emoji === "Angry" ? 'rgba(251, 56, 56, 0.5)' : 'primary' }}>
                        {new Date(entry.createdDate).getDate()}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={`${entry.title} -- ${new Date(entry.createdDate).toDateString()}`} secondary={!showDetails?`${entry.content?.substring(0, 30)}...`:`${entry.content}`} />
            </ListItem>
            {
                showDetails && <Box sx={{pl:10}}>
                    
                    You had {entry.emoji} feelings on that day
                </Box>  
            }
        </>
    );
}

export default entry;
