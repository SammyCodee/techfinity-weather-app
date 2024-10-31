
const apiURL = process.env.NEXT_PUBLIC_API_URL;
const key = process.env.NEXT_PUBLIC_API_KEY;
const url = `${apiURL}/data/2.5/weather`

export const getWeather = async(location) => {
    try{
        const res = await fetch(`${url}?q=${location}&units=metric&appid=${key}`);
        
        if (!res.ok) {
            throw new Error(`Failed to fetch weather data: ${res.statusText}`);
        }

        const data = await res.json();
        return data;
    }catch (error){
        console.error("Error fetching weather data:", error);
        throw error;
    }
}