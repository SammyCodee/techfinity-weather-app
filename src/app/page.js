"use client";
import './globals.css';
import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { SquareButton } from '@/components/button';
import useWindowWidth from "@/hooks/useWindowWidth";
import HistoryItem from '@/components/historyItem/HistoryItem';
import { getWeather } from '@/api/getWeather';
import WeatherInfo from '@/components/weatherInfo/WeatherInfo';

export default function Home() {
  const width = useWindowWidth();

  const [weatherData, setWeatherData] = useState({});
  const [date, setDate] = useState(null);
  const [historyList, setHistoryList] = useState([]);
  const [location, setLocation] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isMobile = width < 510; // You can adjust the breakpoint as needed

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

  let countryName, temperature, highest, lowest, humidity, isCloud;
  if(weatherData){
    countryName = weatherData?.name;
    temperature = weatherData?.main?.temp;
    highest = weatherData?.main?.temp_max;
    lowest = weatherData?.main?.temp_min;
    humidity = weatherData?.main?.humidity;
    isCloud = weatherData?.clouds?.all > 1 ? true : false
  }
    
  return (
    <div 
      className="flex min-h-screen justify-center p-4 gap-2 bg-cover bg-center min-w-[22rem] sm:font-[family-name:var(--font-geist-sans)]"
      style={{
        backgroundImage: "url('/image/bg-dark.png')"
      }}
    >
      <div className="flex flex-col w-full min-w-[21rem] max-w-[30rem]">
        
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
              className={`bg-primaryPurple border-0 placeholder-white custom-input ${notFound && `shake-animation`}`}
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
              rounded-3xl bg-secondaryPurple 
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
                  transform: 'translate(-50%, -50%)' // Center it based on its own dimensions
                }}
              />

              <WeatherInfo 
                isMobile={isMobile}
                temperature={temperature}
                highest={highest}
                lowest={lowest}
                countryName={countryName}
                isCloud={isCloud}
                date={date}
                humidity={humidity}
              />

              <div className="flex flex-col min-h-[8rem] p-4 gap-4 mt-2 w-full bg-tertiaryPurple rounded-3xl">
                  <p className="text-white general-text">
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
                      <h1 className='font-bold'>No Record</h1>
                    </div>
                    }
                  </div>
                  
              </div>

          </div>

          {/* <div className='min-h-[3rem] bg-red-400'>

</div> */}
      </div>
    </div>
  );
}
