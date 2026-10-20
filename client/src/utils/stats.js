//DATE TURN INTO A TEXT LIKE "2026-10-08"

function toDateString(d) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2,'0');
    const day = String(d.getDate()).padStart(2,'0');
    return `${year}-${month}-${day}`;
}

//DATE OF THIS WEEKS MONDAY , AS TEXT
export function getMondayOfThisWeek(){
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday ... 6 = Saturday
    const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    today.setDate(today.getDate() - daysSinceMonday);
    return toDateString(today);

}

export function minutesThisWeek(sessions) {
  const monday = getMondayOfThisWeek();
  const thisWeek = sessions.filter((s) => s.date >= monday);
  return thisWeek.reduce((sum, s) => sum + s.duration_min, 0);
}

export function practiceStreak(sessions) {
    // A Set is a list without duplicates, fast to search
    const days = new Set(sessions.map((s)=> s.date))
    
    const day = new Date();

    // No practice today yet? The streak can still be alive from yesterday
    if (!days.has(toDateString(day))) {
        day.setDate(day.getDate() - 1);
    }

      let streak = 0;
  while (days.has(toDateString(day))) {
    streak++;
    day.setDate(day.getDate() - 1); // go back one day
  }
  return streak;
}

export function last7Days(sessions) {
  const result = [];
  const day = new Date();
  day.setDate(day.getDate() - 6); // start 6 days ago

  for (let i = 0; i < 7; i++) {
    const text = toDateString(day);
    const minutes = sessions
      .filter((s) => s.date === text)
      .reduce((sum, s) => sum + s.duration_min, 0);
    result.push({ day: text.slice(5), minutes }); // slice(5) keeps "10-08"
    day.setDate(day.getDate() + 1); // move forward one day
  }
  return result;
}

export function heatmapData(sessions, weeks = 15) {
  // minutes practiced for each date, like { '2026-10-08': 45 }
  const minutesByDate = {};
  sessions.forEach((s) => {
    minutesByDate[s.date] = (minutesByDate[s.date] || 0) + s.duration_min;
  });

  const todayText = toDateString(new Date());

  // start on the Monday of the first week shown
  const day = new Date();
  const dayOfWeek = day.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  day.setDate(day.getDate() - daysSinceMonday - (weeks - 1) * 7);

  const cells = [];
  for (let i = 0; i < weeks * 7; i++) {
    const date = toDateString(day);
    cells.push({
      date,
      minutes: minutesByDate[date] || 0,
      future: date > todayText,
    });
    day.setDate(day.getDate() + 1); // move forward one day
  }
  return cells;
}

export function levelFor(minutes) {
  if (minutes === 0) return 0;
  if (minutes < 30) return 1;
  if (minutes < 60) return 2;
  if (minutes < 90) return 3;
  return 4;
}

export function byInstrument(sessions) {
  const totals = {};
  sessions.forEach((s) => {
    totals[s.instrument] = (totals[s.instrument] || 0) + s.duration_min;
  });
  return Object.entries(totals).map(([name, minutes]) => ({ name, minutes }));
}