import { DateTime } from 'luxon';
import TimeUtil from 'infrastructure/util/time';

export default class ChartService {

  constructor(repository) {
    this._repository = repository;
  }

  async countVotingsGroupedByState() {
    const votings = await this._repository.listVotings();
    
    const group = votings.reduce((group, voting) => {
      const { state } = voting;
      if (group[state.code] == null) {
        group[state.code] = 0;
      }
      group[state.code] ++;

      return group;
    }, {})

    return group;
  }

  async activeVotingsByDate(startDate, endDate) {
    const votings = await this._repository.listVotings();
    const daysInterval = TimeUtil.daysBetweenInterval(startDate, endDate);

    return {
      votings,
      dates: daysInterval.map((date) => ({
        date: date.toISO(),
        votings: votings.filter(voting => {
          const startDate = voting.startDate != null ? DateTime.fromISO(voting.startDate).startOf('day') : null;
          const endDate = voting.endDate != null ? DateTime.fromISO(voting.endDate).startOf('day') : null;
          const startDateAfter = startDate != null && date >= startDate;
          const endDateBefore = endDate == null || endDate >= date;
          return startDateAfter && endDateBefore;
        })
      }))
    };
  }
}