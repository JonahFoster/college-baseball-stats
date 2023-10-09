import './App.css';

export default function App() {

  function handleSearch() {
    const name = document.querySelector('.input-search-bar').value;
    window.location.href = `http://localhost:3000/${name.replace(/\s/g, '-')}`;
  }

  return (
    <div className="input-search">
      <input 
        type="text" 
        className="input-search-bar"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
