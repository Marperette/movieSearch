import movie from "../Interfaces/movie"
import "./../styles.css";
import fallback from "../../../public/fallback.png"

export default function Card(props: movie) {
  return (
    <div className="card" key={props.id}>
      <h3>{props.name}</h3>
      <img
        className="thumbnail"
        src={props.thumbnail}
        alt={`Movie poster for ${props.name}`}
        onError={(e) => {
          e.currentTarget.src = fallback.src;
        }}
      ></img>
      <p>{props.description}</p>
      <div className="genre-duration">
        <ul>
          {props.genres.map((x) => (
            <li key={props.id+x}>{x}</li>
          ))}
        </ul>
        <p>Duration: {props.duration}</p>
      </div>
    </div>
  );
}
