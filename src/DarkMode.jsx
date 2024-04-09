import React, { useState } from "react";
import   Sun  from "./Sun.svg";
import Moon from "./Moon.svg";
import "./DarkMode.css"; // CSS for styling dark mode

const DarkMode = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    return (
        <div className={`dark_mode ${darkMode ? 'dark' : ''}`}>
            <input
                className="dark_mode_input"
                type="checkbox"
                id="darkmode-toggle"
                checked={darkMode}
                onChange={toggleDarkMode}
            />
            <label className="dark_mode_label" htmlFor="darkmode-toggle">
                <Sun />
                <Moon />
            </label>
        </div>
    );
};

export default DarkMode;
