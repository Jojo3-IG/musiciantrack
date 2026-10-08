import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getSessions, addSession, deleteSession } from '../api';
import { minutesThisWeek, practiceStreak } from '../utils/stats';

const INSTRUMENTS = ['piano', 'keys', 'drums', 'bass', 'guitar', 'vocals', 'other'];

export default function Dashboard() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    duration_min: '',
    instrument: 'piano',
    focus: '',
    notes: '',
  });

  async function loadSessions() {
    try {
      const res = await getSessions();
      setSessions(res.data.data);
    } catch (err) {
      setError('Could not load sessions');
    }
  }

  useEffect(() => {
    loadSessions();
  }, []);

  // Not logged in: go to login (placed after the hooks on purpose)
  if (!localStorage.getItem('jwt')) {
    return <Navigate to="/login" />;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await addSession({ ...form, duration_min: Number(form.duration_min) });
      setForm({ ...form, duration_min: '', focus: '', notes: '' });
      loadSessions();
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Could not add session');
    }
  }

  async function handleDelete(documentId) {
    try {
      await deleteSession(documentId);
      loadSessions();
    } catch (err) {
      setError('Could not delete session');
    }
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    navigate('/login');
  }

  const totalMinutes = sessions.reduce((sum, s) => sum + (s.duration_min || 0), 0);
  const weekMinutes =minutesThisWeek(sessions);
  const streak = practiceStreak(sessions);

  return (
    <div>
      <h1>My practice dashboard</h1>
      <button onClick={handleLogout}>Log out</button>

      <p>Total practice time: {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}min</p>
      <p>This week: {Math.floor(weekMinutes / 60)}h {weekMinutes % 60}min</p>
      <p>Streak: {streak} day{streak !== 1 ? 's' : ''} 🔥</p>

      <h2>Add a session</h2>
      <form onSubmit={handleSubmit}>
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
        <input type="number" name="duration_min" placeholder="Minutes" min="1"
          value={form.duration_min} onChange={handleChange} required />
        <select name="instrument" value={form.instrument} onChange={handleChange}>
          {INSTRUMENTS.map((i) => <option key={i} value={i}>{i}</option>)}
        </select>
        <input name="focus" placeholder="What did you work on?"
          value={form.focus} onChange={handleChange} />
        <textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} />
        <button type="submit">Add</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>My sessions</h2>
      {sessions.length === 0 && <p>No sessions yet.</p>}
      <ul>
        {sessions.map((s) => (
          <li key={s.documentId}>
            {s.date} | {s.instrument} | {s.duration_min} min | {s.focus}
            <button onClick={() => handleDelete(s.documentId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}