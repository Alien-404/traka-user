const moment = require('moment-timezone');

const generateSchedule = (start, end, interval, stopTime) => {
  const schedules = [];
  const startTime = moment(start, 'HH:mm');
  const endTime = moment(end, 'HH:mm');
  let currentTime = startTime;

  while (currentTime.isSameOrBefore(endTime)) {
    const formattedTime = currentTime.format('HH:mm');
    const hasStopTime = stopTime.find((time) => time === formattedTime);

    if (hasStopTime) {
      schedules.push({ period: formattedTime, notes: 'istirahat' });
    } else {
      schedules.push({ period: formattedTime });
    }

    currentTime.add(interval, 'minutes');
  }

  return schedules;
};

module.exports = generateSchedule;

// const data = generateSchedule('06:00', '20:30', 30, ['12:30']).map(
//   (period) => period
// );
