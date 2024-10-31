"use client";

import React from "react";
import { Button } from "antd";

function SquareButton({ icon, handleOnClick }) {
    return (
        <div>
            <Button
                icon={icon}
                onClick={handleOnClick}
                className="bg-primaryPurple border-0 custom-search-btn"
            />
        </div>
    );
}

export default SquareButton;
