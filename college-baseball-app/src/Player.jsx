import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, CardContent, Typography, Box, Chip } from '@mui/material';
import Batting from './Batting';
import Fielding from './Fielding';
import Pitching from './Pitching';
import teamInfo from './assets/logos.json';
import './assets/player.css'

export default function Player() {
  const [data, setData] = useState([]);
  const { name: playerName } = useParams();
  const DEFAULT_COLOR = "#FFFFFF"; // Temporary default color to test

  useEffect(() => {
    fetch(`http://localhost:3000/search/${playerName.replace(/\s/g, '-')}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error))
  }, [playerName]);

  const playerInfo = data[0] || {};  // Protect against undefined
  const { name, Jersey, pos, Yr, school_name } = playerInfo;

  const teamData = teamInfo.find(team => team.ncaa_name === school_name) || {};  // Protect against undefined

  const hasBatting = !!data.find(stat => stat.data_type === 'batting' && stat.AB !== 0);
  const hasFielding = !!data.find(stat => stat.data_type === 'fielding');
  const hasPitching = !!data.find(stat => stat.data_type === 'pitching');

  function createFullYear(year) {
    if (year === "Fr") return "Freshman";
    if (year === "So") return "Sophomore";
    if (year === "Jr") return "Junior";
    if (year === "Sr") return "Senior";
  }

  return (
    <Container>
      <Card variant="outlined">
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4">
              {name}
            </Typography>
            <Box mt={2}>
            <Chip 
              label={school_name} 
              sx={{ 
                mr: '5px',
                backgroundColor: teamData.primary,
                color: theme => theme.palette.getContrastText(teamData.primary || DEFAULT_COLOR),
              }}
            />
            <Chip 
              label={`#${Jersey}`} 
              sx={{ 
                mr: '5px',
                backgroundColor: teamData.primary,
                color: theme => theme.palette.getContrastText(teamData.primary || DEFAULT_COLOR),
              }}
            />
            <Chip 
              label={pos} 
              sx={{ 
                mr: '5px',
                backgroundColor: teamData.primary,
                color: theme => theme.palette.getContrastText(teamData.primary || DEFAULT_COLOR),
              }}
            />
            <Chip 
              label={createFullYear(Yr)} 
              sx={{ 
                backgroundColor: teamData.primary,
                color: theme => theme.palette.getContrastText(teamData.primary || DEFAULT_COLOR),
              }}
            />
            </Box>
          </Box>
          <img src={teamData.logos} alt={`${school_name} logo`} className="school-logo" />
        </CardContent>
      </Card>
      <Card variant="outlined" sx={{ mt: '10px' }}>
        {hasBatting && <Batting data={data} />}
      </Card>
      <Card variant="outlined" sx={{ mt: '10px' }}>
        {hasPitching && <Pitching data={data} />}
      </Card>
      <Card variant="outlined" sx={{ mt: '10px' }}>
        {hasFielding && <Fielding data={data} />}
      </Card>
    </Container>
  );
}
