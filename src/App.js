import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Login from './components/login';
import Sidemenu from './components/sidemenu';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';

function App() {
  const [open, setOpen] = useState(true);
  const [token, setToken] = useState(Cookies.get('token'));

  if (token) axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

  function refresh() {
    setToken(Cookies.get('token'));
  }

  return (
    <div className="App">
      <CssBaseline />
      {token ?
        <Sidemenu open={open} setOpen={setOpen} refresh={refresh}/> :
        <Login refresh={refresh}/>
      }
    </div>
  );
}

export default App;
