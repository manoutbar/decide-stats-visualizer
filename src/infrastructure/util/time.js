import { Interval, DateTime } from 'luxon';


function* days(interval) {
  let cursor = interval.start.startOf('day');
  while (cursor < interval.end) {
    yield cursor;
    cursor = cursor.plus({ days: 1 })
  }
}

function* months(interval) {
  let cursor = interval.start.startOf('month');
  while (cursor < interval.end) {
    yield cursor;
    cursor = cursor.plus({ months: 1 })
  }
}

function fromInterval(key, start, end) {
  const startDate = DateTime.fromISO(start);
  const endDate = DateTime.fromISO(end);

  const interval = Interval.fromDateTimes(startDate, endDate);

  switch(key){
    case 'days': 
      return Array.from(days(interval))
    case 'months':
      return Array.from(months(interval)) 
  }
}

export default class TimeUtil {

  static timeBetweenInterval(unit, start, end) {
    return fromInterval(unit, start, end);
  }

  static daysBetweenInterval(start, end) {
    return fromInterval('days', start, end);
  }

  static monthsBetweenInterval(start, end) {
    return fromInterval('months', start, end);
  }
}