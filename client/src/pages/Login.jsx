import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await login({ identifier, password });
      localStorage.setItem('jwt', res.data.jwt);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Something went wrong');
    }
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" value={identifier}
          onChange={(e) => setIdentifier(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Log in</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>No account yet? <Link to="/register">Sign up</Link></p>
    </div>
  );
}