import React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import classes from './style.module.scss';

export default function VotingDetailPage({ onBackButtonClick, children, style }) {

  return (
    <Stack direction="row" spacing={1} alignItems="center" style={ style } className={ classes.PageTitle }>
      { typeof onBackButtonClick === 'function' && (
        <IconButton onClick={ onBackButtonClick }>
          <ArrowBackIosIcon />
        </IconButton>
      ) }
      <Typography variant="h4" component="h4" gutterBottom>{ children }</Typography>
    </Stack>
  );
}