import Voting from '../voting.model';
import VotingState, { VOTING_STATES } from '../voting-state.model';
import Question from '../question.model';

const createVoting = (...args) => {
  const attrs = [ 'id', 'name', 'question', 'start_date', 'end_date'];
  return new Voting(Object.fromEntries(attrs.map((attr, i) => {
    if (attr.endsWith('date') && args[i] != null) {
      return [attr, new Date(args[i]).toISOString()]
    }
    return [attr, args[i]];
  })));
};

const DEFAULT_DATA = {
  id: 1,
  name: 'sample',
  question: { name: 'This is a question' }
}

describe('Voting model tests', () => {

  test('creates a valid instance', () => {
    const [id, name, question] = [DEFAULT_DATA.id, DEFAULT_DATA.name, DEFAULT_DATA.question];
    const start = Date.now() - (60 * 60 * 2 * 1000) ; // 2 hours ago
    const end = Date.now() - (60 * 60 * 1 * 1000) ; // 1 hour ago
    const instance = createVoting(id, name, question, start, end);
 
    expect(instance).toBeInstanceOf(Voting);
    expect(instance.id).toBe(id);
    expect(instance.name).toBe(name);
    expect(instance.startDate).not.toBeNull();
    expect(instance.endDate).not.toBeNull();
    expect(instance.question).toBeInstanceOf(Question);
  });

  test('default state is NOT_STARTED', () => {
    const { id, name, question } = DEFAULT_DATA;
    const instance = createVoting(id, name, question);

    const defaultState = instance.state;
    expect(defaultState).toBeInstanceOf(VotingState)
    expect(defaultState.code).toBe(VOTING_STATES.notStarted.code);
  });

  test('state is STARTED when end date is null', () => {
    const { id, name, question } = DEFAULT_DATA;
    const start = Date.now() - (60 * 60 * 2 * 1000) ; // 2 hours ago
    const instance = createVoting(id, name, question, start);

    const defaultState = instance.state;
    expect(defaultState).toBeInstanceOf(VotingState)
    expect(defaultState.code).toBe(VOTING_STATES.started.code);
  });

  test('state is FINISHED when end date is not null', () => {
    const { id, name, question } = DEFAULT_DATA;
    const start = Date.now() - (60 * 60 * 2 * 1000) ; // 2 hours ago
    const end = Date.now() - (60 * 60 * 1 * 1000) ; // 1 hour ago
    const instance = createVoting(id, name, question, start, end);

    const defaultState = instance.state;
    expect(defaultState).toBeInstanceOf(VotingState)
    expect(defaultState.code).toBe(VOTING_STATES.finished.code);
  });

  test('date getters are OK', () => {
    const { id, name, question } = DEFAULT_DATA;
    const start = Date.now() - (60 * 60 * 2 * 1000) ; // 2 hours ago
    const end = Date.now() - (60 * 60 * 1 * 1000) ; // 1 hour ago
    const instance = createVoting(id, name, question, start, end);

    const [ parsedStart, parsedEnd ] = [instance.startDate, instance.endDate]
      .map((isoDate) => new Date(isoDate).getTime());

    expect(parsedStart).toBe(start)
    expect(parsedEnd).toBe(end)    
  });
})