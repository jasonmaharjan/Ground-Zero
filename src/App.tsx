import { useState, useEffect, useRef } from "react";
import "./App.css";
import { MdOutlineMusicNote } from "react-icons/md";
import { MdOutlineMusicOff } from "react-icons/md";
import { FaShuffle } from "react-icons/fa6";
import Canvas from "./components/Canvas";
import ButtonWrapper from "./components/ButtonWrapper";
import MarqueeText from "./components/MarqueeText";

import { randomizeRadio } from "./utils/bgMusic";

function App() {
    const bgMusic = useRef<HTMLAudioElement | null>(null);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        const { musicSrc, message } = randomizeRadio();
        bgMusic.current = new Audio(musicSrc);
        bgMusic.current.loop = true; // Enable background music looping
        bgMusic.current.volume = 0.5; // Set bg volume to 80%
        setMessage(message);
    }, []);

    const toggleMusic = () => {
        if (!bgMusic.current) {
            return;
        }

        if (isMusicPlaying) {
            bgMusic.current.pause();
        } else {
            bgMusic.current.play().catch(err => console.error("Background music error:", err));
        }

        setIsMusicPlaying(!isMusicPlaying);
    };

    const shuffleMusic = () => {
        if (!bgMusic.current) {
            return;
        }
        if (isMusicPlaying) {
            bgMusic.current.pause();
            bgMusic.current.currentTime = 0; // reset the current music

            const { musicSrc, message } = randomizeRadio();
            bgMusic.current = new Audio(musicSrc);
            bgMusic.current.loop = true; // Enable background music looping
            bgMusic.current.volume = 0.5; // Set bg volume to 50%
            bgMusic.current.play().catch(err => console.error("Background music error:", err));
            setMessage(message);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="menu-wrapper">
                {isMusicPlaying ? (
                    <ButtonWrapper>
                        <MdOutlineMusicNote onClick={toggleMusic} style={{ fill: "white" }} />
                    </ButtonWrapper>
                ) : (
                    <ButtonWrapper>
                        <MdOutlineMusicOff onClick={toggleMusic} style={{ fill: "white" }} />
                    </ButtonWrapper>
                )}
                <ButtonWrapper>
                    <FaShuffle onClick={shuffleMusic} style={{ fill: "white" }} />
                </ButtonWrapper>
                {isMusicPlaying && bgMusic.current && message && <MarqueeText message={message} />}
            </div>
            <Canvas />
        </div>
    );
}

export default App;
