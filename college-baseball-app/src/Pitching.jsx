import PropTypes from 'prop-types';
import { TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow, Container } from '@mui/material';

export default function Pitching({ data }) {
  const stats = data.find(stat => stat.data_type === 'pitching')

  return (
    <Container>
        <TableContainer component={Paper} style={{margin: 'auto' }}>
            <h2>Pitching</h2>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Season</TableCell>
                        <TableCell>APP</TableCell>
                        <TableCell>R</TableCell>
                        <TableCell>H</TableCell>
                        <TableCell>2B-A</TableCell>
                        <TableCell>3B-A</TableCell>
                        <TableCell>HR-A</TableCell>
                        <TableCell>RBI</TableCell>
                        <TableCell>BB</TableCell>
                        <TableCell>ERA</TableCell>
                        <TableCell>IP</TableCell>
                        <TableCell>ER</TableCell>
                        <TableCell>SO</TableCell>
                        <TableCell>BF</TableCell>
                        <TableCell>P-OAB</TableCell>
                        <TableCell>WP</TableCell>
                        <TableCell>HB</TableCell>
                        <TableCell>SHA</TableCell>
                        <TableCell>SFA</TableCell>
                        <TableCell>Pitches</TableCell>
                        <TableCell>GO</TableCell>
                        <TableCell>FO</TableCell>
                        <TableCell>W</TableCell>
                        <TableCell>L</TableCell>
                        <TableCell>KL</TableCell>
                        <TableCell>Pickoffs</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{stats.season}</TableCell>
                        <TableCell>{stats.App}</TableCell>
                        <TableCell>{stats.R}</TableCell>
                        <TableCell>{stats.H}</TableCell>
                        <TableCell>{stats['2B-A']}</TableCell>
                        <TableCell>{stats['3B-A']}</TableCell>
                        <TableCell>{stats['HR-A']}</TableCell>
                        <TableCell>{stats.RBI}</TableCell>
                        <TableCell>{stats.BB}</TableCell>
                        <TableCell>{stats.ERA}</TableCell>
                        <TableCell>{stats.IP}</TableCell>
                        <TableCell>{stats.ER}</TableCell>
                        <TableCell>{stats.SO}</TableCell>
                        <TableCell>{stats.BF}</TableCell>
                        <TableCell>{stats['P-OAB']}</TableCell>
                        <TableCell>{stats.WP}</TableCell>
                        <TableCell>{stats.HB}</TableCell>
                        <TableCell>{stats.SHA}</TableCell>
                        <TableCell>{stats.SFA}</TableCell>
                        <TableCell>{stats.pitches}</TableCell>
                        <TableCell>{stats.GO}</TableCell>
                        <TableCell>{stats.FO}</TableCell>
                        <TableCell>{stats.W}</TableCell>
                        <TableCell>{stats.L}</TableCell>
                        <TableCell>{stats.KL}</TableCell>
                        <TableCell>{stats.pickoffs}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
  );
}

Pitching.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
