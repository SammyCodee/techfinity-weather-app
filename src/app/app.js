"use client";
import React from 'react';
import './globals.css';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { selectTheme } from '@/slices/themeSlice';
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { SquareButton } from '@/components/button';
import useWindowWidth from "@/hooks/useWindowWidth";
import HistoryItem from '@/components/historyItem/HistoryItem';
import { getWeather } from '@/api/getWeather';
import WeatherInfo from '@/components/weatherInfo/WeatherInfo';
import ThemeSwitcher from '@/components/themeSwitcher/ThemeSwitcher';

export default function App() {
  const width = useWindowWidth();

  const theme = useSelector(selectTheme);

  const [weatherData, setWeatherData] = useState({});
  const [date, setDate] = useState(null);
  const [historyList, setHistoryList] = useState([]);
  const [location, setLocation] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  /** You can adjust the breakpoint as needed, need to adjust the screens under tailwind.config.js */ 
  const isMobile = width < 510; 

  const initData = (value) => {
    const getCurrentDateTime = (new Date).toLocaleString();
    if(value){
      getWeather(value).then(res => {
        setWeatherData(res);
        setDate(getCurrentDateTime);
      }).catch((err) => {
        console.error(err);
      })
    } else {
      setNotFound(true);
      setErrorMessage("Something went wrong");
    }
  }

  useEffect(() => {
    /**
     * Default is Spain
     */
    initData('spain');
  }, []);

  const handleInput = (e) => {
    setLocation(e.target.value);
  }

  const handleSearch = (value) => {
    const getCurrentDateTime = (new Date).toLocaleString();
    /**
     * setNotFound here to control the input shaking effects of no result
     */
    setNotFound(false);
    if(value){
      getWeather(value).then((res) => {
        setWeatherData(res);
        setDate(getCurrentDateTime);
        pushToHistoryList(res, getCurrentDateTime);
        setNotFound(false);
      }).catch(err => {
        setNotFound(true);
        setErrorMessage("Location Not Found");
        console.error(err);
      })
    }
    if (value == "") {
      setNotFound(true);
      setErrorMessage("Please Enter City/Country");
    }
  }

  const pushToHistoryList = (res, dateTime) => {
    let obj = {};
    obj["location"] = res.name;
    obj["time"] = dateTime;
    const newHistoryList = [...historyList];
    newHistoryList.unshift(obj);
    setHistoryList(newHistoryList);
  }

  const deleteFromHistoryList = (index, list) => {
    if(list.length > -1){
      list.splice(index, 1);
      const newHistoryList = [...list];
      setHistoryList(newHistoryList);
    }
  }

  let countryName, countryCode, temperature, highest, lowest, humidity, isCloud;
  if(weatherData){
    countryName = weatherData?.name;
    countryCode = weatherData?.sys?.country;
    temperature = weatherData?.main?.temp;
    highest = weatherData?.main?.temp_max;
    lowest = weatherData?.main?.temp_min;
    humidity = weatherData?.main?.humidity;
    isCloud = weatherData?.clouds?.all > 1 ? true : false
  }
    
  return (
    <div 
      className="flex min-h-screen justify-center p-4 gap-2 bg-cover bg-center min-w-[24rem] overflow-x-hidden sm:font-[family-name:var(--font-geist-sans)]"
      style={{
        backgroundImage: `${theme === 'dark' ? `url('/image/bg-dark.png')` : `url('/image/bg-light.png')`}`
      }}
    >
      <div className="flex flex-col w-full min-h-screen min-w-[23rem] max-w-[30rem]">
        
          <div className={`
              flex gap-2 
              ${(notFound && errorMessage) ? `mb-2` : `mb-24`}
              max-h-8 
              w-full 
              max-510:${(notFound && errorMessage) ? `mb-2` : `mb-24`}`
              }
          >
            <Input 
              placeholder="Country/City"
              style={{
                minWidth: '10rem',
              }}
              value={location}
              onChange={(e) => handleInput(e)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleSearch(location);
                }
              }}
              className={`${theme === 'dark' ? 
                `bg-primaryPurple placeholder-white custom-input`
                : `bg-lightPrimaryPurple placeholder-black custom-input-light`} 
                border-0  
                ${notFound && `shake-animation`}`
              }
            />
          
            <SquareButton 
              icon={<SearchOutlined style={{color: 'white'}}/>}
              handleOnClick={() => handleSearch(location)}
            />
          </div>

          {notFound && (
                    <div className="min-h-[2rem] flex justify-center">
                        <p>{errorMessage}</p>
                    </div>
                )}
          {notFound && <div className='min-h-[4rem] mb-22'/>}

          <div 
          id='infoContainer'
          className={`
              flex flex-col w-full 
              gap-2 p-6 items-center 
              rounded-3xl 
              ${theme === 'dark' ? `bg-secondaryPurple`: `bg-lightPrimaryPurple`} 
              relative
            `}>
              
              <div 
                className={`absolute min-h-[5rem] min-w-[5rem] 
                            h-[8rem] bg-cover 
                            cloud-size-small-view 
                            ${isMobile ? `w-[7.5rem]` : `w-[8rem]`} 
                            sm:w-[12rem] sm:h-[12rem]`
                          }
                style={{
                  backgroundImage: "url('/image/sun.png')",
                  /* Center it based on its own dimensions by shifting it back by half its width and height. */ 
                  transform: 'translate(-50%, -50%)' 
                }}
              />

              <WeatherInfo 
                isMobile={isMobile}
                temperature={temperature}
                highest={highest}
                lowest={lowest}
                countryName={countryName}
                countryCode={countryCode}
                isCloud={isCloud}
                date={date}
                humidity={humidity}
              />

              <div className={`flex flex-col min-h-[8rem] p-4 gap-4 mt-1 w-full  rounded-3xl ${
                                theme === "dark"
                                    ? `bg-tertiaryPurple`
                                    : `bg-lightSecondaryPurple`
                            }`}>
                  <p className={`${
                                theme === "dark"
                                    ? `color-white`
                                    : `color-black font-semibold`
                            } general-text`}>
                    Search History
                  </p>

                  <div className='flex flex-col w-full gap-4'>
                    {historyList && historyList.length > 0 && historyList.map((data, index) => {
                      return(
                        <div key={`${data.location}-${index}`}>
                            <HistoryItem 
                              location={data.location}
                              dateTime={data.time}
                              isMobile={isMobile}
                              handleSearch={handleSearch}
                              id={index}
                              handleDelete={deleteFromHistoryList}
                              fullList={historyList}
                            />
                        </div>
                      )
                    })}

                    {historyList.length === 0 && 
                    <div className='flex justify-center items-center'>
                      <h1 className={`${
                                theme === "dark"
                                    ? `color-white`
                                    : `color-black`
                            } font-bold`}>No Record</h1>
                    </div>
                    }
                  </div>
                  
              </div>

          </div>

          <div 
        className="flex self-end mt-8 min-h-[6rem] min-w-[2.5rem] rounded-2xl"
      >
        <ThemeSwitcher/>
      </div>

      </div>

      
    </div>
  );
}
