"use client";

import Image from "next/image";
import styles from "./page.module.css";
import fetchData, { movie } from "./fetchData";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Card from "./Card";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [movies, setMovies] = useState<movie[]>([]);
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
      <input value={inputText} onChange={inputHandler} />
      <div>
        <h2>Results:</h2>
        {filterByMovieName(inputText).map((x) => (
          <div>{x.name}</div>
        ))}
        <Card />
      </div>
    </div>
  );
}
