import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from 'components/PageTitle';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import VotingService from 'domain/service/locator/voting';

export default function VotingDetailPage(props) {
  const navigate = useNavigate();
  const params = useParams();

  const [voting, setVoting] = useState(null);
  const [loaded, setLoaded] = useState(false);

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