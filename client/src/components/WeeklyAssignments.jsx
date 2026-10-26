import { useState,useEffect } from "react";
import { getAssignment } from "../api";

function getYoutubeId(url) {
  const match = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
  return match ? [1] : null;
}


// the components and its memory 
export default function WeeklyAssignment({ instrument  }) {
    const [assignment, setAssignment] = useState(null);
    const [playing , setPlaying ] = useState(false);

    useState(() => {
        setPlaying(false);
        getAssignment(instrument)
            .then((res) => setAssignment(res.data.data[0] || null))
            .catch(() => setAssignment(null));
    }, [instrument]);

      if (!assignment) {
    return (
      <div className="card">
        <h2>This week's assignment</h2>
        <p>No assignment for {instrument} this week yet.</p>
      </div>
    );
  }

  const videoId = getYoutubeId(assignment.youtube_url);

  return (
    <div className="card">
      <h2>This week's assignment: {instrument}</h2>
      <p><strong>{assignment.title}</strong></p>
      {assignment.note && <p>{assignment.note}</p>}

      {videoId && (
        <div className="video-box">
          {playing ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={assignment.title}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          ) : (
            <button className="video-cover" onClick={() => setPlaying(true)}>
              <img src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt={assignment.title} />
              <span className="play-icon">▶</span>
            </button>
          )}
        </div>
      )}

      <p style={{ marginTop: 12 }}>
        <a href={assignment.youtube_url} target="_blank" rel="noreferrer">Open on YouTube</a>
      </p>
    </div>
  );
}

