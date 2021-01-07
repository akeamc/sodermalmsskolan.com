const humanReadableTime = (totalSeconds: number, padHour = false): string => {
  const totalMinutes = totalSeconds / 60;

  const hour = Math.floor(totalMinutes / 60).toString();
  const minute = (totalMinutes % 60).toString().padStart(2, "0");

  return [padHour ? hour.padStart(2, "0") : hour, minute].join(":");
};

export default humanReadableTime;
