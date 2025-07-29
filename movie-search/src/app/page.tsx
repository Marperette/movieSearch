"use client";

import fetchData, { movie } from "./fetchData";
import { useEffect, useState, useRef } from "react";
import Card from "./Card";
import "./styles.css"; 
import noContent from "../../public/no-content.png"

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [movies, setMovies] = useState<movie[]>([]);
  const [isFocus, setIsFocus] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try{
      const apiResult = await fetchData("");
      setMovies(apiResult);
      }
      catch (error: any){
        console.log(error)
      }
    };
    fetchMovies();
  }, []);

  function filterByMovieName(input: string) {
    return movies
      .filter((x) => x.name.toLowerCase().includes(input.toLowerCase()))
      .slice(0, 5);
  }

  let inputHandler = (e: { target: { value: string } }) => {
    setInputText(e.target.value.toLowerCase());
  };

  function results(input: string) {
    return movies.filter((x) =>
      x.name.toLowerCase().includes(input.toLowerCase())
    );
  }

  function durationFormat(duration: string) {
    let durationNum = parseInt(duration);
    let hours = Math.floor(durationNum / 3600);
    let minutes = (durationNum % 3600) / 60;
    return hours + "h" + minutes + "m";
  }

  return (
    <div className="main">
      <h1>Movie Search</h1>
      <div
        className="search-box"
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >
        <input
        id="search-input"
          value={inputText}
          onChange={inputHandler}
          onFocus={() => setIsFocus(true)}
          onBlur={() => {
            if (!isHovered) {
              setIsFocus(false);
            }
          }}
          ref={inputRef}
          //skiftar mellan stora och små bokstäver även när det kanske inte borde göra det. Sökandet ska vara lower, men texten i rutan bör vara som man skrivit in den.
        />
        <button>Submit</button>

        {isFocus && (
          <div className="select-container">
            {filterByMovieName(inputText).map((x) => (
              <div
                key={x.id}
                className="select"
                onClick={() => {
                  setInputText(x.name);
                  inputRef.current?.focus();
                  setIsHovered(false);
                }}
              >
                {x.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="centering">
        <div className="card-holder">
          {results(inputText).length ? results(inputText).map((x) => (
            <Card
            key={x.id}
              genres={x.genres}
              id={x.id}
              name={x.name}
              thumbnail={x.thumbnail}
              description={x.description}
              duration={durationFormat(x.duration)}
            />
          )) : <div className="no-results"><img src={noContent.src}></img><p>No movies found</p></div>
          }
        </div>
      </div>
    </div>
  );
}
