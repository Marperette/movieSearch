"use client";

import Image from "next/image";
import styles from "./page.module.css";
import fetchData, { movie } from "./fetchData";
import { TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Card from "./Card";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [movies, setMovies] = useState<movie[]>([]);
  const [isFocus, setIsFocus] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef();
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

  return (
    <div>
      <h1>Movie Search</h1>
      <div className="search-box">
        <input
          value={inputText}
          onChange={inputHandler}
          onFocus={() => setIsFocus(true)}
          onBlur={() =>{if(!isHovered){setIsFocus(false)}} }
          ref={inputRef}
        />
        {isFocus && (<div onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={()=>{setIsHovered(false)}}>
          {filterByMovieName(inputText).map((x) => (
            <div onClick={() => {setInputText(x.name); inputRef.current.focus()}}>{x.name}</div>
          ))}</div>)}
      </div>
      <div>
        <h2>Results:</h2>

        <Card />
      </div>
    </div>
  );
}
