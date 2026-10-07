import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await register({ username, email, password });
      localStorage.setItem('jwt', res.data.jwt);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Something went wrong');
    }
  }

  return (
    <div>
      <h1>Create an account</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={username}
          onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password (min 6 characters)" value={password}
          onChange={(e) => setPassword(e.target.value)} required minLength={6} />
        <button type="submit">Sign up</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Already have an account? <Link to="/login">Log in</Link></p>
    </div>
  );
}