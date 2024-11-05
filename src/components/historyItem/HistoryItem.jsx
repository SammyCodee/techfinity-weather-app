import React from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "@/slices/themeSlice";
import { RoundButton } from "../button";
import {
    SearchOutlined,
    DeleteOutlined,
    DeleteFilled,
} from "@ant-design/icons";

function HistoryItem({
    location,
    dateTime,
    isMobile,
    handleSearch,
    id,
    handleDelete,
    fullList,
}) {
    const theme = useSelector(selectTheme);

    return (
        <div
            className={`flex items-center w-full py-2 px-4 rounded-2xl  h-[3.5rem] ${
                theme === "dark" ? `bg-customPurple` : `bg-lightTertiaryPurple`
            }`}
        >
            <div className="flex flex-1 flex-col sm:flex-1">
                <p
                    className={`${
                        theme === "dark"
                            ? `color-white`
                            : `color-black font-bold`
                    } general-text`}
                >
                    {location}
                </p>
                {isMobile && (
                    <p
                        className={`${
                            theme === "dark"
                                ? `text-customGray`
                                : `color-black font-bold`
                        } small-text font-semibold`}
                    >
                        {dateTime}
                    </p>
                )}
            </div>

            <div className="flex flex-1 justify-end items-center gap-2 sm:flex-2">
                {!isMobile && (
                    <p
                        className={`${
                            theme === "dark"
                                ? `text-customGray`
                                : `color-black font-bold`
                        } small-text font-semibold`}
                    >
                        {dateTime}
                    </p>
                )}
                <RoundButton
                    style={{
                        background: theme === "dark" ? "transparent" : "white",
                    }}
                    icon={<SearchOutlined />}
                    className={`text-customGray border-2 ${
                        theme === "dark" ? `border-customGray` : ``
                    } `}
                    handleOnClick={handleSearch}
                    value={location ?? location}
                />

                <RoundButton
                    style={{
                        background: theme === "dark" ? "transparent" : "white",
                    }}
                    icon={
                        theme === "dark" ? <DeleteOutlined /> : <DeleteFilled />
                    }
                    className={`text-customGray border-2 ${
                        theme === "dark" ? `border-customGray` : ``
                    } `}
                    handleOnClick={handleDelete}
                    value={id ?? id}
                    list={fullList ?? fullList}
                />
            </div>
        </div>
    );
}

export default HistoryItem;
