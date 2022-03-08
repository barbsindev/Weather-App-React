import React, { useState } from "react";
import "../Weather/WeatherConversion.scss";

export default function WeatherConversion(props){
     const [unit, setUnit] = useState("celsius");
     function convertTofahrenheit(event){
event.preventDefault();
setUnit("fahrenheit");
     }
     function convertToCelsius(event){
         event.preventDefault();
         setUnit("celsius");
     }
     if(unit==="celsius"){
      
         return(
             <h1 className="temperature p-0 m-0">
        <span className="temperature__number">{Math.round(props.celsius)}</span>
        <span className="temperature__units">
          <a href="#" className="temperature__celsius " >
            °C |</a>
          <a href="#" className="temperature__farenheit" onClick = {convertTofahrenheit}>
            °F
          </a>
        </span>
      </h1>
 
         )
     }else{  
         let fahrenheit = (props.celsius * 9) / 5 + 32;
return (
             <h1 className="temperature">
        <span className="temperature__number">{Math.round(fahrenheit)}</span>
        <span className="temperature__units">
          <a href="#" className="temperature__celsius" onClick = {convertToCelsius}>°C|</a>
          <a href="#" className="temperature__farenheit">°F</a>
        </span>
      </h1>
     
);
     }
   
}