import { useState, useEffect, useRef } from "react";
import "./App.css";
import { MdOutlineMusicNote } from "react-icons/md";
import { MdOutlineMusicOff } from "react-icons/md";
import { FaShuffle } from "react-icons/fa6";
import Canvas from "./components/Canvas";
import backgroundMusic1 from "@/assets/sounds/music_1.mp3";
import backgroundMusic2 from "@/assets/sounds/music_2.mp3";
import backgroundMusic3 from "@/assets/sounds/music_3.mp3";
import ButtonWrapper from "./components/ButtonWrapper";

function App() {
    const bgMusic = useRef<HTMLAudioElement | null>(null);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    useEffect(() => {
        // load all background music
        bgMusic.current = new Audio(backgroundMusic1);
        bgMusic.current.loop = true; // Enable background music looping
        bgMusic.current.volume = 0.5; // Set bg volume to 80%
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

            const randomMusicIndex = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
            switch (randomMusicIndex) {
                case 0:
                    bgMusic.current = new Audio(backgroundMusic1);
                    bgMusic.current.loop = true; // Enable background music looping
                    bgMusic.current.volume = 0.5; // Set bg volume to 50%
                    bgMusic.current.play().catch(err => console.error("Background music error:", err));
                    return;
                case 1:
                    bgMusic.current = new Audio(backgroundMusic2);
                    bgMusic.current.loop = true; // Enable background music looping
                    bgMusic.current.volume = 0.5; // Set bg volume to 50%
                    bgMusic.current.play().catch(err => console.error("Background music error:", err));
                    return;
                case 2:
                    bgMusic.current = new Audio(backgroundMusic3);
                    bgMusic.current.loop = true; // Enable background music looping
                    bgMusic.current.volume = 0.5; // Set bg volume to 50%
                    bgMusic.current.play().catch(err => console.error("Background music error:", err));
                    return;
                default:
                    bgMusic.current = new Audio(backgroundMusic1);
                    bgMusic.current.loop = true; // Enable background music looping
                    bgMusic.current.volume = 0.5; // Set bg volume to 50%
                    bgMusic.current.play().catch(err => console.error("Background music error:", err));
                    return;
            }
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
                {bgMusic.current && <div>Playing Tune :-)</div>}
            </div>
            <Canvas />
        </div>
    );
}

export default App;
