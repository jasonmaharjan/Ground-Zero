import { useEffect, useRef, useState } from "react";

const CANVAS_DEFAULT_WIDTH = 1100;
const CANVAS_DEFAULT_HEIGHT = 500;

const C_MENU_WIDTH = 200;
const C_MENU_HEIGHT = 400;

const STARTING_POSITION = { x: 0, y: 350 };
const PLAYER_WIDTH = 64;
const PLAYER_HEIGHT = 64;
const SPEED = 1;
const FF_SPEED = 4;
const SPRITE_SHEET_COLS = 4;
const MOVEMENT_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "W", "A", "S", "D"];

type Position = { x: number; y: number };

const CanvasGame: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const playerSprite = useRef<HTMLImageElement | null>(null);
    const animationFrameId = useRef<number | null>(null);
    const keys = useRef<Record<string, boolean>>({});
    const bgImage = useRef<HTMLImageElement | null>(null);
    const stepSound = useRef<HTMLAudioElement | null>(null);

    const [position, setPosition] = useState<Position>(STARTING_POSITION);
    const [direction, setDirection] = useState(0);
    const [frameIndex, setFrameIndex] = useState(0);

    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

    // on initial load
    useEffect(() => {
        stepSound.current = new Audio("/footsteps_2.mp3");
        stepSound.current.loop = false; // Enable loop while moving
        stepSound.current.volume = 0.5; // Set footstep volume to 50%

        const img = new Image();
        img.src = "/player.png";
        img.onload = () => {
            playerSprite.current = img;
        };

        const bgImg = new Image();
        bgImg.src = "/bg_3.png";
        bgImg.onload = () => {
            bgImage.current = bgImg;
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            keys.current[event.key] = true;

            if (event.key === "Enter") {
                setIsContextMenuOpen(prevVal => !prevVal);
            }

            // Start footsteps sound if not already playing
            if (stepSound.current && MOVEMENT_KEYS.includes(event.key) && stepSound.current.paused) {
                stepSound.current.play().catch((err: Error) => console.error("Error playing footsteps sound:", err));
            }
        };
        const handleKeyUp = (event: KeyboardEvent) => {
            keys.current[event.key] = false;

            // Stop sound when no movement keys are pressed
            if (stepSound.current && MOVEMENT_KEYS.includes(event.key) && Object.values(keys.current).every(val => !val)) {
                stepSound.current.pause();
                stepSound.current.currentTime = 0; // Reset to start
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    const detectCollision = (x: number, y: number): boolean => {
        return x < 0 || x + PLAYER_WIDTH > CANVAS_DEFAULT_WIDTH || y < 0 || y + PLAYER_HEIGHT > CANVAS_DEFAULT_HEIGHT;
    };

    useEffect(() => {
        let frameCounter = 0;

        const updatePosition = () => {
            let isMoving = false;
            setPosition(prev => {
                let { x, y } = prev;
                let moveSpeed = keys.current["Shift"] ? SPEED + FF_SPEED : SPEED;

                let newX = x;
                let newY = y;
                let newDirection = direction;

                if (keys.current["ArrowRight"]) {
                    newX += moveSpeed;
                    newDirection = 2; // Right
                    isMoving = true;
                }
                if (keys.current["ArrowLeft"]) {
                    newX -= moveSpeed;
                    newDirection = 1; // Left
                    isMoving = true;
                }
                if (keys.current["ArrowUp"]) {
                    newY -= moveSpeed;
                    newDirection = 3; // Up
                    isMoving = true;
                }
                if (keys.current["ArrowDown"]) {
                    newY += moveSpeed;
                    newDirection = 0; // Down
                    isMoving = true;
                }

                if (direction !== newDirection) {
                    setDirection(newDirection);
                }

                if (!detectCollision(newX, newY)) {
                    return { x: newX, y: newY };
                }

                return { x, y };
            });

            // Stop animation if not moving
            if (frameCounter % 25 === 0) {
                setFrameIndex(prev => (isMoving ? (prev + 1) % SPRITE_SHEET_COLS : 0));
            }
            frameCounter++;

            animationFrameId.current = requestAnimationFrame(updatePosition);
        };

        animationFrameId.current = requestAnimationFrame(updatePosition);
        return () => {
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const drawScene = () => {
            ctx.clearRect(0, 0, CANVAS_DEFAULT_WIDTH, CANVAS_DEFAULT_HEIGHT);

            if (bgImage.current) {
                ctx.drawImage(bgImage.current, 0, 0, CANVAS_DEFAULT_WIDTH, CANVAS_DEFAULT_HEIGHT);
            }
            if (playerSprite.current) {
                ctx.drawImage(
                    playerSprite.current,
                    frameIndex * PLAYER_WIDTH,
                    direction * PLAYER_HEIGHT,
                    PLAYER_WIDTH,
                    PLAYER_HEIGHT,
                    position.x,
                    position.y,
                    PLAYER_WIDTH,
                    PLAYER_HEIGHT
                );
            }

            // add items to the scene under certain key press
            if (isContextMenuOpen) {
                ctx.fillStyle = "rgba(163, 106, 210, 1)";
                ctx.fillRect(850, 50, 200, 200), (ctx.fillStyle = "white");

                ctx.strokeStyle = "rgb(192, 192, 19)";
                ctx.lineWidth = 3; // border thickness
                ctx.strokeRect(850, 50, 200, 200);

                ctx.font = "20px Sans-sherif";
                ctx.fillStyle = "yellow";
                ctx.fillText("Relax", 875, 50 + 40);
                ctx.fillText("Overthink", 875, 50 + 80);
                ctx.fillText("Contemplate", 875, 50 + 120);
                ctx.fillText("Exit", 875, 50 + 160);
            }

            requestAnimationFrame(drawScene);
        };

        drawScene();
    }, [position, frameIndex, direction]);

    return (
        <>
            <canvas
                ref={canvasRef}
                width={CANVAS_DEFAULT_WIDTH}
                height={CANVAS_DEFAULT_HEIGHT}
                style={{ border: "2.5px solid #c0c013", borderRadius: "1rem", boxShadow: "2px 4px 20px 2px #353238" }}
            />
        </>
    );
};

export default CanvasGame;
