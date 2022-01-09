
export default class VotingService {

  constructor(repository) {
    this._repository = repository;
  }

  findAll(start,itemsPerPage) {
    if(typeof start === 'number' && typeof itemsPerPage === 'number'){
      return this._repository.listVotingsPaginated(start,itemsPerPage);
    }
    return this._repository.listVotings();
  }

  findById(id) {
    return this._repository.getVoting(id);
  }

  async countGroupedByState() {
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
  
  async VotingsByStartDate(startDate) {
    const votings = await this._repository.listVotings();
    const days = TimeUtil.DateTime(startDate);

    return {
      votings,
      date: days.map((date) => ({
        date: date.toISO(),
        votings: votings.filter(voting => {
          const startDate = voting.startDate != null ? DateTime.fromISO(voting.startDate).startOf('day') : null;
          
          const startDateAfter = startDate != null && date >= startDate;
         
          return startDateAfter;
        })
      }))
    };
  }

  async VotingsByEndDate(endDate) {
    const votings = await this._repository.listVotings();
    const days = TimeUtil.DateTime(endDate);

    return {
      votings,
      date: days.map((date) => ({
        date: date.toISO(),
        votings: votings.filter(voting => {
          const endDate = voting.endDate != null ? DateTime.fromISO(voting.endDate).startOf('day') : null;
          
          const endDateAfter = endDate != null && date >= endDate;
         
          return endDateAfter;
        })
      }))
    };
  }

}