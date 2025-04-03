import { useState, useEffect, useRef } from "react";
import "./App.css";
import { MdOutlineMusicNote } from "react-icons/md";
import { MdOutlineMusicOff } from "react-icons/md";
import Canvas from "./components/Canvas";

function App() {
    const bgMusic = useRef<HTMLAudioElement | null>(null);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    useEffect(() => {
        bgMusic.current = new Audio("/music.mp3");
        bgMusic.current.loop = true; // Enable background music looping
        bgMusic.current.volume = 0.5; // Set bg volume to 80%
    }, []);

    const toggleMusic = () => {
        if (!bgMusic.current) return;

        if (isMusicPlaying) {
            bgMusic.current.pause();
        } else {
            bgMusic.current.play().catch(err => console.error("Background music error:", err));
        }

        setIsMusicPlaying(!isMusicPlaying);
    };
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
                {isMusicPlaying ? (
                    <MdOutlineMusicNote onClick={toggleMusic} style={{ cursor: "pointer", fontSize: "3rem", fill: "purple" }} />
                ) : (
                    <MdOutlineMusicOff onClick={toggleMusic} style={{ cursor: "pointer", fontSize: "3rem", fill: "purple" }} />
                )}
            </div>
            <Canvas />
        </div>
    );
}

export default App;
