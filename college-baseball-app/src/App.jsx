import { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Header from "./Header.jsx"
import Player from "./Player.jsx"

export default function App() {
  const [playerData, setPlayerData] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#00e0ff',
      },
      secondary: {
        main: '#444444',
      },
      error: {
        main: '#ff4d4d',
      },
      background: {
        default: darkMode ? '#121212' : '#ffffff',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#ffffff' : '#000000',
        secondary: darkMode ? '#bbbbbb' : '#000000',
      },
    },
    overrides: {
      MuiButton: {
        root: {
          borderRadius: '8px',
        },
      },
    },
  })

  function handleDarkMode() {
    setDarkMode(!darkMode)
  }

  function handleSearch(name) {
    fetch(`http://localhost:3000/search/${name.replace(/\s/g, '-')}`)
      .then(response => response.json())
      .then(data => setPlayerData(data))
      .catch(error => console.error(error))
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Header
          onSearch={handleSearch}
          darkMode={darkMode}
          onToggleDarkMode={handleDarkMode}
        />
        {playerData && <Player data={playerData} />}
      </Box>
    </ThemeProvider>
  )
}
