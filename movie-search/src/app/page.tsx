"use client";

import fetchData from "./Hooks/fetchData";
import movie from "./Interfaces/movie"
import { useEffect, useState, useRef } from "react";
import Card from "./Components/Card";
import "./styles.css";
import noContent from "../../public/no-content.png";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [movies, setMovies] = useState<movie[]>([]);
  const [isFocus, setIsFocus] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [searchResult, setSearchResult] = useState<movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiResult = await fetchData("");
        setMovies(apiResult);
        setSearchResult(apiResult);
      } catch (error: any) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchMovies();
  }, []);

  async function updateSearchResult(queryString: string) {
    const result = await fetchData(queryString);
    setSearchResult(result);
  }

  function filterByMovieName(input: string) {
    return movies
      .filter((x) => x.name.toLowerCase().includes(input.toLowerCase()))
      .slice(0, 5);
  }

  let inputHandler = (e: { target: { value: string } }) => {
    setInputText(e.target.value.toLowerCase());
  };

  function durationFormat(duration: string) {
    const durationNum = parseInt(duration);
    const hours = Math.floor(durationNum / 3600);
    const minutes = (durationNum % 3600) / 60;
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
        <div className="input-wrapper">
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
          onKeyDown={(e) => {
            if (e.key === "Enter") updateSearchResult(inputText);
          }}
        />
        

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
        )}</div>
        <button onClick={()=> updateSearchResult(inputText)}>Search</button>
      </div>
      <div className="centering">
        {isLoading ? (
          <div className="loading"><p>Loading...</p></div>
        ) : (
          <div className="card-holder">
            {searchResult.length ? (
              searchResult.map((x) => (
                <Card
                  key={x.id}
                  genres={x.genres}
                  id={x.id}
                  name={x.name}
                  thumbnail={x.thumbnail}
                  description={x.description}
                  duration={durationFormat(x.duration)}
                />
              ))
            ) : (
              <div className="no-results">
                <img src={noContent.src}></img>
                <p>No movie titles matches your search</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
