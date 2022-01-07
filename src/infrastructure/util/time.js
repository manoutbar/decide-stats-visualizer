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

function dateInstances(start, end) {
  return [
    DateTime.fromISO(start, { locale: 'es-ES' }),
    DateTime.fromISO(end, { locale: 'es-ES' }),
  ]
}

function fromInterval(start, end) {
  if (end < start)
    throw new Error('end must be greater than start')

  return Interval.fromDateTimes(start, end);  
}

export default class TimeUtil {

  static timeBetweenInterval(unit, start, end) {
    switch(unit) {
      case 'months':
        return TimeUtil.monthsBetweenInterval(start, end);
      case 'days': 
      default:
        return TimeUtil.daysBetweenInterval(start, end);
    }
  }

  static daysBetweenInterval(start, end) {
    const [startDate, endDate] = dateInstances(start, end);
    console.log('startDate', start, startDate.toISO(), 'endDate', end, endDate.toISO())
    const interval = fromInterval(startDate, endDate);
    return Array.from(days(interval))
  }

  static monthsBetweenInterval(start, end) {
    const [startDate, endDate] = dateInstances(start, end).map(d => d.startOf('month'));

    const interval = fromInterval(startDate, endDate);
    return Array.from(months(interval)) 
  }
}