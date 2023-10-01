import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Favourites } from "./components/Navbar";

const App = () => {
  const [characters, setCharacter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null)
  const [favourites, setFavourites] = useState([])
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
const handleSelectedCaracter = (id) =>{
  setSelectedId(preveId => preveId===id ? null :id)
}
const handleAddFavourite = (character) =>{
  setFavourites([...favourites,character])
}
const isAddToFavourit = favourites.map(fav=>fav.id).includes(selectedId)
return (
    <div className="app">
      <Toaster />
      <Navbar searchResult={characters} query={query} setQuery={setQuery} numOfFavorites={favourites.length} />
      <div className="main">
        <CharacterList allCharacters={characters} isLoading={isLoading}  onSelectCharacter={handleSelectedCaracter} selectedId={selectedId}/>

        <CharacterDetail selectedId={selectedId} setSelectedId={setSelectedId} handleSelectedCaracter={handleSelectedCaracter} onAddFavourite={handleAddFavourite} isAddToFavourit={isAddToFavourit}/>
      </div>
    </div>
  );
};
export default App;
