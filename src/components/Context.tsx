import { useState, useEffect } from "react";
import "../styles/styles.css";

interface ContextMenu {
    isOpen: boolean;
}

const CONTEXT_OPTIONS = ["Start", "Relax", "Overthink", "Exit"];

const ContextMenu: React.FC<ContextMenu> = ({ isOpen }) => {
    if (!isOpen) {
        return null;
    }

    const onHover = () => {
        console.log("HOVERERD");
    };

    return (
        <div className="context-menu">
            <ul style={{ listStyle: "none", fontSize: "2rem" }}>
                {CONTEXT_OPTIONS.map((option, key) => (
                    <li key={key} onMouseEnter={onHover}>
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContextMenu;
