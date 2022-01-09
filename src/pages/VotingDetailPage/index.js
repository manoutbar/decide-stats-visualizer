import DoughnutChart from 'components/DoughnutChart';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from 'components/PageTitle';
import { Card, CardContent, Typography, Grid, Paper, Avatar } from '@mui/material';
import VotingService from 'domain/service/locator/voting';
import ChartService from 'domain/service/locator/chart';
import BarChart from 'components/BarChart';


export default function VotingDetailPage(props) {
  const navigate = useNavigate();
  const params = useParams();

  const [voting, setVoting] = useState(null);
  const [loaded, setLoaded] = useState(false);


  const [votingResultCount, setVotingResultCount] = useState(null);
  

  useEffect(() => {
    VotingService.findById(params.votingId)
      .then(voting => setVoting(voting))
      .catch(err => console.error(`error getting voting with id ${params.votingId}`, err))
      .then(() => setLoaded(true));


    ChartService.countVotesByOptions(params.votingId)
      .then((votingResultCount) => {
        const labels = votingResultCount.map((v) => v.name);
        const data = {
          labels: labels,
          datasets:[{
            label: 'Número de votos por opción',
            data: votingResultCount.map(v => v.votes)
          }]
        }
        setVotingResultCount(data);
      })
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
          { votingResultCount != null && (
          <Card style={{marginTop:'10px', backgroundColor:'#fff5e6'}}>
            <CardContent>               
             <DoughnutChart {...votingResultCount} title="Número de votos de cada opción" />
            </CardContent>
          </Card>
          )}
        </Grid>
        <Grid item xs={12}>
          Census and voters data
        </Grid>
      </Grid> )
      : ( /** si no se encuentra:*******************************/
      <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
        No se ha encontrado ninguna votación con ID { params.votingId }
      </Typography>
      )
    }
  </>);
}