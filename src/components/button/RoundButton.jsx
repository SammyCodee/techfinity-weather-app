import React from "react";
import { Button } from "antd";

function RoundButton({ icon, style, className, handleOnClick, value, list }) {
    return (
        <Button
            shape="circle"
            icon={icon}
            style={{ ...style }}
            className={className}
            onClick={() => handleOnClick(value, list)}
        />
    );
}

export default RoundButton;
