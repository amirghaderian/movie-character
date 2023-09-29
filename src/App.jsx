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
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          "https://rickandmortyapi.com/api/charactera"
        );
        console.log(data);
        setCharacter(data.results.slice(0, 2));
      } catch (err) {
        console.log(err)
        toast.error(err.response.data.error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="app">
      <Toaster />
      <Navbar searchResult={characters} />
      <div className="main">
        <CharacterList allCharacters={characters} isLoading={isLoading} />

        <CharacterDetail />
      </div>
    </div>
  );
};
export default App;
