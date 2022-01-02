import TimeUtil from '../time';

describe('Time util tests', () => {

  test('calc days between interval', () => {
    const [ startDate, endDate ] = ['2021-12-08T00:00:00.000+01:00', '2021-12-11T00:00:00.000+01:00'];

    const days = TimeUtil.daysBetweenInterval(startDate, endDate);

    expect(days).toBeInstanceOf(Array);
    expect(days).toHaveLength(3);
  })

  test('throws error when start is greater than end', () => {
    const [ startDate, endDate ] = ['2021-12-08T00:00:00.000+01:00', '2021-12-11T00:00:00.000+01:00'];

    expect(() => {
     TimeUtil.daysBetweenInterval(endDate, startDate);
    }).toThrowError();
  });

  test('calc months between interval', () => {
    const [ startDate, endDate ] = ['2021-10-08T00:00:00.000+01:00', '2021-12-08T00:00:00.000+01:00'];

    const months = TimeUtil.monthsBetweenInterval(startDate, endDate);

    expect(months).toBeInstanceOf(Array);
    expect(months).toHaveLength(2);
  });

  test('calc interval from unit', () => {

    const [ startDate, endDate ] = ['2021-12-08T00:00:00.000+01:00', '2021-12-11T00:00:00.000+01:00'];

    const days = TimeUtil.timeBetweenInterval('days', startDate, endDate);
    const months = TimeUtil.timeBetweenInterval('months', startDate, endDate);

    expect(days).toBeInstanceOf(Array);
    expect(months).toBeInstanceOf(Array);
    expect(days).toHaveLength(3);
    expect(months).toHaveLength(0);

  });

})