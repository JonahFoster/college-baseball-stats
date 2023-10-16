import PropTypes from 'prop-types'
import { Container } from '@mui/material'
import Batting from './Batting'
import Fielding from './Fielding'
import Pitching from './Pitching'

export default function Player({ data }) {
  const playerInfo = data[0]
  const { name } = playerInfo

  const hasBatting = !!data.find(stat => stat.data_type === 'batting')
  const hasFielding = !!data.find(stat => stat.data_type === 'fielding')
  const hasPitching = !!data.find(stat => stat.data_type === 'pitching')

  return (
    <Container>
        <h1>{name}</h1>

        {hasBatting && <Batting data={data} />}
        {hasFielding && <Fielding data={data} />}
        {hasPitching && <Pitching data={data} />}
    </Container>
  )
}

Player.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}
