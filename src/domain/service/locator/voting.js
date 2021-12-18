import VotingRepository from "infrastructure/repositories/voting.repository";
import VotingService from "../voting.service";

const votingRepository = new VotingRepository();

const votingServiceInstance = new VotingService(votingRepository);

export default votingServiceInstance;