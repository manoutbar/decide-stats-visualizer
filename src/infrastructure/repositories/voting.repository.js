import Http from '../http/http';
import Voting from 'domain/model/voting.model';

export default class VotingRepository {

    async listVotings() {
        const votings = await Http.get('http://localhost:8000/voting/');

        return votings instanceof Array
          ? (votings.map(voting => new Voting(voting)))
          : [];
    }

    async getVoting(id) {
        const votings = await Http.get(`http://localhost:8000/voting/?id=${id}`);
        const numId = parseInt(id);

        const votingData = (votings || []).find(voting => voting.id === numId);

        return votingData != null ? new Voting(votingData) : null;
    }
}