"use client"

import { useEffect, useState } from "react"

export default function Pogoda(){
    const[pogoda,setPogoda] = useState()
    useEffect(() => {
        const getData = async () => {
            const lat = "52.2297"
            const lon = "21.0122"
            const apikey = "e65af8258d16d86638df1251856fb3dc"
          try {
            const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`);
            const json = await data.json();
            setPogoda(json);
            console.log(json);
          } catch (error) {
            console.error(error);
          }
        };
        getData();
      }, []);
      return(
        <div>
            {pogoda && pogoda.map}
        </div>
      )
}