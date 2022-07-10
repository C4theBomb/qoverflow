import React from 'react';
import { Link } from 'react-router-dom';
import {
    AppBar,
    Button,
    IconButton,
    Toolbar,
    Typography,
    Box,
} from '@mui/material';
import { useUser } from '../contexts';
import Logo from '../assets/bdpa-logo.svg';
import { SearchBar } from '.';

export default function Navbar() {
    const linkStyle = { textDecoration: 'none', color: 'inherit' };

    const { logout, userData } = useUser();

    function ButtonGroup({ userData }) {
        if (userData.username) {
            return (
                <React.Fragment>
                    <Button
                        color='inherit'
                        component={Link}
                        to='/mail'
                        style={linkStyle}
                    >
                        Mail
                    </Button>
                    <Button
                        color='inherit'
                        component={Link}
                        to='/dashboard'
                        style={linkStyle}
                    >
                        Account
                    </Button>
                    <Button color='inherit' onClick={logout} style={linkStyle}>
                        Logout
                    </Button>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <Button
                        color='inherit'
                        component={Link}
                        to='/login'
                        style={linkStyle}
                    >
                        Login
                    </Button>
                    <Button
                        color='inherit'
                        component={Link}
                        to='/register'
                        style={linkStyle}
                    >
                        Register
                    </Button>
                </React.Fragment>
            );
        }
    }

    //add sign out bar once user logged in

    return (
        <AppBar position='static'>
            <Toolbar>
                <IconButton
                    color='inherit'
                    className='menu-button'
                    component={Link}
                    to='/'
                >
                    <img src={Logo} alt='bdpa logo' width='20' height='20' />
                </IconButton>
                <Typography variant='h6' component='div'>
                    qOverflow
                </Typography>
                <SearchBar />
                <Box sx={{ flexGrow: 1 }} />

                <ButtonGroup userData={userData} />
            </Toolbar>
        </AppBar>
    );
}
