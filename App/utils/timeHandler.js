export const durationToMinute = (duration) => {
  const [hours, minutes] = duration.split(":").map(Number);
  return hours * 60 + minutes;
};

export const minutesToDuration = (minutes) => {
  const houres = Math.floor(minutes / 60);
  const min = minutes % 60;
  return `${String(houres).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
};

export const timeFormat = (time) => {
  const timeParts = time.split(":");

  if (timeParts.length === 3) {
    const [hours, minute, second] = timeParts;
    return `${String(hours).padStart(2, "0")}h ${String(minute).padStart(
      2,
      "0"
    )}m ${String(second).padStart(2, "0")}s`;
  }
  if (timeParts.length === 2) {
    const [minute, second] = timeParts;
    return `${String(minute).padStart(2, "0")}m ${String(second).padStart(
      2,
      "0"
    )}s`;
  }
  if (timeParts.length === 1) {
    const [second] = timeParts;
    return `${String(second).padStart(2, "0")}s`;
  }
};
