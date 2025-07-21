'use client'

import Image from "next/image";
import styles from "./page.module.css";
import FetchData from "./fetchData";
import { TextField } from "@mui/material";
import { useState } from "react";


export default function Home() {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e: { target: { value: string; }; }) => {
    let lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  }
  return (
    <div>
      <h1>Movie Search</h1>
      <TextField
      id="outlined-basic"
      variant="outlined"
      label="Search"
      onChange={inputHandler} />
      <div>
        <h2>Results:</h2>
        <FetchData search={inputText}/>
      </div>
    </div>
  );
}
