const MESSAGES = [
  { text: 'Every minute of practice is an offering. Keep going!', verse: '' },
  { text: 'Small steps every day build a great musician.', verse: '' },
  { text: 'Sing to the Lord a new song.', verse: 'Psalm 33:3' },
  { text: 'Whatever you do, work at it with all your heart.', verse: 'Colossians 3:23' },
  { text: 'Your gift will make room for you.', verse: 'Proverbs 18:16' },
  { text: 'Progress, not perfection. Your church needs your sound.', verse: '' },
];

function streakMessage(streak) {
  if (streak === 0) return 'Lets start all over again'; // your turn: write a gentle message to restart
  if (streak < 7) return `${streak} day(s) in a row. Great start!`;
  return `${streak} days in a row. You are on fire!`;
}

export default function Encouragement({ streak }) {
  // A different message each day: day number modulo the list length
  const dayNumber = Math.floor(Date.now() / 86400000);
  const message = MESSAGES[dayNumber % MESSAGES.length];

  return (
    <div className="card encourage">
      <p><strong>{streakMessage(streak)}</strong></p>
      <p style={{ marginTop: 8 }}>{message.text}</p>
      {message.verse && <p className="verse">{message.verse}</p>}
    </div>
  );
}