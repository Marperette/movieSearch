import React from "react";

export interface movie {
  id: string;
  name: string;
  description: string;
  duration: string;
  genres: string[];
  thumbnail: string;
}
//Lägga in någon form av error hantering
function fetchData(search: string) {
  let movies = fetch(
    `https://movies-mock-api-677053851485.europe-north1.run.app/api/movies?q=${search}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data): movie[] => {
      return data;
    });

  return movies;
}

export default fetchData;
