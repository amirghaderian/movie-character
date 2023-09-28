import { useState } from "react";
import { allCharacters } from "../data/data";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar from "./components/Navbar";

const App = () => {
  const [characters, setCharacter] = useState(allCharacters)
  return <div className="app"><Navbar searchResult={characters}/>
  <div className="main"><CharacterList allCharacters={characters}/><CharacterDetail/></div></div>;
};
export default App