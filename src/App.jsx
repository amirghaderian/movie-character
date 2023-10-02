import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Modal from "./components/Modal";
import Navbar, { Favourites } from "./components/Navbar";

const App = () => {
  const [characters, setCharacter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favourites, setFavourites] = useState(()=> JSON.parse(localStorage.getItem("favourites")) || []);
  useEffect(()=>{
    localStorage.setItem("favourites",JSON.stringify(favourites))
  })

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`,
          { signal }
        );
        setCharacter(data.results.slice(0, 10));
        setIsLoading(false);
      } catch (err) {
        if (!axios.isCancel()) {
          toast.error(err.response.data.error);

          console.log(err.name);
          setCharacter([]);
          setIsLoading(false);
        }
      }
    };
   
    // if (query.length <= 2) {
    //   setCharacter([]);
    //   return;
    // }
    fetchData();
    return () => {
      controller.abort();
    };
  }, [query]);
  const handleSelectedCaracter = (id) => {
    setSelectedId((preveId) => (preveId === id ? null : id));
  };
  const handleAddFavourite = (character) => {
    setFavourites([...favourites, character]);
  };
  const handleDeleteFavourite = (id) =>{
    const filterd = favourites.filter((item)=>item.id !== id)
    setFavourites(filterd)
  }
  const isAddToFavourit = favourites.map((fav) => fav.id).includes(selectedId);
  return (
    <div className="app">
      <div style={{ color: "#fff" }}>
        <button
          style={{ color: "#fff" }}
          onClick={() => setCount((prev) => prev + 1)}
        >
          add 1
        </button>
      </div>
      <Toaster />
      <Navbar
        searchResult={characters}
        query={query}
        setQuery={setQuery}
        favourites={favourites}
        onDeleteFavourite={handleDeleteFavourite}
      />
      <div className="main">
        <CharacterList
          allCharacters={characters}
          isLoading={isLoading}
          onSelectCharacter={handleSelectedCaracter}
          selectedId={selectedId}
        />

        <CharacterDetail
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          handleSelectedCaracter={handleSelectedCaracter}
          onAddFavourite={handleAddFavourite}
          isAddToFavourit={isAddToFavourit}
        />
      </div>
    </div>
  );
};
export default App;
