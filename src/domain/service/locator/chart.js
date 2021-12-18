import VotingRepository from "infrastructure/repositories/voting.repository";
import ChartService from "../chart.service";

const votingRepository = new VotingRepository();

const chartServiceInstance = new ChartService(votingRepository);

export default chartServiceInstance;