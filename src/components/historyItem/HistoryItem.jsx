import React from "react";

function HistoryItem({ location, dateTime }) {
    return (
        <div className="flex items-center w-full p-2 rounded-2xl bg-customPurple h-[3.5rem]">
            <div className="flex-1 flex-col">
                <p className="general-text">{location}</p>
                <p className="small-text text-customGray">{dateTime}</p>
            </div>

            <div className="flex-1 bg-red-300"></div>
        </div>
    );
}

export default HistoryItem;
