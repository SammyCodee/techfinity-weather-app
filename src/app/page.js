"use client";
import './globals.css';
import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "antd";
import { dark_bg } from "../../public/image";
import { SearchOutlined } from "@ant-design/icons";
import SquareButton from "../components/button/squareButton";
import useWindowWidth from "@/hooks/useWindowWidth";
import HistoryItem from '@/components/historyItem/HistoryItem';
import { getWeather } from '@/api/getWeather';

const dummyData = [
  {
    location: 'Johor, MY',
    time: '01-09-2022 09:41am'
  },
  {
    location: 'Osaka, JP',
    time: '01-09-2022 09:41am'
  },
  {
    location: 'Seoul, KR',
    time: '01-09-2022 09:41am'
  }
];

export default function Home() {
  const width = useWindowWidth();

  const [weatherData, setWeatherData] = useState({});
  const [date, setDate] = useState(null);
  const [historyList, setHistoryList] = useState(dummyData);
  const [location, setLocation] = useState('');
  console.log("🚀 ~ Home ~ location:", location)

  const isMobile = width < 510; // You can adjust the breakpoint as needed

  const initData = (value) => {
    const getCurrentDateTime = (new Date).toLocaleString()
    if(value){
      getWeather(value).then(res => {
        setWeatherData(res);
        setDate(getCurrentDateTime);
      }).catch((err) => {
        console.error(err)
      })
    }
  }

  useEffect(() => {
    initData('spain');
  }, []);

  const handleInput = (e) => {
    setLocation(e.target.value);
  }

  const handleSearch = (value) => {
    const getCurrentDateTime = (new Date).toLocaleString();
    if(value){
      getWeather(value).then((res) => {
        setWeatherData(res);
        setDate(getCurrentDateTime);
      }).catch(err => {
        console.error(err);
      })
    }
  }

  let countryName, temperature, highest, lowest, humidity, isCloud;
  if(weatherData){
    countryName = weatherData?.name;
    temperature = weatherData?.main?.temp;
    highest = weatherData?.main?.temp_max;
    lowest = weatherData?.main?.temp_min;
    humidity = weatherData?.main?.humidity;
    isCloud = weatherData?.clouds?.all > 50 ? true : false
  }
    
  return (
    <div 
      className="flex min-h-screen justify-center p-4 gap-2 bg-cover bg-center min-w-[22rem] sm:font-[family-name:var(--font-geist-sans)]"
      style={{
        backgroundImage: "url('/image/bg-dark.png')"
      }}
    >
      <div className="flex flex-col w-full min-w-[21rem] max-w-[30rem]">
        
          <div className="flex gap-2 mb-16 max-h-8 w-full max-510:mb-24">
            <Input 
              placeholder="Country/City"
              style={{
                minWidth: '10rem',
              }}
              value={location}
              onChange={(e) => handleInput(e)}
              className="bg-primaryPurple border-0 placeholder-white custom-input"
            />
          
            <SquareButton 
              icon={<SearchOutlined style={{color: 'white'}}/>}
              handleOnClick={() => handleSearch(location)}
            />
          </div>

          <div className="flex flex-col w-full gap-2 p-6 items-center rounded-3xl bg-secondaryPurple relative">
              
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

              {isMobile ?
                <div className="grid grid-cols-2 min-h-[8rem] w-full px-2">
                  <div className="flex flex-col justify-start gap-1">
                      <p className="text-white general-text">
                        Today's Weather
                      </p>

                      <p className="text-white font-bold leading-none degree-text">
                        {`${temperature ? temperature : '0'}º`}
                      </p>
                   
                      <div className="flex gap-2 justify-start general-text">
                        <p>
                          { highest && `H: ${highest}º`}
                          { !highest && `H: N/A`}
                        </p>
                        <p>
                          { lowest && `H: ${lowest}º`}
                          { !lowest && `H: N/A`}
                        </p>
                      </div>

                      <p className="text-white font-bold general-text">
                        {countryName ? countryName : ''}
                      </p>
                  </div>
                  
                  <div 
                    className="flex flex-col items-end gap-1"
                    style={{ paddingTop: '3.75rem' }}
                  >
                    <p className="text-white general-text">
                      {isCloud ? 'Clouds' : 'No Clouds'}
                    </p>
                    <p className="text-white general-text">
                      {humidity && `Humidity: ${humidity}%`}
                      {!humidity && `Humidity: N/A`}
                    </p>
                    <p className="text-white general-text">
                      {date ? date : null}
                    </p>
                  </div>
              </div>
              :
              <div className="flex min-h-[8rem] w-full px-2">
                  <div className="flex flex-col justify-start gap-1">
                      <p className="text-white general-text">
                        Today's Weather
                      </p>

                      <p className="text-white font-bold leading-none degree-text">
                        {`${weatherData?.main?.temp}º`}
                      </p>
                   
                      <div className="flex gap-2 justify-start general-text">
                        <p>
                          { highest && `H: ${highest}º`}
                          { !highest && `H: N/A`}
                        </p>
                        <p>
                          { lowest && `H: ${lowest}º`}
                          { !lowest && `H: N/A`}
                        </p>
                      </div>

                      <div className='flex justify-evenly w-full gap-4'>
                        <p className="text-white font-bold general-text">
                          {countryName ? countryName : ''}
                        </p>

                        <p className="text-white general-text">
                          {date ? date : null}
                        </p>

                        <p className="text-white general-text">
                          {humidity && `Humidity: ${humidity}%`}
                          {!humidity && `Humidity: N/A`}
                        </p>

                        <p className="text-white general-text">
                          {isCloud ? 'Clouds' : 'No Clouds'}
                        </p>
                      </div>
                  </div>
              </div>
              }

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
                            />
                        </div>
                      )
                    })}

                    {historyList.length === 0 && <h1>No Record</h1>}
                  </div>
                  
              </div>
          </div>

      </div>
    </div>
  );
}
