import Image from "next/image";
import styles from "./page.module.css";
import FetchData from "./fetchData";
export default function Home() {
  return (
    <div>
      <h1>Movie Search</h1>
      <textarea></textarea>
      <button>Search</button>
      <div>
        <h2>Results:</h2>
        <FetchData/>
      </div>
    </div>
  );
}
