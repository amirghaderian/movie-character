import { EyeIcon as Eye } from "@heroicons/react/24/outline";
import Loader from "./Loader";
const CharacterList = ({ allCharacters, isLoading }) => {
  return (
    <div className="characters-list">
      {isLoading ? (
        <Loader />
      ) : (
        allCharacters.map((item) => {
          return <Character key={item.id} item={item} />;
        })
      )}
    </div>
  );
};

export default CharacterList;

const Character = ({ item }) => {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <h3 className="name">
        <span>{item.gender === "Male" ? "👨" : "👩"}</span>
        <span>{item.name}</span>
      </h3>
      <div className="list-item__info info">
        <span className={`status ${item.status === "Dead" && "red"}`}></span>
        <span> {item.status} </span>
        <span>{item.species}</span>
      </div>
      <button className="icon red">
        <Eye />
      </button>
    </div>
  );
};
