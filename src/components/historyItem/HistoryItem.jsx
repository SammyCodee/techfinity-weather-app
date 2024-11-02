import React from "react";
import RoundButton from "../button/RoundButton";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";

function HistoryItem({
    location,
    dateTime,
    isMobile,
    handleSearch,
    id,
    handleDelete,
    fullList,
}) {
    return (
        <div className="flex items-center w-full py-2 px-4 rounded-2xl bg-customPurple h-[3.5rem]">
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
                    handleOnClick={handleSearch}
                    value={location ?? location}
                />

                <RoundButton
                    style={{ background: "transparent" }}
                    icon={<DeleteOutlined />}
                    className={"text-customGray border-2 border-customGray"}
                    handleOnClick={handleDelete}
                    value={id ?? id}
                    list={fullList ?? fullList}
                />
            </div>
        </div>
    );
}

export default HistoryItem;
