"use client"

import { useEffect, useState } from "react"

export default function Pogoda(){
    const [pogoda, setPogoda] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const lat = "52.2297"; 
            const lon = "21.0122";
            const apikey = "e65af8258d16d86638df1251856fb3dc";
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`);
                const data = await response.json();
                setPogoda(data.list); 
            } catch (error) {
                console.error(error);
            }
        };
        getData();
    }, []);

    return (
        <div style={{ textAlign: "center" }}>
            {pogoda.length > 0 ? (
                <>
                    <div style={{ margin: "20px auto", padding: "20px", width: "50%", fontSize: "1.2em", border: "1px solid #ccc" }}>
                        <h2>Today's Weather</h2>
                        <h3>{new Date(pogoda[0].dt_txt).toLocaleDateString()}</h3>
                        <p>Temperature: {pogoda[0].main.temp}°C</p>
                        <p>Weather: {pogoda[0].weather[0].description}</p>
                        <p>Wind speed: {pogoda[0].wind.speed} m/s</p>
                    </div>

                    
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        {pogoda.slice(1, 6).map((forecast, index) => (
                            <div key={index} style={{ margin: "10px", padding: "10px", width: "18%", border: "1px solid #ccc" }}>
                                <h3>{new Date(forecast.dt_txt).toLocaleDateString()}</h3>
                                <p>Temperature: {forecast.main.temp}°C</p>
                                <p>Weather: {forecast.weather[0].description}</p>
                                <p>Wind speed: {forecast.wind.speed} m/s</p>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
