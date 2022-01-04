import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from 'components/PageTitle';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import VotingService from 'domain/service/locator/voting';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';

import ChartService from 'domain/service/locator/chart';
import { VOTING_STATES } from 'domain/model/voting-state.model';
//import { VOTING_ANSWER } from 'domain/service/voting.service';

import DoughnutChart from 'components/DoughnutChart';
import TimelineChart from 'components/TimelineChart';
import DateRangePicker from 'components/DateRangePicker';

import pageStyle from './style.module.scss';
const VOTING_STATES_VALUES = Object.values(VOTING_STATES);
//const VOTING_ANSWER_VALUES = Object.values(VOTING_ANSWER);

export default function VotingDetailPage(props) {
  const [ votings, setVotings ]  = useState([]);
  const [ votingsByStateDataset, setVotingsByStateDataset ]  = useState(null);
  const [ activeVotingsTimeInterval, setActiveVotingsTimeInterval ] = useState([
    DateTime.local().startOf('week').toISO(),
    DateTime.local().endOf('week').toISO(),
  ]);
  const [ activeVotingsByDate, setActiveVotingsByDate ]  = useState(null);

  const navigate = useNavigate();
  const params = useParams();

  const [voting, setVoting] = useState(null);
  const [loaded, setLoaded] = useState(false);
  ChartService.countVotingsGroupedByState()
      .then((votingsByState) => {
        const states =  VOTING_STATES_VALUES    //VOTING_STATES_VALUES
          .sort((state1, state2) => state1.name > state2.name ? 1 : -1);
        
        const data = {
          labels: states.map(state => state.name),
          datasets: [{
            label: 'Votings count by state',
            data: states.map(state => votingsByState[state.code] || 0) //data: states.map(state => votingsByState[state.code] || 0)
          }]
        }
        setVotingsByStateDataset(data);
      })
      .catch(err => console.error('error getting votings by state', err));      

      useEffect(() => {
    ChartService.activeVotingsByDate(activeVotingsTimeInterval[0], activeVotingsTimeInterval[1])
      .then((activeVotingsData) => {
        // const today = DateTime.local();
        const data = {
          labels: activeVotingsData.dates.map(voting => DateTime.fromISO(voting.date).toFormat('dd/MM/yyyy')),
          datasets: activeVotingsData.votings.map((voting, i) => ({
            label: voting.name,
            fill: 'origin',
            data: activeVotingsData.dates
              // .filter(dateData => DateTime.fromISO(dateData.date) <= today)
              .map(dateData => {
                const idx = dateData.votings.findIndex(v => v.id === voting.id);
                  return idx === -1 ? 0 : dateData.votings.length - idx;
              })
          }))
        }
        setActiveVotingsByDate(data);
      })
      .catch(err => console.error('error getting votings by state', err));
  }, [ activeVotingsTimeInterval ])

  useEffect(() => {
    VotingService.findById(params.votingId)
      .then(voting => setVoting(voting))
      .catch(err => console.error(`error getting voting with id ${params.votingId}`, err))
      .then(() => setLoaded(true));
    }, [])
    
  
  return (<>
    <PageTitle 
      onBackButtonClick={ () => navigate('/') }
      style={{ marginTop: '1rem' }}
    >Voting detail page</PageTitle>

    { (loaded && voting != null)
      ? (
      <Grid container spacing={2} style={{ marginTop: '1rem' }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
                { voting.name }
              </Typography>
              { voting.state.name }
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          CHARTS SECTION
          <Card>
            <CardContent>
              <DoughnutChart {...votingsByStateDataset} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          Census and voters data
        </Grid>
      </Grid> )
      : ( /** not found *******************************/
      <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
        No se ha encontrado ninguna votación con ID { params.votingId }
      </Typography>
      )
    }
  </>);
}