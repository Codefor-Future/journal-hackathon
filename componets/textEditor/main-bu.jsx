import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import Button2 from '@mui/material-next/Button';\]
// import editor from './editor'
import { createReactEditorJS } from 'react-editor-js'

// const ReactEditorJS = createReactEditorJS()

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import Input from '@mui/joy/Input';



import { useRef } from 'react';

import Box from '@mui/material/Box';

const LoginPage = ({emotion}) => {
    const [diary, setdiary] = useState('');
    const [inputvalue, setinputvalue] = useState('')
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const myRef = useRef();

    // text formating 
    const [view, setView] = React.useState('list');

    const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            setdiary(diary + '<br>')
            setinputvalue('')
        }
        if (e.key === 'Backspace') {
            let count = 1
            if (diary.slice(-4) === '<br>') {
                count = 4
            }
            else if (diary.slice(-3) === '<b>') {
                count = 3
            }
            else if (diary.slice(-5) === '</br>') {
                count = 5
            }
            else if (diary.slice(-4) === '</b>') {
                count = 4
            }
            setdiary(diary.substring(0, diary.length - count))
            setinputvalue('')
        }
    }

    const setClosing = (view) => {
        switch (view) {
            case "bold":
                setdiary(diary + "</b>")
                break;
            // case "underline":
            //     setdiary(diary + "</u>")
            //     break;
        }
    }
    const setOpening = (view) => {
        if (view === null) return
        switch (view) {
            case "bold":
                setdiary(diary + "<b>")
                break;

            // case "underline":
            //     setdiary(diary + "<u>")
            //     break;
        }
    }
    //create setopening function like setClosing

    const handleChange = (event, nextView) => {

        console.log(nextView)
        if (view === null) {
            setView(nextView)
            setOpening(nextView)
        } else {
            setClosing(view)
            setView(nextView)
            setOpening(nextView)
        }
        myRef.current.focus()
    };
    const addTextToDiary = (e) => {
        setdiary(diary + e.target.value)
        setinputvalue('')
        console.log(diary)
    }

    const focusTextfield = () => {
        // document.getElementById('textEditor').focus();
        console.log("tet")
        myRef.current.focus()
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic with username and password
        console.log('Login:', username, password);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);

    };

    return (
        <>
            <Box  onClick={focusTextfield } sx={{ position:'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh', width: '80vw',mx:'auto',my:5,borderRadius:'20px' }}>
                <div>
                    <div style={{height:'100%', widht:'100%'}}>
                        <div dangerouslySetInnerHTML={{ __html: diary }} style={{textAlign:'left'}}/>
                    </div>
                    <ToggleButtonGroup
                        style={{ position: 'absolute', top: '10px', right: '10px' }}
                        color="primary"
                        size='small'
                        orientation="vertical"
                        value={view}
                        exclusive
                        onChange={handleChange}
                    >
                        <ToggleButton value="bold" aria-label="list">
                            <FormatBoldIcon />
                        </ToggleButton>
                        {/* <ToggleButton value="lite" aria-label="module">
                    <ViewModuleIcon />
                </ToggleButton>
                <ToggleButton value="underline" aria-label="quilt">
                    <ViewQuiltIcon />
                </ToggleButton> */}
                    </ToggleButtonGroup>
                    <input onKeyDown={handleEnterKeyPress} onChange={addTextToDiary} value={inputvalue} ref={myRef} type="text" style={{ position: 'absolute', top: '50px',zIndex:'-10', left: '0', appearance: 'none', fontSize:'17px' }} />
                </div>
            </Box>
        </>
    );
};

export default LoginPage;
