import { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Header from "./Header.jsx"
import Player from "./Player.jsx"

export default function App() {
  // State for holding player data and dark mode preference
  const [playerData, setPlayerData] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  // Theme configuration based on dark mode preference
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  })

  // Handler to toggle dark mode on and off
  function handleThemeChange() {
    setDarkMode(!darkMode)
  }

  // Handler to initiate player search and update player data state
  function handleSearch(name) {
    fetch(`http://localhost:3000/${name.replace(/\s/g, '-')}`)
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
          onToggleDarkMode={handleThemeChange}
        />
        {playerData && <Player data={playerData} />}
      </Box>
    </ThemeProvider>
  )
}
