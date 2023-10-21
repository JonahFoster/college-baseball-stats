import PropTypes from 'prop-types'
import { Container, Card, CardContent, Typography, Box } from '@mui/material'
import Batting from './Batting'
import Fielding from './Fielding'
import Pitching from './Pitching'

export default function Player({ data }) {
  const playerInfo = data[0]
  const { name, Jersey, pos, Yr, school_name } = playerInfo

  const hasBatting = !!data.find(stat => stat.data_type === 'batting')
  const hasFielding = !!data.find(stat => stat.data_type === 'fielding')
  const hasPitching = !!data.find(stat => stat.data_type === 'pitching')

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            School: {school_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Jersey Number: {Jersey}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Position: {pos}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Year: {Yr}
          </Typography>
        </CardContent>
      </Card>
      <Box mt={4}>
        {hasBatting && <Batting data={data} />}
        {hasPitching && <Pitching data={data} />}
        {hasFielding && <Fielding data={data} />}
      </Box>
    </Container>
  )
}

Player.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}
