import PropTypes from 'prop-types' 
import { Typography, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Container } from '@mui/material';

export default function Fielding({ data }) {
    const stats = data.find(stat => stat.data_type === 'fielding')
  return (
    <Container>
        <TableContainer style={{margin: 'auto' }}>
            <Typography sx={{ my: '1em' }} variant="h5">
                Fielding
            </Typography>
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell>Season</TableCell>
                        <TableCell>GP</TableCell>
                        <TableCell>GS</TableCell>
                        <TableCell>PO</TableCell>
                        <TableCell>A</TableCell>
                        <TableCell>TC</TableCell>
                        <TableCell>E</TableCell>
                        <TableCell>FldPct</TableCell>
                        <TableCell>IDP</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{stats.season}</TableCell>
                        <TableCell>{stats.GP}</TableCell>
                        <TableCell>{stats.GS}</TableCell>
                        <TableCell>{stats.PO}</TableCell>
                        <TableCell>{stats.A}</TableCell>
                        <TableCell>{stats.TC}</TableCell>
                        <TableCell>{stats.E}</TableCell>
                        <TableCell>{stats.FldPct}</TableCell>
                        <TableCell>{stats.IDP}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
  ) 
}

Fielding.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
} 
