import React from "react";
import { Button } from "antd";

function RoundButton({ icon, style, className }) {
    return (
        <Button
            shape="circle"
            icon={icon}
            style={{ ...style }}
            className={className}
        />
    );
}

export default RoundButton;
