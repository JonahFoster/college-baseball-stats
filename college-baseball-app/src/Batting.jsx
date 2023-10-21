import PropTypes from 'prop-types'
import { TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow, Container } from '@mui/material'

export default function Batting({ data }) {
  const stats = data.find(stat => stat.data_type === 'batting')

  // Stat Calculations
  function formatNumber(num) {
    return num < 1 ? num.toString().substring(1) : num.toString()
  }
  
  const battingAverage = formatNumber((stats.H / stats.AB).toFixed(3))
  const sluggingPercentage = formatNumber((stats.TB / stats.AB).toFixed(3))
  const onBasePercentage = formatNumber(((stats.H + stats.BB + stats.HBP) / (stats.AB + stats.BB + stats.HBP + stats.SF)).toFixed(3))
  const onBasePlusSlug = formatNumber((parseFloat(sluggingPercentage) + parseFloat(onBasePercentage)).toFixed(3))
  

  return (
    <Container>
        <TableContainer component={Paper} style={{margin: 'auto' }}>
            <h2>Batting</h2>
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell>Season</TableCell>
                        <TableCell>BA</TableCell>
                        <TableCell>OBP</TableCell>
                        <TableCell>SLG</TableCell>
                        <TableCell>OPS</TableCell>
                        <TableCell>GS</TableCell>
                        <TableCell>R</TableCell>
                        <TableCell>AB</TableCell>
                        <TableCell>H</TableCell>
                        <TableCell>2B</TableCell>
                        <TableCell>3B</TableCell>
                        <TableCell>TB</TableCell>
                        <TableCell>HR</TableCell>
                        <TableCell>RBI</TableCell>
                        <TableCell>BB</TableCell>
                        <TableCell>HBP</TableCell>
                        <TableCell>SF</TableCell>
                        <TableCell>SH</TableCell>
                        <TableCell>K</TableCell>
                        <TableCell>CS</TableCell>
                        <TableCell>PICKED</TableCell>
                        <TableCell>SB</TableCell>
                        <TableCell>IBB</TableCell>
                        <TableCell>GDP</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{stats.season}</TableCell>
                        <TableCell>{battingAverage}</TableCell>
                        <TableCell>{onBasePercentage}</TableCell>
                        <TableCell>{sluggingPercentage}</TableCell>
                        <TableCell>{onBasePlusSlug}</TableCell>
                        <TableCell>{stats.GP}</TableCell>
                        <TableCell>{stats.GS}</TableCell>
                        <TableCell>{stats.R}</TableCell>
                        <TableCell>{stats.AB}</TableCell>
                        <TableCell>{stats.H}</TableCell>
                        <TableCell>{stats['2B']}</TableCell>
                        <TableCell>{stats['3B']}</TableCell>
                        <TableCell>{stats.TB}</TableCell>
                        <TableCell>{stats.HR}</TableCell>
                        <TableCell>{stats.RBI}</TableCell>
                        <TableCell>{stats.BB}</TableCell>
                        <TableCell>{stats.HBP}</TableCell>
                        <TableCell>{stats.SF}</TableCell>
                        <TableCell>{stats.SH}</TableCell>
                        <TableCell>{stats.K}</TableCell>
                        <TableCell>{stats.CS}</TableCell>
                        <TableCell>{stats.Picked}</TableCell>
                        <TableCell>{stats.SB}</TableCell>
                        <TableCell>{stats.IBB}</TableCell>
                        <TableCell>{stats.GDP}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
  ) 
}

Batting.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
} 