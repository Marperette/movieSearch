'use client'

import React, { useEffect, useState } from "react";
import useFetch from "react-fetch-hook";


const FetchData = () => {
       const [movies, setMovies] = useState([]);
       useEffect(()=> {
        fetch('https://movies-mock-api-677053851485.europe-north1.run.app/api/movies').then((res)=> {
            return res.json();
        }).then((data) => {
            console.log(data);
            setMovies(data);
        });
       }, []);
       return (
        <div>
            {movies.map((movie) => (<p>{movie.name}</p>))}
        </div>
       )
    }
export default FetchData;