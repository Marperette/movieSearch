'use client'

import React, { useEffect, useState } from "react";

interface movie {
    id: string;
    name: string;
    description: string;
}

const FetchData = (search:string) => {
       const [movies, setMovies] = useState([]);
       useEffect(()=> {
        console.log("entered effect")
        fetch(`https://movies-mock-api-677053851485.europe-north1.run.app/api/movies?q=${search.search}`).then((res)=> {
            return res.json();
        }).then((data) => {
            console.log(data);
            setMovies(data);
        });
       }, [search]);
       console.log(search);

       
        return (
            <div>
                {movies.map((movie : movie) => (<p>{movie.name}</p>))}
            </div>
           )
       
    }

    //Är det fel att lägga in mer skaer här, borde jag låta den vara en ren fetch och att den bara retunerar movies som kan hämtas av en annan component.
    //Innebär detta att jag för varje sökning hämtar all data igen? Inte det mest optimala med stora mängder data, då är det bättre att ha det sparat i cache på något vis
export default FetchData;