import {
  HeartIcon as Heart,
  TrashIcon as Trash,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Character } from "./CharacterList";
import Modal from "./Modal";
const Navbar = ({ searchResult, query, setQuery, favourites,onDeleteFavourite }) => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">LOGO 😍</div>
      <input
        type="text"
        className="text-field"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="search .."
      />
      <div className="navbar__result">
        Found {searchResult.length} characters{" "}
      </div>
      <Favourites favourites={favourites} onDeleteFavourite={onDeleteFavourite} />
    </nav>
  );
};

export default Navbar;

export const Favourites = ({ favourites,onDeleteFavourite }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal title="character list" open={isOpen} onOpen={setIsOpen}>
        {favourites.map((item) => (
          <Character item={item} key={item.id}>
            <button className="icon red" onClick={()=>onDeleteFavourite(item.id)}>
              <Trash  />
            </button>
          </Character>
        ))}
      </Modal>
      <button className="heart" onClick={() => setIsOpen((is) => !is)}>
        <Heart className="icon" />
        <span className="badge">{favourites.length}</span>
      </button>
    </>
  );
};
