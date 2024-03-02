import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import Link from '@mui/material/Link';

import { useRouter } from 'next/router'
// import axios from 'axios'

const SignupPage = () => {
    const router = useRouter()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function signup(name, email, password) {
        const url = 'http://172.20.10.14:9090/api/v1/users/signup';
        const data = {
            fullName: name,
            email,
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
            console.log('Signup response:', responseData); // Replace with further processing
            return responseData; // Or handle success response based on your needs
        } catch (error) {
            console.error('Signup error:', error);  // Handle errors appropriately
            return null; // Or return a rejection promise for error handling in caller
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle signup logic with name, email, and password
        console.log('Signup:', name, email, password);
        setLoading(true);

        signup(name, email, password)
            .then(data => {
                console.log('Signup successful:', data);
                localStorage.setItem("token", data.token);
                router.push('/login')
            })
            .catch(error => {
                console.error('Signup failed:', error);
            })
            .finally(() => {
                setLoading(false);
            })
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <TextField
                    label="Name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <LoadingButton
                    sx={{ my: 1 }}
                    size="medium"
                    onClick={handleSubmit}
                    endIcon={<SendIcon />}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                >
                    <span>Sign Up</span>
                </LoadingButton>
                <Link
                    sx={{ my: 2, mx: 'auto' }}
                    variant="body2"
                    href="/login"
                >
                    Already have an account?
                </Link>
            </form>
        </Box>
    );
};

export default SignupPage;
