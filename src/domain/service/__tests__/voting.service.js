import VotingService from "../voting.service";
import VotingRepository from 'infrastructure/repositories/voting.repository';
import VOTINGS_SAMPLE_DATA from './votings.json';
import Voting from 'domain/model/voting.model';

jest.mock('infrastructure/repositories/voting.repository');

const createInstance = (repo) => new VotingService(repo || new VotingRepository());

describe('Voting service tests', () => {

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    VotingRepository.mockClear();
    // repo.listVotings.mockReturnValue(VOTINGS_SAMPLE_DATA.map(d => new Voting(d)));
    // repo.getVoting.mockReturnValue(new Voting(VOTINGS_SAMPLE_DATA[0]));
  });

  test('Find all votings', async () => {
    const repo = new VotingRepository();
    repo.listVotings.mockReturnValue(VOTINGS_SAMPLE_DATA.map(d => new Voting(d)));

    const votingService = createInstance(repo);
    
    const result = await votingService.findAll();

    expect(repo.listVotings).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(1);
    expect(result[0]).toBeInstanceOf(Voting);
  })

  test('Find votings by id', async () => {
    const repo = new VotingRepository();
    repo.getVoting.mockReturnValue(new Voting(VOTINGS_SAMPLE_DATA[0]));

    const votingService = createInstance(repo);
    
    const result = await votingService.findById(1);

    expect(repo.listVotings).not.toHaveBeenCalled();
    expect(repo.getVoting).toHaveBeenCalledTimes(1);
    expect(result).toBeInstanceOf(Voting);
  })

  test('Count votings grouped by state', async () => {
    const repo = new VotingRepository();
    repo.listVotings.mockReturnValue(VOTINGS_SAMPLE_DATA.map(d => new Voting(d)));

    const votingService = createInstance(repo);
    
    const result = await votingService.countGroupedByState();

    expect(repo.listVotings).toHaveBeenCalledTimes(1);
    expect(result).toMatchObject({ FINISHED: 1 })
  })

});