"use client";

import React from "react";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { selectTheme } from "@/slices/themeSlice";

function SquareButton({ icon, handleOnClick }) {
    const theme = useSelector(selectTheme);
    return (
        <div>
            <Button
                icon={icon}
                onClick={handleOnClick}
                className={`${
                    theme === "dark"
                        ? `bg-primaryPurple custom-search-btn`
                        : `custom-search-btn-light`
                } border-0 `}
            />
        </div>
    );
}

export default SquareButton;
