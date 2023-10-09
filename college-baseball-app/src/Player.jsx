import PropTypes from 'prop-types';
import { TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow, Container } from '@mui/material';

export default function Player({ data }) {
  const hittingStats = data[2];  // Accessing the third object in the data array for hitting stats

  return (
    <Container>
        <h1>{data[0].name}</h1>
        <TableContainer component={Paper} style={{margin: 'auto' }}>
            <h2>Batting</h2>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Season</TableCell>
                        <TableCell>GP</TableCell>
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
                        <TableCell>{hittingStats.season}</TableCell>
                        <TableCell>{hittingStats.GP}</TableCell>
                        <TableCell>{hittingStats.GS}</TableCell>
                        <TableCell>{hittingStats.R}</TableCell>
                        <TableCell>{hittingStats.AB}</TableCell>
                        <TableCell>{hittingStats.H}</TableCell>
                        <TableCell>{hittingStats['2B']}</TableCell>
                        <TableCell>{hittingStats['3B']}</TableCell>
                        <TableCell>{hittingStats.TB}</TableCell>
                        <TableCell>{hittingStats.HR}</TableCell>
                        <TableCell>{hittingStats.RBI}</TableCell>
                        <TableCell>{hittingStats.BB}</TableCell>
                        <TableCell>{hittingStats.HBP}</TableCell>
                        <TableCell>{hittingStats.SF}</TableCell>
                        <TableCell>{hittingStats.SH}</TableCell>
                        <TableCell>{hittingStats.K}</TableCell>
                        <TableCell>{hittingStats.CS}</TableCell>
                        <TableCell>{hittingStats.Picked}</TableCell>
                        <TableCell>{hittingStats.SB}</TableCell>
                        <TableCell>{hittingStats.IBB}</TableCell>
                        <TableCell>{hittingStats.GDP}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
  );
}

Player.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
