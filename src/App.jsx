import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar from "./components/Navbar";

const App = () => {
  const [characters, setCharacter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`
        );
        setCharacter(data.results.slice(0, 10));
        setIsLoading(false);
      } catch (err) {
        toast.error(err.response.data.error);
        setCharacter([]);
        setIsLoading(false);
      }
    };
    if (query.length <= 2) {
      setCharacter([]);
      return;
    }
    fetchData();
  }, [query]);

  useEffect(() => {
    console.log("Call EFFECT ON FIRST MOUNT");
  }, []);
  useEffect(() => {
    console.log("Call EFFECT ON EVERY RENDERS");
  });
  return (
    <div className="app">
      <Toaster />
      <Navbar searchResult={characters} query={query} setQuery={setQuery} />
      <div className="main">
        <CharacterList allCharacters={characters} isLoading={isLoading} />

        <CharacterDetail />
      </div>
    </div>
  );
};
export default App;
