import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useAuth } from '../../hooks/use-auth'

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser, fetchProfile } = useAuth();

  const register = async (event) => {
    event.preventDefault();

    if (
      loading
      || email === ''
      || username === ''
      || password === ''
      || secondPassword === ''
    ) return;

    setLoading(true);

    try {
      const { data } = await axios.post('REGISTER', {
        email,
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
      <form onSubmit={register}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
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
        <input
          name="secondPassword"
          type="password"
          placeholder="Repeat Password"
          value={secondPassword}
          onChange={(event) => setSecondPassword(event.target.value)}
        />
        <button
          type="submit"
          disabled={(password !== '' || secondPassword !== '') && password !== secondPassword}
        >
          REGISTER
        </button>
        <Link to="/kayit">Already have an account? Sign in now!</Link>
      </form>
    </div>
  )
}

export default Register
