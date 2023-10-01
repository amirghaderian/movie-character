import { HeartIcon as Heart } from "@heroicons/react/24/outline";
const Navbar = ({ searchResult, query, setQuery,numOfFavorites }) => {
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
      <Favourites numOfFavorites={numOfFavorites} />
    </nav>
  );
};

export default Navbar;

export const Favourites = ({numOfFavorites}) => {
  return (
    <button className="heart">
      <Heart className="icon" />
      <span className="badge">{numOfFavorites}</span>
    </button>
  );
};
