import { allCharacters } from "../data/data";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar from "./components/Navbar";

const App = () => {
  return <div className="app"><Navbar />
  <div className="main"><CharacterList allCharacters={allCharacters}/><CharacterDetail/></div></div>;
};
export default App