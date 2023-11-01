import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Grid, CssBaseline, Box, Container } from '@mui/material';
import Header from "./Header.jsx"
import Player from "./Player.jsx"
import TopList from "./TopList.jsx"

export default function App() {
  const [playerData, setPlayerData] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
  const [topListData, setTopListData] = useState({
    hr: [],
    ba: [],
    ops: [],
    bb: [],
    era: [],
    k: [],
    kp: [],
    baa: []
  });

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

  function handleSearch(name, navigate) {
    fetch(`http://localhost:3000/search/${name.replace(/\s/g, '-')}`)
      .then(response => response.json())
      .then(data => {
        setPlayerData(data);
        // Navigate to the player route after setting the data
        navigate(`/player/${name.replace(/\s/g, '-')}`);
      })
      .catch(error => console.error(error));
  }

  function handleTopLists() {
    const routes = [
      "top-hr",
      "top-ba",
      "top-ops",
      "top-bb",
      "top-era",
      "top-k",
      "top-kp",
      "top-baa"
    ];
  
    const fetchPromises = routes.map(route => fetch(`http://localhost:3000/${route}`).then(res => res.json()));
  
    Promise.all(fetchPromises)
      .then(dataArray => {
        setTopListData({
          hr: dataArray[0],
          ba: dataArray[1],
          ops: dataArray[2],
          bb: dataArray[3],
          era: dataArray[4],
          k: dataArray[5],
          kp: dataArray[6],
          baa: dataArray[7]
        });
      })
      .catch(error => console.error(error));
  }

  useEffect(() => {
    handleTopLists();
  }, []);
  
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <Box>
          <Header
            onSearch={handleSearch}
            darkMode={darkMode}
            onToggleDarkMode={handleDarkMode}
          />
          <Routes>
            <Route path="/player/:name" element={<Player data={playerData} />} />
            <Route path="/" element={
              <Container>
                <Grid container justifyContent="space-between" mt={2}>
                  <Grid item xs={2.5}>
                    <TopList data={topListData.hr} title="Top HR" statKey="HR"/>
                  </Grid>
                  <Grid item xs={2.5}>
                  <TopList data={topListData.ba} title="Top BA" statKey="batting_average"/>
                  </Grid>
                  <Grid item xs={2.5}>
                  <TopList data={topListData.ops} title="Top OPS" statKey="OPS"/>
                  </Grid>
                  <Grid item xs={2.5}>
                  <TopList data={topListData.bb} title="Top BB" statKey="walks"/>
                  </Grid>  
                </Grid>
                <Grid container justifyContent="space-between" mt={2}>
                  <Grid item xs={2.5}>
                    <TopList data={topListData.era} title="Top ERA" statKey="ERA"/>
                  </Grid>
                  <Grid item xs={2.5}>
                  <TopList data={topListData.k} title="Top K" statKey="strikeouts"/>
                  </Grid>
                  <Grid item xs={2.5}>
                  <TopList data={topListData.kp} title="Top K%" statKey="strikeout_percentage"/>
                  </Grid>
                  <Grid item xs={2.5}>
                  <TopList data={topListData.baa} title="Top BAA" statKey="batting_average_against"/>
                  </Grid>  
                </Grid>
            </Container>
          } />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  )
}
