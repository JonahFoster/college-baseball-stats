import { useRef } from 'react';
import { TextField, Button, Grid } from '@mui/material';

export default function Header() {
  const inputRef = useRef();

  function handleSearch() {
    const name = inputRef.current.value;
    window.location.href = `http://localhost:3000/${name.replace(/\s/g, '-')}`;
  }

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
        <Button variant="contained" onClick={handleSearch} sx={{ marginLeft: 2 }}>
          Search
        </Button>
      </Grid>
    </Grid>
    );
}
