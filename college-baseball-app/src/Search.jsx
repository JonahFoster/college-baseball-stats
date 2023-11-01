import { Link } from 'react-router-dom';
import { Container } from '@mui/material';
import PropTypes from 'prop-types';

export default function Search({ players }) {

    const uniquePlayers = [];
    
    for (const player of players) {
      let isDuplicate = false;
      
      for (const uniquePlayer of uniquePlayers) {
        if (uniquePlayer.stats_player_seq === player.stats_player_seq) {
          isDuplicate = true;
          break;
        }
      }
      
      if (!isDuplicate) {
        uniquePlayers.push(player);
      }
    }
  
    return (
      <Container>
        <h2>Select a Player</h2>
        <ul>
          {uniquePlayers.map(player => (
            <li key={player.stats_player_seq}>
              <Link to={`/player/${player.stats_player_seq}`}>
                {player.name} - {player.school_name}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    );
  }
  

Search.propTypes = {
    players: PropTypes.arrayOf(
      PropTypes.shape({
        stats_player_seq: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        school_name: PropTypes.string.isRequired,
      })
    ).isRequired,
  };