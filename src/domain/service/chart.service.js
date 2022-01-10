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
  async countVotesByOptions(votingId){
    
    const voting  = await this._repository.getVoting(votingId);

    const questionOptions = voting.question.options;
    const postproc = voting.postproc;

    const votingResult = questionOptions.map((questionOption) => {
      const postprocItem = postproc.find((pItem) => questionOption.number === pItem.number);
      const votes = postprocItem != null ? postprocItem.votes : 0;
      return {
        name: questionOption.option, 
        votes
      }

    })
   return votingResult;

  }
  //Revisar
  async countVotesByQuestions(votingId){
    
    const voting  = await this._repository.getVoting(votingId);

    const question = voting.question;
    const postproc = voting.postproc;

    const votingResult = question.map((question) => {
      const postprocItem = postproc.find((pItem) => question.number === pItem.number);
      const votes = postprocItem != null ? postprocItem.votes : 0;
      return {
        name: question, 
        votes
      }

    })
   return votingResult;

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

  
  async countVotesByOptions(votingId){
    
    const voting  = await this._repository.getVoting(votingId);

    const questionOptions = voting.question.options;
    const postproc = voting.postproc;

    const votingResult = questionOptions.map((questionOption) => {
      const postprocItem = postproc.find((pItem) => questionOption.number === pItem.number);
      const votes = postprocItem != null ? postprocItem.votes : 0;
      return {
        name: questionOption.option, 
        votes
      }

    })
   return votingResult;

  }
}