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
            label: 'Votos',
            data: votingResultCount.map(v => v.votes)
          }]
        }
        setVotingResultCount(data);
      })
  }, [params.votingId])




  return (<>
    <PageTitle 
      onBackButtonClick={ () => navigate('/') }
      style={{ marginTop: '2rem' }}
    >Voting detail page</PageTitle>

    { (loaded && voting != null)
      ? (
      <Grid container spacing={2} style={{ marginTop: '1rem' }}>
        <Grid item xs={12} md={6}>
          <Card style={{marginTop:'2rem'}}>
            <CardContent sx={{backgroundColor:'#ffebcc'}}>
              <Typography sx={{ fontSize: 30 }} color="text.primary" gutterBottom>
                { voting.name }
              </Typography>
              <Card variant="outlined">Estado de la votación: {voting.state.name }</Card>
              <Card style={{marginTop:'1rem'}} variant="outlined" >Descripción de la votacion:  {voting.desc}</Card>
              
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>

          { votingResultCount != null && (
          <Card style={{marginTop:'10px', backgroundColor:'#fff5e6'}}>
            <CardContent>
               
               
             <BarChart  {...votingResultCount} title="Número de votos de cada opción" />
            </CardContent>
          </Card>
          )}
        </Grid>
        
        <Grid item xs={12} md={6}>
          
          <Card style={{marginTop:'1rem'}}>
            <CardContent sx={{backgroundColor:'#ffebcc'}}>
              <Typography sx={{ fontSize: 24 , marginLeft:'80px'} } color="text.primary" gutterBottom>
                 QUESTION: {voting.question.desc}
              </Typography>
              { voting.question.options.map((questionOption, i) => (
                    <Grid key={ i }>
                        <Paper sx={{ height: 30, maxWidth: 200, my: 1, mx: 'auto', p: 2,backgroundColor:'', marginRight:'250px' , marginTop:'20px'}}>
                          <Grid container wrap="nowrap" spacing={6}>
                            <Grid item>
                              <Avatar sx={{backgroundColor:'brown'}} >{questionOption.number}</Avatar>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                              <Typography noWrap>{questionOption.option}</Typography>
                            </Grid>
                          </Grid>
                        </Paper>       
                    </Grid>
                  ))
                }

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