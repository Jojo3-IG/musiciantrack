import { Navigate, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  // No token = not logged in, so send the user to the login page
  if (!localStorage.getItem('jwt')) {
    return <Navigate to="/login" />;
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    navigate('/login');
  }

  return (
    <div>
      <h1>My practice dashboard</h1>
      <p>You are logged in 🎶</p>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}