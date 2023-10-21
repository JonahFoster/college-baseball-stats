import { useState, useRef } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Header from "./Header.jsx";
import Player from "./Player.jsx";

export default function App() {
  const [playerData, setPlayerData] = useState(null);
  const inputRef = useRef();
  const [darkMode, setDarkMode] = useState(false); // State to keep track of dark mode

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  function handleSearch() {
    const name = inputRef.current.value;
    fetch(`http://localhost:3000/${name.replace(/\s/g, '-')}`)
      .then(response => response.json())
      .then(data => setPlayerData(data))
      .catch(error => console.error(error));
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={handleThemeChange} />}
        />
        <Header inputRef={inputRef} onSearch={handleSearch} />
        {playerData && <Player data={playerData} />}
      </Box>
    </ThemeProvider>
  );
}
