import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';

import VotingService from 'domain/service/locator/voting';
import ChartService from 'domain/service/locator/chart';
import { VOTING_STATES } from 'domain/model/voting-state.model';

import PageTitle from 'components/PageTitle';
import DoughnutChart from 'components/DoughnutChart';
import TimelineChart from 'components/TimelineChart';
import DateRangePicker from 'components/DateRangePicker';

import pageStyle from './style.module.scss';

const VOTING_STATES_VALUES = Object.values(VOTING_STATES);

export default function VotingListPage() {

  const [ votings, setVotings ]  = useState([]);
  const [ votingsByStateDataset, setVotingsByStateDataset ]  = useState(null);
  const [ activeVotingsTimeInterval, setActiveVotingsTimeInterval ] = useState([
    DateTime.local().startOf('week').toISO(),
    DateTime.local().endOf('week').toISO(),
  ]);
  const [ activeVotingsByDate, setActiveVotingsByDate ]  = useState(null);

  useEffect(() => {
    VotingService.findAll()
      .then(votings => setVotings(votings))
      .catch(err => console.error('error getting votings', err));

    ChartService.countVotingsGroupedByState()
      .then((votingsByState) => {
        const states = VOTING_STATES_VALUES
          .sort((state1, state2) => state1.name > state2.name ? 1 : -1);
        
        const data = {
          labels: states.map(state => state.name),
          datasets: [{
            label: 'Votings count by state',
            data: states.map(state => votingsByState[state.code] || 0)
          }]
        }
        setVotingsByStateDataset(data);
      })
      .catch(err => console.error('error getting votings by state', err));      
  }, [])

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


  return (<>
    <PageTitle
      style={{ marginTop: '1rem' }}
    >Voting list page</PageTitle>

    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        { votings.map((voting, i) => (
            <Card key={ i } className={pageStyle.votingItem}>
              <CardContent>
                <Link to={ `/voting/${voting.id}` }>
                  <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
                  { voting.name }
                  </Typography>
                  { voting.state.name }
                </Link>
              </CardContent>
            </Card>
          ))
        }
      </Grid>
      <Grid item xs={12} md={6}>
        { votingsByStateDataset != null && (
          <Card>
            <CardContent>
              <DoughnutChart {...votingsByStateDataset} />
            </CardContent>
          </Card>
        )}

        { activeVotingsByDate != null && (
          <Card style={{ marginTop: '1rem' }}>
            <CardContent>
              <DateRangePicker 
                value={activeVotingsTimeInterval}
                onChange={
                  (newTimeInterval) => setActiveVotingsTimeInterval(newTimeInterval)
                }
              />
              <Box sx={{ marginTop: '1rem' }}>
                <TimelineChart {...activeVotingsByDate} title="Active votings timeline" />
              </Box>
            </CardContent>
          </Card>
        )}
      </Grid>
    </Grid>    
  </>);
}