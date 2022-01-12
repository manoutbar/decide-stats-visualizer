import ChartService from "../chart.service";
import VotingRepository from 'infrastructure/repositories/voting.repository';
import VOTINGS_SAMPLE_DATA from './votings.json';
import Voting from 'domain/model/voting.model';

jest.mock('infrastructure/repositories/voting.repository');

const createInstance = (repo) => new ChartService(repo || new VotingRepository());

describe('Chart service tests', () => {

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    VotingRepository.mockClear();
    // repo.listVotings.mockReturnValue(VOTINGS_SAMPLE_DATA.map(d => new Voting(d)));
    // repo.getVoting.mockReturnValue(new Voting(VOTINGS_SAMPLE_DATA[0]));
  });

  test('Count votings grouped by state', async () => {
    const repo = new VotingRepository();
    repo.listVotings.mockReturnValue(VOTINGS_SAMPLE_DATA.map(d => new Voting(d)));

    const chartService = createInstance(repo);
    
    const groupedVotings = await chartService.countVotingsGroupedByState();

    expect(repo.listVotings).toHaveBeenCalledTimes(1);
    expect(groupedVotings).toMatchObject({ FINISHED: 1 })
  })

  test('Get active votings by date', async () => {
    const repo = new VotingRepository();
    repo.listVotings.mockReturnValue(VOTINGS_SAMPLE_DATA.map(d => new Voting(d)));

    const [ startDate, endDate ] = [ '2021-12-08T01:00:00.000+00:00', '2021-12-11T01:00:00.000+00:00'];
    
    const chartService = createInstance(repo);
    
    const result = await chartService.activeVotingsByDate(startDate, endDate);
    
    expect(repo.listVotings).toHaveBeenCalledTimes(1);

    expect(result.votings).toHaveLength(1)
    expect(result.dates).toHaveLength(4);

    expect(result.dates[0].votings).toHaveLength(0);
    expect(result.dates[1].votings).toHaveLength(1);
    expect(result.dates[2].votings).toHaveLength(0);

    expect(result.dates[1].votings[0]).toBeInstanceOf(Voting);
  })

  test('Count votes by options', async () => {

    const repo = new VotingRepository();
    repo.getVoting.mockReturnValue(new Voting(VOTINGS_SAMPLE_DATA[0]));

    const chartService = createInstance(repo);
    
    const result = await chartService.countVotesByOptions(1);

    expect(repo.listVotings).not.toHaveBeenCalled();
    expect(repo.getVoting).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(3);


  })
  
   
});