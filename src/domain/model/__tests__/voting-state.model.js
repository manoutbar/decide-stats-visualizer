import VotingState, { VOTING_STATES } from '../voting-state.model';


const DEFAULT_DATA = {
  code: 'SAMP_CODE',
  name: 'sample',
}

describe('VotingState model tests', () => {

  test('creates a valid instance', () => {
    const [code, name] = [DEFAULT_DATA.code, DEFAULT_DATA.name];
    const instance = new VotingState({ code, name });
 
    expect(instance).toBeInstanceOf(VotingState);
    expect(instance.code).toBe(code);
    expect(instance.name).toBe(name);
  });

  test('contains predefined NOT_STARTED state', () => {
    const instance = VOTING_STATES.notStarted;

    expect(instance).toBeInstanceOf(VotingState)
    expect(instance.code).toBe("NOT_STARTED");
  });

  test('contains predefined STARTED state', () => {
    const instance = VOTING_STATES.started;

    expect(instance).toBeInstanceOf(VotingState)
    expect(instance.code).toBe("STARTED");
  });

  test('contains predefined FINISHED state', () => {
    const instance = VOTING_STATES.finished;

    expect(instance).toBeInstanceOf(VotingState)
    expect(instance.code).toBe("FINISHED");
  });
})