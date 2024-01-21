import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state to track login status
  const history = useHistory();

  const login = () => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    formData.append('grant_type', 'password');

    axios.post('https://apiv2stg.promilo.com/user/oauth/token', formData)
      .then(response => {
        // Handle successful login
        console.log(response);
        setIsLoggedIn(true); // Set login status to true
        history.push('/product-list'); // Redirect to the product list page
      })
      .catch(error => {
        // Handle login error
        console.error(error);
      });
  };

  return (
    <div>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button onClick={login}>Login</button>

      {isLoggedIn && <p>Login successful!</p>}
    </div>
  );
}

export default Login;
