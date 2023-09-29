import { useEffect, useState } from "react";
import { allCharacters } from "../data/data";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";

const App = () => {
  const [characters, setCharacter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch("https://rickandmortyapi.com/api/character");
      const data = await res.json();
      setCharacter(data.results.slice(0, 2));
      console.log(data.results);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="app">
      <Navbar searchResult={characters} />
      <div className="main">
        <CharacterList allCharacters={characters} isLoading={isLoading}/>

        <CharacterDetail />
      </div>
    </div>
  );
};
export default App;
