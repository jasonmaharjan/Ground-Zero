import React from "react";
import "../styles/styles.css";

interface Props {
    message: string;
}
const Marquee: React.FC<Props> = ({ message }) => {
    return (
        <div className="marquee-container">
            <div className="marquee">{message}</div>
        </div>
    );
};

export default Marquee;
