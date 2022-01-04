import Http from '../http/http';
import Voting from 'domain/model/voting.model';

export default class VotingRepository {

    async listVotingsPaginated(start,itemsPerPage) {
        const votings = await Http.get(`http://localhost:8000/voting/?start=${start}&size=${itemsPerPage}`);
        const list=votings instanceof Array ? votings :[]//Si es list usa voting, si no crea una lista vacia
        const end=(start+itemsPerPage ) >votings.length ? votings.length : (start+itemsPerPage)//Variable ent
        return {
            list: list.slice(start, end).map(voting => new Voting(voting)),
            total: votings.length
            
         }
    }
    async listVotings() {
        const votings = await Http.get(`http://localhost:8000/voting/`);
        const list=votings instanceof Array ? votings :[]//Si es list usa voting, si no crea una lista vacia 
        return  list.map(voting => new Voting(voting));
  
    }

    async getVoting(id) {
        const votings = await Http.get(`http://localhost:8000/voting/?id=${id}`);
        const numId = parseInt(id);

        const votingData = (votings || []).find(voting => voting.id === numId);

        return votingData != null ? new Voting(votingData) : null;
    }
}

