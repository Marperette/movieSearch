import "./styles.css";

//Ska få input från search för att visa datan
export default function Card({title, description, duration}) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Genres</p>
      <p>{duration}</p>
    </div>
  );
}
