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
