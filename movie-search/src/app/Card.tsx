import { movie } from "./fetchData";
import "./styles.css";

//Ska få input från search för att visa datan
export default function Card(props: movie) {
  return (
    <div className="card">
      <h3>{props.name}</h3>
      <p>{props.description}</p>
      <p>{props.genres.join(", ")}</p>
      <p>{props.duration}</p>
    </div>
  );
}
