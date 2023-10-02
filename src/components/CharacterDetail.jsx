import { ArrowUpCircleIcon as ArrowUp } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import toast from "react-hot-toast";

const CharacterDetail = ({ selectedId, onAddFavourite, isAddToFavourit }) => {
  const [selectedcharacter, setSelecteCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        setSelecteCharacter(data);

        const episodesId = data.episode.map((e) => e.split("/").at(-1));
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        setEpisodes([episodeData].flat().slice(0, 6));
      } catch (error) {
        setSelecteCharacter();
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    };
    if (selectedcharacter === "")
      return (
        <div style={{ flex: 1, color: "white" }}>Please select a Character</div>
      );
    if (selectedId !== null) fetchData();
  }, [selectedId]);

  if (isLoading)
    return (
      <div style={{ flex: 1, color: "white" }}>
        <Loader />
      </div>
    );
  if (!selectedId || !selectedcharacter)
    return (
      <div style={{ flex: 1, color: "white" }}>Please select a Character</div>
    );
  return (
    <div style={{ flex: 1 }}>
      <CharacterSubInfo
        selectedcharacter={selectedcharacter}
        isAddToFavourit={isAddToFavourit}
        onAddFavourite={onAddFavourite}
      />
      <EpisodeList episodes={episodes}/>
    </div>
  );
};

export default CharacterDetail;

const CharacterSubInfo = ({ selectedcharacter, isAddToFavourit ,onAddFavourite }) => {
  return (
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
            className={`status ${selectedcharacter.status === "Dead" && "red"}`}
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
        </div>
        <div className="actions">
          {isAddToFavourit ? (
            <p>Already Added To Favourites ✅</p>
          ) : (
            <button
              className="btn btn--primary"
              onClick={() => onAddFavourite(selectedcharacter)}
            >
              Add to Favorite
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const EpisodeList = ({episodes}) => {
  const [sortBy, setSortBy] = useState(true)
  let sortedEpisodes;
  if(sortBy){
    sortedEpisodes=[...episodes].sort((a,b)=>new Date(a.created)- new Date(b.created))

  } else{
    sortedEpisodes=[...episodes].sort((a,b)=> new Date(b.created)-new Date(a.created))
  }
  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List of Episodes:</h2>
        <button onClick={()=>{setSortBy(is => !is)}}>
          <ArrowUp className="icon"  style={{rotate:sortBy ?"0deg" :"180deg"}}/>
        </button>
      </div>
      <ul>
        {sortedEpisodes.map((item, index) => {
          return (
            <li key={item.id}>
              <div>
                {String(index + 1).padStart(2, "0")}&nbsp;{item.episode} :
                <strong>{item.name}</strong>
              </div>
              <div className="badge badge--secondary">{item.air_date}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
