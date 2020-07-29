import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  content: {
    width: '90%',
    maxWidth: 700
  },
  title: {
    textAlign: 'center',
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '95%',
    },
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  }
}));

function Login({ refresh }) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login() {
    try {
      console.log('login')
      const body = {
        email,
        password
      }
      const response = (await axios.post('/admins/login', body)).data
      console.log(response);

      Cookies.set('token', response.token);
      Cookies.set('email', response.admin.email);
      axios.defaults.headers.common = {'Authorization': `Bearer ${response.token}`}

      refresh();
    } catch(error) {
      if (error.response) {
        console.log('login.js - login:', error.response.data);
      } else {
        console.log('login.js - login:', error.message);
      }
    }
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.content}>
        <AppBar position="static">
          <Toolbar color="primary">
            <Typography className={classes.title} variant="h6" noWrap>
              Login
            </Typography>
          </Toolbar>
        </AppBar>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            id="filled-email-input"
            label="Email"
            autoComplete="current-password"
            variant="outlined"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            id="filled-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={login}>
            Login
          </Button>
        </form>
      </Paper>
    </div>
  )
}

export default Login;
