import { movie } from "./fetchData";
import "./styles.css";
import fallback from "../../public/fallback.png";

//Ska få input från search för att visa datan
export default function Card(props: movie) {
    function validThumbnail (imgSrc:string) {

    }
  return (
    <div className="card" id={props.id}>
      <h3>{props.name}</h3>
      <img className="thumbnail" src={props.thumbnail} alt={`Movie poster for ${props.name}`} onError={(e) => {e.currentTarget.src = fallback.src}}></img>
      <p>{props.description}</p>
      <div className="genre-duration">
      <ul>{props.genres.map((x) => <li>{x}</li>)}</ul>
      <p>Duration: {props.duration}</p>
      </div>
    </div>
  );
}