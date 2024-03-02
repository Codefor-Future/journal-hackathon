import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import Button2 from '@mui/material-next/Button';

import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import Link from '@mui/material/Link';
import { useRouter } from 'next/router'

const LoginPage = () => {
    const router = useRouter()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    async function login(username, password) {
        const url = 'http://172.20.10.14:9090/api/v1/users/signin';
        const data = {
            email: username,
            password,
        };
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            console.log(response)
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('login response:', responseData); // Replace with further processing
            return responseData; // Or handle success response based on your needs
        } catch (error) {
            console.error('login error:', error);  // Handle errors appropriately
            return null; // Or return a rejection promise for error handling in caller
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle login logic with name, email, and password
        console.log('login:', username, password);
        setLoading(true);

        login(username, password)
            .then(data => {
                console.log('login successful:', data);
                localStorage.setItem("token", data.token);
                setTimeout(() => {
                    router.push(`/home?token=${data.token}`)
                }, 1000)
            })
            .catch(error => {
                console.error('login failed:', error);
                alert("Something went wrong!")
            })
            .finally(() => {
                setLoading(false);
            })
    };

    return (
        <>
        
            <Box sx={{ display: 'flex', m:0,p:0, flexDirection:'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100%' }}>
            <img style={{width:'100px', height:'100px'}} src="https://www.shutterstock.com/image-vector/notebook-line-icon-high-quality-600nw-1845432868.jpg" alt="" />
            <h3>Mind Journal</h3>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'stretch', margin:0, padding:0 }}>
                    <TextField
                        // size='small'
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        // size='small'
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Link
                        sx={{ width: '100%', mt: 5 }}
                        component="button"
                        variant="body2"
                        onClick={handleSubmit}
                        underline="none" variant="body2" sx={{ display: 'block', flex: 1, textAlign: 'center', borderRadius: '30px', py: 2, background: '#3f51b5', fontSize: "18px", mt: 2, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span>{loading ? "Please wait..." : "Login"}</span>
                    </Link>
                    <Link
                        sx={{ my: 2, mx: 'auto' }}
                        variant="body2"
                        href="/signup"
                    >
                        New here?
                    </Link>
                </form>

            </Box>
        </>
    );
};

export default LoginPage;
