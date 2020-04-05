import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useAuth } from '../../hooks/use-auth'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser, fetchProfile } = useAuth();

  const login = async (event) => {
    event.preventDefault();

    if (
      loading
      || username === ''
      || password === ''
    ) return;

    setLoading(true);

    try {
      const { data } = await axios.post('LOGIN', {
        username,
        password,
      });
      setUser(data);
      fetchProfile();
    } catch({ response }) {
      setLoading(false);
      console.log('Error', response);
    }
  }

  return (
    <div>
      <form onSubmit={login}>
        <input
          name="username"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          type="submit"
          disabled={username === '' || password === ''}
        >
          Login
        </button>
        <Link to="/kayit">Don't have an account? Sign up now!</Link>
      </form>
    </div>
  )
}

export default Login
