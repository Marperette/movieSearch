import { movie } from "./fetchData";
import "./styles.css";

//Ska få input från search för att visa datan
export default function Card(props: movie) {

  return (
    <div className="card" id={props.id}>
      <h3>{props.name}</h3>
      <p>{props.description}</p>
      <div className="genre-duration">
      <ul>{props.genres.map((x) => <li>{x}</li>)}</ul>
      <p>Duration: {props.duration}</p>
      </div>
    </div>
  );
}