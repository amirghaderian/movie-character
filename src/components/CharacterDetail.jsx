import { character, episodes } from "../../data/data";
import { ArrowUpCircleIcon as ArrowUp } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import toast from "react-hot-toast";

const CharacterDetail = ({ selectedId }) => {
  const [selectedcharacter, setSelecteCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {setIsLoading(true)
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        setSelecteCharacter(data);
      } catch (error) {
        setSelecteCharacter()
        toast.error(error.response.data.error)        
      } finally{setIsLoading(false)}
    };
    console.log(selectedcharacter)
    if (selectedcharacter ==="" )
      return (
        <div style={{ flex: 1, color: "white" }}>Please select a Character</div>
      );
    if (selectedId !== null) fetchData();
  }, [selectedId]);

  if(isLoading)return <div style={{ flex: 1, color: "white" }}><Loader/></div>
  if (!selectedId || !selectedcharacter)
    return (
      <div style={{ flex: 1, color: "white" }}>Please select a Character</div>
    );
  return (
    <div style={{ flex: 1 }}>
      <div className="character-detail">
        <img
          src={selectedcharacter.image}
          alt={selectedcharacter.name}
          className="character-detail__img"
        />
        <div className="character-detail__info">
          <h3 className="name">
            <span>{selectedcharacter.gender === "Male" ? "👨" : "👩"}</span>
            <span>&nbsp; {selectedcharacter.name}</span>
          </h3>
          <div className="info">
            <span
              className={`status ${
                selectedcharacter.status === "Dead" && "red"
              }`}
            ></span>
            <span>&nbsp; {selectedcharacter.status}</span>
            <span>&nbsp; {selectedcharacter.species}</span>
          </div>
          <div className="location">
            <p>Last known location:</p>
            <p>
              {selectedcharacter.location == null
                ? ""
                : selectedcharacter.location.name}
            </p>
          </div>{" "}
          <div className="actions">
            <button className="btn btn--primary">Add to Favorite</button>{" "}
          </div>
        </div>
      </div>

      <div className="character-episodes">
        <div className="title">
          <h2>List of Episodes:</h2>
          <button>
            <ArrowUp className="icon" />
          </button>
        </div>
        <ul>
          {episodes.map((item, index) => {
            return (
              <li key={item.id}>
                <div>
                  {String(index + 1).padStart(2, "0")}&nbsp;{item.episode} :{" "}
                  <strong>{item.name}</strong>
                </div>
                <div className="badge badge--secondary">{item.air_date}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CharacterDetail;
