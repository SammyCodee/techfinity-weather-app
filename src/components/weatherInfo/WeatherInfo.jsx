import React from "react";

function WeatherInfo({
    isMobile,
    temperature,
    highest,
    lowest,
    countryName,
    isCloud,
    date,
    humidity,
}) {
    return (
        <>
            {isMobile ? (
                <div className="grid grid-cols-2 min-h-[8rem] w-full px-2">
                    <div className="flex flex-col justify-start gap-1">
                        <p className="text-white general-text">
                            Today's Weather
                        </p>

                        <p className="text-white font-bold leading-none degree-text">
                            {`${temperature ? temperature : "N/A"}º`}
                        </p>

                        <div className="flex gap-2 justify-start general-text">
                            <p>
                                {highest && `H: ${highest}º`}
                                {!highest && `H: N/A`}
                            </p>
                            <p>
                                {lowest && `L: ${lowest}º`}
                                {!lowest && `L: N/A`}
                            </p>
                        </div>

                        <p className="text-white font-bold general-text">
                            {countryName ? countryName : "Location: N/A"}
                        </p>
                    </div>

                    <div
                        className="flex flex-col items-end gap-1"
                        style={{ paddingTop: "3.75rem" }}
                    >
                        <p className="text-white general-text">
                            {isCloud ? "Clouds" : "No Clouds Data"}
                        </p>
                        <p className="text-white general-text">
                            {humidity && `Humidity: ${humidity}%`}
                            {!humidity && `Humidity: N/A`}
                        </p>
                        <p className="text-white general-text">
                            {date ? date : "Date: N/A"}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex min-h-[8rem] w-full px-2">
                    <div className="flex flex-col justify-start gap-1">
                        <p className="text-white general-text">
                            Today's Weather
                        </p>

                        <p className="text-white font-bold leading-none degree-text">
                            {`${temperature ? temperature : "N/A"}º`}
                        </p>

                        <div className="flex gap-2 justify-start general-text">
                            <p>
                                {highest && `H: ${highest}º`}
                                {!highest && `H: N/A`}
                            </p>
                            <p>
                                {lowest && `L: ${lowest}º`}
                                {!lowest && `L: N/A`}
                            </p>
                        </div>

                        <div className="flex justify-evenly w-full gap-4">
                            <p className="text-white font-bold general-text">
                                {countryName ? countryName : "Location: N/A"}
                            </p>

                            <p className="text-white general-text">
                                {date ? date : "Date: N/A"}
                            </p>

                            <p className="text-white general-text">
                                {humidity && `Humidity: ${humidity}%`}
                                {!humidity && `Humidity: N/A`}
                            </p>

                            <p className="text-white general-text">
                                {isCloud ? "Clouds" : "No Clouds Data"}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default WeatherInfo;
