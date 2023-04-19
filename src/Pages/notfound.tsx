import React from 'react';
import {
  Button,
  Typography,
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router';

interface Props {
  title: string;
}

const NotFound: React.FC<Props> = ({ title }) => {
  const navigate = useNavigate()

    function handleGoBack() {
    navigate(-1);
  }
  return (
    <Grid display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
      <center>
        <Typography>{title}</Typography>
        <Button onClick={handleGoBack}>Go back</Button>
      </center>
    </Grid>
  );
};

NotFound.defaultProps = {
  title: 'Page not found'
};

export default NotFound;