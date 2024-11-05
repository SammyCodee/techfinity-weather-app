import React from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "@/slices/themeSlice";

function WeatherInfo({
    isMobile,
    temperature,
    highest,
    lowest,
    countryName,
    countryCode,
    isCloud,
    date,
    humidity,
}) {
    const theme = useSelector(selectTheme);
    return (
        <>
            {isMobile ? (
                <div className="grid grid-cols-2 min-h-[8rem] w-full px-2">
                    <div className="flex flex-col justify-start gap-1">
                        <p
                            className={`${
                                theme === "dark" ? `color-white` : `color-black`
                            } general-text`}
                        >
                            Today's Weather
                        </p>

                        <p
                            className={`${
                                theme === "dark"
                                    ? `color-white`
                                    : `color-light-purple`
                            } font-bold leading-none degree-text`}
                        >
                            {`${temperature ? temperature : "N/A"}º`}
                        </p>

                        <div
                            className={`flex gap-2 justify-start general-text ${
                                theme === "dark" ? `color-white` : `color-black`
                            }`}
                        >
                            <p>
                                {highest && `H: ${highest}º`}
                                {!highest && `H: N/A`}
                            </p>
                            <p>
                                {lowest && `L: ${lowest}º`}
                                {!lowest && `L: N/A`}
                            </p>
                        </div>

                        <p
                            className={`font-bold general-text ${
                                theme === "dark" ? `color-white` : `color-grey`
                            }`}
                        >
                            {countryName && countryCode
                                ? `${countryName}, ${countryCode} `
                                : "Location: N/A"}
                        </p>
                    </div>

                    <div
                        className="flex flex-col items-end gap-1"
                        style={{ paddingTop: "3.75rem" }}
                    >
                        <p
                            className={`${
                                theme === "dark" ? `color-white` : `color-grey`
                            } general-text`}
                        >
                            {isCloud ? "Clouds" : "No Clouds Data"}
                        </p>
                        <p
                            className={`${
                                theme === "dark" ? `color-white` : `color-grey`
                            } general-text`}
                        >
                            {humidity && `Humidity: ${humidity}%`}
                            {!humidity && `Humidity: N/A`}
                        </p>
                        <p
                            className={`${
                                theme === "dark" ? `color-white` : `color-grey`
                            } general-text`}
                        >
                            {date ? date : "Date: N/A"}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex min-h-[8rem] w-full px-2">
                    <div className="flex flex-col justify-start gap-1 sm:w-full">
                        <p
                            className={`${
                                theme === "dark"
                                    ? `color-white`
                                    : `color-black font-semibold`
                            } general-text`}
                        >
                            Today's Weather
                        </p>

                        <p
                            className={`${
                                theme === "dark"
                                    ? `color-white`
                                    : `color-light-purple`
                            } font-bold leading-none degree-text`}
                        >
                            {`${temperature ? temperature : "N/A"}º`}
                        </p>

                        <div
                            className={`${
                                theme === "dark"
                                    ? `color-white`
                                    : `color-black font-semibold`
                            } flex gap-2 justify-start general-text`}
                        >
                            <p>
                                {highest && `H: ${highest}º`}
                                {!highest && `H: N/A`}
                            </p>
                            <p>
                                {lowest && `L: ${lowest}º`}
                                {!lowest && `L: N/A`}
                            </p>
                        </div>

                        <div className="flex justify-between items-center w-full gap-2">
                            <div>
                                <p
                                    className={`${
                                        theme === "dark"
                                            ? `color-white`
                                            : `color-grey`
                                    } font-bold general-text`}
                                >
                                    {countryName && countryCode
                                        ? `${countryName}, ${countryCode}`
                                        : "Location: N/A"}
                                </p>
                            </div>

                            <div>
                                <p
                                    className={`${
                                        theme === "dark"
                                            ? `color-white`
                                            : `color-grey`
                                    } general-text`}
                                >
                                    {date ? date : "Date: N/A"}
                                </p>
                            </div>

                            <div>
                                <p
                                    className={`${
                                        theme === "dark"
                                            ? `color-white`
                                            : `color-grey`
                                    }  general-text`}
                                >
                                    {humidity && `Humidity: ${humidity}%`}
                                    {!humidity && `Humidity: N/A`}
                                </p>
                            </div>

                            <div>
                                <p
                                    className={`${
                                        theme === "dark"
                                            ? `color-white`
                                            : `color-grey`
                                    } general-text`}
                                >
                                    {isCloud ? "Clouds" : "No Clouds Data"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default WeatherInfo;
