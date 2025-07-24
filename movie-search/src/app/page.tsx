"use client";

import fetchData, { movie } from "./fetchData";
import { useEffect, useState } from "react";
import Card from "./Card";
import "./styles.css";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [movies, setMovies] = useState<movie[]>([]);
  const [isFocus, setIsFocus] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    const fetchMovies = async () => {
      const apiResult = await fetchData("");
      setMovies(apiResult);
    };
    fetchMovies();
  }, []);

  function filterByMovieName(input: string) {
    return movies
      .filter((x) => x.name.toLowerCase().includes(input.toLowerCase()))
      .slice(0, 5);
  }

  let inputHandler = (e: { target: { value: string } }) => {
    let lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
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
      <div className="search-box">
        <input
          value={inputText}
          onChange={inputHandler}
          onFocus={() => setIsFocus(true)}
          onBlur={() => {
            if (!isHovered) {
              setIsFocus(false);
            }
          }}
          //Poblem med att få bort listan vid blur
          //skiftar mellan stora och små bokstäver även när det kanske inte borde göra det. Sökandet ska vara lower, men texten i rutan bör vara som man skrivit in den.
        />
        {isFocus && (
          <div
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
            }}
          >
            {filterByMovieName(inputText).map((x) => (
              <div
                onClick={() => {
                  setInputText(x.name);
                }}
              >
                {x.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="card-holder">
        {results(inputText).map((x) => (
          <Card genres={x.genres} id={x.id} name={x.name} description={x.description} duration={durationFormat(x.duration)}       
          />
        ))}
      </div>
    </div>
  );
}

//Lösa Genres som är en string[]
