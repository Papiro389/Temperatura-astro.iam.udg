import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [weatherData2, setWeatherData2] = useState(null);
    const [weatherData3, setWeatherData3] = useState(null);
    const [weatherFecha, setWeatherFecha] = useState(null);
    const [weatherHora, setWeatherHora] = useState(null);


  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://astro.iam.udg.mx/Estacion/imagenes/downld02.txt');
        const text = await response.text();
        const lines = text.split('\n');
        const lastLine = lines[lines.length - 2];
        const words = lastLine.split(' ');
        
        setWeatherData(words.slice(4,6).join(' '));
        setWeatherData2(words.slice(6,9).join(' '));
        setWeatherData3(words.slice(10,12).join(' '));
        setWeatherFecha(words.slice(0,1).join(' '));
        setWeatherHora(words.slice(1,3).join(' '));

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    //se actualiza cada 10 seg
    fetchData();
    const intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const data = parseFloat(weatherData);
  //const data2 = parseFloat(weatherData2);
  let backgroundColor;
  let backgroundImage;
  let source;

clima = 26

  
  if (weatherData >= 35) {
    backgroundColor = '#ff9233';
    source = require('./assets/hot.png');
  }else if (weatherData >= 30) {
    backgroundColor = '#FFE280';
    source = require('./assets/warm.png');
  }else if (weatherData >= 20 && weatherData < 30) {
    backgroundColor = '#E1FFBD';
    source = require('./assets/perfect.png');
  }else if (weatherData >= 10 && weatherData < 20) {
    backgroundColor = '#6DD9BD';
    source = require('./assets/team_frio.png');
    backgroundImage = 'linear-gradient(to bottom, #43C6AC, #191654';
  }else if (weatherData <= 10  && weatherData){
    backgroundColor = '#3695C6';
    source = require('./assets/cold.png');
  }else{
    backgroundColor = 'lightgray';
    backgroundImage = 'linear-gradient(to bottom, lightgray, gray';
    source = require('./assets/duda.png');
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor, backgroundImage}}>
        <Text style={
          { fontSize: 62, 
          color: 'white', 
          textShadowColor: 'black',
          textShadowOffset: { width: 2, height: 1 },
          textShadowRadius: 2,}
        
        }>{weatherHora}.m.</Text>
        
      {data ? (
        <Text style={
          { fontSize: 38,
          color: 'white', 
          textShadowColor: 'black',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 2,}
        
        }>{weatherData}°</Text>
        
        //<Text style={{ fontSize: 32, color: 'gray' }}>{weatherData} ° {weatherData2} </Text>
      ) : (
        <Text style={{ fontSize: 32, color: 'white' }}>Cargando...</Text>
      )
      }
      <Image source={source} style={{ width: 370, height: 370 }} />
      
        <Text style={
          { fontSize: 22, 
          color: 'white', 
          textShadowColor: 'black',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 2,}
        
        }>max: {weatherData2}°</Text>
        <Text style={
          { fontSize: 22, 
          color: 'white', 
          textShadowColor: 'black',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 2,}
        
        }>min: {weatherData3}°{'\n'}</Text>
       <Text style={
          { fontSize: 32, 
          color: 'white', 
          textShadowColor: 'black',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 2,}
        
        }>{weatherFecha}</Text>
      
    </View>
  );
};

export default Weather;