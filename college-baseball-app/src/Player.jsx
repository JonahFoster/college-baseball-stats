import PropTypes from 'prop-types'
import { Container, Card, CardContent, Typography, Box, Chip } from '@mui/material'
import Batting from './Batting'
import Fielding from './Fielding'
import Pitching from './Pitching'

export default function Player({ data }) {
  const playerInfo = data[0]
  const { name, Jersey, pos, Yr, school_name } = playerInfo

  const hasBatting = !!data.find(stat => stat.data_type === 'batting')
  const hasFielding = !!data.find(stat => stat.data_type === 'fielding')
  const hasPitching = !!data.find(stat => stat.data_type === 'pitching')

  function createFullYear(year) {
    if (year === "Fr") return "Freshman"
    if (year === "So") return "Sophomore"
    if (year === "Jr") return "Junior"
    if (year === "Sr") return "Senior"
  }

  return (
    <Container>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h4">
            {name}
          </Typography>
          <Box mt={2}>
            <Chip label={school_name} color="primary" sx={{ mr: '5px' }}/>
            <Chip label={`#${Jersey}`} color="primary" sx={{ mr: '5px' }}/>
            <Chip label={pos} color="primary" sx={{ mr: '5px' }}/>
            <Chip label={createFullYear(Yr)} color="primary"/>
          </Box>
        </CardContent>
      </Card>
      <Card variant="outlined" sx={{ mt: '10px' }}>
        {hasBatting && <Batting data={data} />}
        {hasPitching && <Pitching data={data} />}
        {hasFielding && <Fielding data={data} />}
      </Card>
    </Container>
  )
}

Player.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}
