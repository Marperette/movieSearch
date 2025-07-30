import React from "react";
import movie from "../Interfaces/movie"


async function fetchData(search: string) {
  let movies = fetch(
    `https://movies-mock-api-677053851485.europe-north1.run.app/api/movies?q=${search}`
  )
    .then((res) => {
        if(res.ok) {
            
            return res.json();
        } else if(!res.ok) {
          if (res.status == 404){
            throw new Error(`Response status: ${res.status}, Page no found`, {cause: res.status});  
        }
        else if(res.status == 401){
            throw new Error(`Response status: ${res.status}, Unauthorized`, {cause: res.status});  
        }
        else if(res.status == 403){
            throw new Error(`Response status: ${res.status}, Forbidden`, {cause: res.status});  
        }
        else if(res.status == 429){
            throw new Error(`Response status: ${res.status}, Rate-limited`, {cause: res.status});  
        } else {
          throw new Error(`Response status: ${res.status}, Unknown error`, { cause: res.status });
        }
        }
    })
    .then((data): movie[] => {
      return data;
    });

  return movies;
}

export default fetchData;
