import { useState, useRef } from 'react';
import Header from "./Header.jsx";
import Player from "./Player.jsx"; 

export default function App() {
  const [playerData, setPlayerData] = useState(null); 
  const inputRef = useRef();

  function handleSearch() {
    const name = inputRef.current.value;
    fetch(`http://localhost:3000/${name.replace(/\s/g, '-')}`)
      .then(response => response.json())
      .then(data => setPlayerData(data))// Update state with fetched player data
      .catch(error => console.error(error));
  }

  return (
    <div>
      <Header inputRef={inputRef} onSearch={handleSearch} />
      {playerData && <Player data={playerData} />} 
    </div>
  )
}
