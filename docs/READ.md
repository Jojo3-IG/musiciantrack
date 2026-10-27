# 🎹 MusicianTrack

???  (one sentence: what the app is and who it is for)

**Live demo:** coming soon

![Dashboard](docs/dashboard-light.png)

## Why I built it

???  (2 or 3 sentences, in your own words: your church, gospel music, the problem you wanted to solve)

## Features

- Sign up and log in (JWT authentication)
- Private practice sessions: each user only sees their own data
- Stats: total time, time this week, day streak
- Donut chart of practice time per instrument
- Weekly assignments: the coach adds a YouTube video per instrument, and each musician sees the one for their instrument
- Light and dark mode
- Responsive design (works on a phone)

## Screenshots

| Dark mode | Weekly assignment |
|---|---|
| ![Dark](docs/dashboard-dark.png) | ![Assignment](docs/assignment.png) |

## Tech stack

- **Frontend:** React, Vite, React Router, Axios, Recharts
- **Backend:** Strapi 5 (TypeScript), SQLite
- **Tools:** Git, GitHub
- **Planned:** deployment on ???

## Run it locally

1. Clone the repo:
```bash
   git clone https://github.com/Jojo3-IG/musiciantrack.git
   cd musiciantrack
```
2. Start the backend:
```bash
   cd server
   npm install
   npm run develop
```
   Open http://localhost:1337/admin and create an admin account.
3. In the admin, go to Settings → Users & Permissions → Roles → Authenticated, and enable:
   - Practice-session: find, findOne, create, update, delete
   - Assignment: find, findOne
4. Start the frontend, in a second terminal:
```bash
   cd client
   npm install
   npm run dev
```
   Open http://localhost:5173.

## What I learned

- ???  (for example: authentication vs authorization)
- ???  (for example: debugging 400, 401 and 403 errors)
- ???  (one more thing)

## Roadmap

- [ ] Songs repertoire
- [ ] Deployment
- [ ] Owner page to add assignments from the app