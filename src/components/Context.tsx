import { useImperativeHandle, forwardRef, useRef } from "react";
import "../styles/styles.css";

interface ContextMenu {
    isOpen: boolean;
    toggleMenu: () => void;
    ref: any;
}

const CONTEXT_OPTIONS = ["Start", "Relax", "Overthink", "Exit"];

const ContextMenu: React.FC<ContextMenu> = forwardRef(({ isOpen, toggleMenu }, ref) => {
    const menuRef = useRef<HTMLDivElement>(null);

    // Expose focus method of Context Menu to parent
    useImperativeHandle(ref, () => ({
        focus: () => {
            if (menuRef.current) {
                menuRef.current.focus();
            }
        },
    }));

    // Prevent key events from bubbling to parent
    const handleKeyDown = (event: React.KeyboardEvent) => {
        event.stopPropagation(); // Stops event from reaching to the parent event listeners
        // handle these key stroke events within the context menu
        if (event.key === "Enter") {
            toggleMenu();
        }

        // TO DO: implement highlight and select of context menu items on arrow Up and Down
        if (event.key === "ArrowDown") {
            console.log("Arrow Down");
        }

        if (event.key === "ArrowUp") {
            console.log("Arrow Up");
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="context-menu" ref={menuRef} tabIndex={-1} role="menu" onKeyDown={handleKeyDown}>
            <ul style={{ listStyle: "none", fontSize: "2rem" }}>
                {CONTEXT_OPTIONS.map((option, key) => (
                    <li key={key}>{option}</li>
                ))}
            </ul>
        </div>
    );
});

export default ContextMenu;
