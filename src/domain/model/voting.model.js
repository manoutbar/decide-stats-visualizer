import VotingState, { VOTING_STATES } from "./voting-state.model";
import Question from "./question.model";
import Postproc from "./voting-postproc.model";

const refreshState = (startDate, endDate) => {
  if (startDate == null) {
    return VOTING_STATES.notStarted;
  } else if (endDate == null) {
    return VOTING_STATES.started;
  } else {
    return VOTING_STATES.finished;
  }
}

export default class Voting {

  constructor({ id, name, desc,question, start_date, end_date, postproc}) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.question = new Question(question);
    this._startDate = start_date;
    this._endDate = end_date;
    this._state = refreshState(start_date, end_date);
    this.postproc = [];

    if (postproc instanceof Array) {
      this.postproc = postproc.map(p => new Postproc(p))
    }
  }

  setState(state) {
    if (!state instanceof VotingState) {
      throw new Error('state argument is not instance of Voting State model')
    }
    this._state = state;
  }

  set startDate(startDate) {
    this._startDate = startDate;
    this._state = refreshState(startDate, this._endDate)
  }

  get startDate() {
    return this._startDate;
  }

  set endDate(endDate) {
    this._endDate = endDate;
    this._state = refreshState(this._startDate, this._endDate)
  }

  get endDate() {
    return this._endDate;
  }

  get state() {
    return this._state;
  }

}