

import React from "react";

export interface movie {
    id: string;
    name: string;
    description: string;
    durataion: string;
    genres: string; //Egentligen en lista med strängar
}
//Lägga in någon form av error hantering
function fetchData(search:string){     
    let movies = fetch(`https://movies-mock-api-677053851485.europe-north1.run.app/api/movies?q=${search}`).then((res)=> {
        return res.json();
    }).then((data): movie[] => {
        return data;
    });

    return movies;
}

    //Är det fel att lägga in mer skaer här, borde jag låta den vara en ren fetch och att den bara retunerar movies som kan hämtas av en annan component.
    //Innebär detta att jag för varje sökning hämtar all data igen? Inte det mest optimala med stora mängder data, då är det bättre att ha det sparat i cache på något vis
export default fetchData;