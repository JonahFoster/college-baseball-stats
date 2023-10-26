import PropTypes from 'prop-types'
import { TableContainer, Typography, Table, TableBody, TableCell, TableHead, TableRow, Container } from '@mui/material' 

export default function Pitching({ data }) {
  const stats = data.find(stat => stat.data_type === 'pitching')

  return (
    <Container>
        <TableContainer style={{margin: 'auto' }}>
            <Typography sx={{ mt: '1em' }} variant="h5">
                Pitching
            </Typography>
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell>Season</TableCell>
                        <TableCell>APP</TableCell>
                        <TableCell>W</TableCell>
                        <TableCell>L</TableCell>
                        <TableCell>R</TableCell>
                        <TableCell>H</TableCell>
                        <TableCell>BB</TableCell>
                        <TableCell>ERA</TableCell>
                        <TableCell>IP</TableCell>
                        <TableCell>ER</TableCell>
                        <TableCell>SO</TableCell>
                        <TableCell>BF</TableCell>
                        <TableCell>WP</TableCell>
                        <TableCell>HB</TableCell>
                        <TableCell>Pitches</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{stats.season}</TableCell>
                        <TableCell>{stats.App}</TableCell>
                        <TableCell>{stats.W}</TableCell>
                        <TableCell>{stats.L}</TableCell>
                        <TableCell>{stats.R}</TableCell>
                        <TableCell>{stats.H}</TableCell>
                        <TableCell>{stats.BB}</TableCell>
                        <TableCell>{stats.ERA}</TableCell>
                        <TableCell>{stats.IP}</TableCell>
                        <TableCell>{stats.ER}</TableCell>
                        <TableCell>{stats.SO}</TableCell>
                        <TableCell>{stats.BF}</TableCell>
                        <TableCell>{stats.WP}</TableCell>
                        <TableCell>{stats.HB}</TableCell>
                        <TableCell>{stats.pitches}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
  ) 
}

Pitching.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
} 
