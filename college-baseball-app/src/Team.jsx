import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, CardContent, Typography, Box, Chip, CircularProgress } from '@mui/material';
import teamInfo from './assets/logos.json';
import './assets/player.css'
import defaultLogo from'./assets/cbb-stats-logo.webp'

export default function Team() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { school_name } = useParams();
  
    useEffect(() => {
      setIsLoading(true);
      fetch(`http://localhost:3000/team/${school_name}`)
        .then(response => response.json())
        .then(data => {
          setData(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error(error);
          setIsLoading(false);
        });
    }, [school_name]);
  
    const renderPlayerStats = (player) => {
      return (
        <Card variant="outlined" sx={{ mt: '10px' }}>
          <CardContent>
            <Typography variant="h6">{player.name} - {player.pos} ({player.Yr})</Typography>
            {/* Add more player stats here as needed */}
            <Typography>Games Played: {player.GP}</Typography>
            {/* Continue adding other stats */}
          </CardContent>
        </Card>
      );
    };
  
    if (isLoading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      );
    }
  
    return (
      <Container>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h4">{school_name} Team</Typography>
            {/* Add more team info here if needed */}
          </CardContent>
        </Card>
        {data.map(player => renderPlayerStats(player))}
      </Container>
    );
  }
  
