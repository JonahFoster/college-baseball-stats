import PropTypes from 'prop-types';
import { Container, Card, CardContent, Typography, Box, Chip } from '@mui/material';
import Batting from './Batting';
import Fielding from './Fielding';
import Pitching from './Pitching';
import teamInfo from './assets/logos.json';
import './assets/player.css'

export default function Player({ data }) {
  const playerInfo = data[0];
  const { name, Jersey, pos, Yr, school_name } = playerInfo;

  const teamData = teamInfo.find(team => team.ncaa_name === school_name);

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
                color: theme => theme.palette.getContrastText(teamData.primary),
              }}
            />
            <Chip 
              label={`#${Jersey}`} 
              sx={{ 
                mr: '5px',
                backgroundColor: teamData.primary,
                color: theme => theme.palette.getContrastText(teamData.primary),
              }}
            />
            <Chip 
              label={pos} 
              sx={{ 
                mr: '5px',
                backgroundColor: teamData.primary,
                color: theme => theme.palette.getContrastText(teamData.primary),
              }}
            />
            <Chip 
              label={createFullYear(Yr)} 
              sx={{ 
                backgroundColor: teamData.primary,
                color: theme => theme.palette.getContrastText(teamData.primary),
              }}
            />
            </Box>
          </Box>
          <img src={teamData.logos} alt={`${school_name} logo`} className="school-logo" />
        </CardContent>
      </Card>
      <Card variant="outlined" sx={{ mt: '10px' }}>
        {hasBatting && <Batting data={data} />}
        {hasPitching && <Pitching data={data} />}
        {hasFielding && <Fielding data={data} />}
      </Card>
    </Container>
  );
}

Player.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
