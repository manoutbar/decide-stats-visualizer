import VotingService from "../voting.service";
import VotingRepository from 'infrastructure/repositories/voting.repository';
import VOTINGS_SAMPLE_DATA from './votings.json';
import Voting from 'domain/model/voting.model';
import votingServiceInstance from "../locator/voting";

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

  test('Find votings finished', async () => {
    const repo = new VotingRepository();
    repo.getVoting.mockReturnValue(new Voting(VOTINGS_SAMPLE_DATA[0]));

    const votingService = createInstance(repo);
    
    const result = await votingService.findAll.FINISHED;

    expect(repo.listVotings).not.toHaveBeenCalled();
    expect(repo.getVoting).toHaveBeenCalledTimes(1);
    expect(result).toBeInstanceOf(Voting);
  })
  test('Find votings finished', async () => {
    const repo = new VotingRepository();
    repo.getVoting.mockReturnValue(new Voting(VOTINGS_SAMPLE_DATA[0]));

    const votingService = createInstance(repo);
    
    const result = await votingService.Voting.findAll.

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

  
  test('Get votings by start date', async () => {
    const repo = new VotingRepository();
    repo.listVotings.mockReturnValue(VOTINGS_SAMPLE_DATA.map(d => new Voting(d)));

    const [ startDate] = [ '2021-12-08T01:00:00.000+00:00'];
    
    const chartService = createInstance(repo);
    
    const result = await VotingService.votingByStartDate(startDate);
    
    expect(repo.listVotings).toHaveBeenCalledTimes(1);

    expect(result.votings).toHaveLength(1)
    expect(result.dates).toHaveLength(4);

    expect(result.dates[0].votings).toHaveLength(0);
    expect(result.dates[1].votings).toHaveLength(1);
    expect(result.dates[2].votings).toHaveLength(0);

    expect(result.dates[1].votings[0]).toBeInstanceOf(Voting);
  })

  test('Get votings by end date', async () => {
    const repo = new VotingRepository();
    repo.listVotings.mockReturnValue(VOTINGS_SAMPLE_DATA.map(d => new Voting(d)));

    const [endDate] = [ '2021-12-11T01:00:00.000+00:00'];
    
    const chartService = createInstance(repo);
    
    const result = await VotingService.votingByEndDate(endDate);
    
    expect(repo.listVotings).toHaveBeenCalledTimes(1);

    expect(result.votings).toHaveLength(1)
    expect(result.dates).toHaveLength(4);
    
    expect(result.dates[0].votings).toHaveLength(0);
    expect(result.dates[1].votings).toHaveLength(1);
    expect(result.dates[2].votings).toHaveLength(0);

    expect(result.dates[1].votings[0]).toBeInstanceOf(Voting);
  })

})