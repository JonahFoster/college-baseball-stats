import { TextField, Button, Grid } from '@mui/material';
import PropTypes from 'prop-types';


export default function Header({ inputRef, onSearch }) {
  return (
    <Grid 
      container 
      direction="row" 
      alignItems="center"
      justifyContent="center" 
      style={{ minHeight: '20vh' }}
    >
      <Grid item>
        <TextField 
          id="outlined-basic" 
          label="Search" 
          variant="outlined" 
          inputRef={inputRef}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={onSearch} sx={{ marginLeft: 2 }}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
}

Header.propTypes = {
    inputRef: PropTypes.object.isRequired,
    onSearch: PropTypes.func.isRequired,
  };