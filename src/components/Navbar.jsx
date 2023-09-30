import {HeartIcon as Heart} from "@heroicons/react/24/outline"
const Navbar = ({searchResult,query,setQuery }) => {
  return (
  <nav className="navbar">
    <div className="navbar__logo">LOGO 😍</div>

    <input type="text" className="text-field" value={query} onChange={e=>setQuery(e.target.value)} placeholder="search .." />
    <div className="navbar__result">Found {searchResult.length} characters </div>
    <button className="heart"><Heart className="icon"/> <span className="badge">4</span></button>
  </nav>
    )
}

export default Navbar