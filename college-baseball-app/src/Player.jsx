import PropTypes from 'prop-types'
import { Container } from '@mui/material'
import Batting from './Batting'
import Fielding from './Fielding'
import Pitching from './Pitching'

export default function Player({ data }) {
  const playerInfo = data[0]
  const { pos, name } = playerInfo

  const hasBatting = ['INF', 'OF', 'UT'].includes(pos)
  const hasFielding = ['INF', 'P', 'OF', 'UT'].includes(pos)
  const hasPitching = ['P', 'UT'].includes(pos)

  return (
    <Container>
        <h1>{name}</h1> {/* Rendering player's name here */}

        {hasBatting && <Batting data={data} />}
        {hasFielding && <Fielding data={data} />}
        {hasPitching && <Pitching data={data} />}
    </Container>
  )
}

Player.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}
