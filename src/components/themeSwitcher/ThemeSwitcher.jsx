import React from "react";
import { Switch } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, selectTheme } from "@/slices/themeSlice";

const ThemeSwitcher = () => {
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);

    const handleChange = () => {
        dispatch(toggleTheme());
    };

    return (
        <Switch
            checked={theme === "dark"}
            onChange={handleChange}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
        />
    );
};

export default ThemeSwitcher;
