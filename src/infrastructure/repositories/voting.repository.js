import Http from '../http/http';
import Voting from 'domain/model/voting.model';

export default class VotingRepository {

    async listVotingsPaginated(start,itemsPerPage) {
        const votings = await Http.get(`/voting/?start=${start}&size=${itemsPerPage}`);
        const list=votings instanceof Array ? votings :[]//Si es list usa voting, si no crea una lista vacia
        const end=(start+itemsPerPage ) >votings.length ? votings.length : (start+itemsPerPage)//Variable ent
        return {
            list: list.slice(start, end).map(voting => new Voting(voting)),
            total: votings.length
            
         }
    }
    async listVotings() {
        const votings = await Http.get('/voting/');

        return votings instanceof Array
          ? (votings.map(voting => new Voting(voting)))
          : [];
    }

    async getVoting(id) {
        const votings = await Http.get(`/voting/?id=${id}`);
        const numId = parseInt(id);

        const votingData = (votings || []).find(voting => voting.id === numId);

        return votingData != null ? new Voting(votingData) : null;
    }
}

