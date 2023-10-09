import { useRef } from 'react';
import Header from "./Header.jsx";

export default function App() {
  const inputRef = useRef();

  function handleSearch() {
    const name = inputRef.current.value;
    window.location.href = `http://localhost:3000/${name.replace(/\s/g, '-')}`;
  }

  return (
    <Header inputRef={inputRef} onSearch={handleSearch} />
  )
}