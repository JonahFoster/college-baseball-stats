import { Card, List, ListItem, Typography, Link } from '@mui/material';
import PropTypes from 'prop-types';

export default function TopList({ data, title, statKey }) {

    function truncatePlayerName(playerName) {
        let maxLength = 17;
        if (playerName.length > maxLength) {
          return `${playerName.substring(0, maxLength - 3)}...`; // Subtract 3 for the ellipsis
        }
        return playerName;
      }

  return (
    <Card variant="outlined">
      <Typography variant="h6">{title}</Typography>
      <List>
        {data.map((item, index) => (
          <ListItem key={index}>
            <Link href={`http://localhost:5173/player/${item.stats_player_seq}`} sx={{ color: 'text.primary', textDecoration: 'none' }}>
              <Typography component="span">
                {`${index + 1}. `}
              </Typography>
              <Typography component="span" sx={{ 
                textDecoration: 'underline',
                }}>
                {truncatePlayerName(item.name)}
              </Typography>
              <Typography component="span">
                {` - ${item[statKey]}`}
              </Typography>
            </Link>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}

TopList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  statKey: PropTypes.string.isRequired,
};
