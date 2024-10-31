import React from "react";
import RoundButton from "../button/RoundButton";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";

function HistoryItem({ location, dateTime, isMobile }) {
    return (
        <div className="flex items-center w-full p-2 rounded-2xl bg-customPurple h-[3.5rem]">
            <div className="flex flex-1 flex-col">
                <p className="general-text">{location}</p>
                {isMobile && (
                    <p className="small-text text-customGray">{dateTime}</p>
                )}
            </div>

            <div className="flex flex-1 justify-end items-center gap-3">
                {!isMobile && (
                    <p className="small-text text-customGray">{dateTime}</p>
                )}
                <RoundButton
                    style={{ background: "transparent" }}
                    icon={<SearchOutlined />}
                    className={"text-customGray border-2 border-customGray"}
                />

                <RoundButton
                    style={{ background: "transparent" }}
                    icon={<DeleteOutlined />}
                    className={"text-customGray border-2 border-customGray"}
                />
            </div>
        </div>
    );
}

export default HistoryItem;
