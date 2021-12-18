
export default class VotingService {

  constructor(repository) {
    this._repository = repository;
  }

  findAll(page) {
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

}