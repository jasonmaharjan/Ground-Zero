import { useEffect, useRef, useState } from "react";

const CANVAS_DEFAULT_WIDTH = 1100;
const CANVAS_DEFAULT_HEIGHT = 500;

// const C_MENU_WIDTH = 200;
// const C_MENU_HEIGHT = 400;

const STARTING_POSITION = { x: 0, y: 350 };
const PLAYER_WIDTH = 64;
const PLAYER_HEIGHT = 64;
const SPEED = 1;
const FF_SPEED = 4;
const SPRITE_SHEET_COLS = 4;
const MOVEMENT_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "W", "A", "S", "D"];
const TERRAIN_TYPES = { GRASS: "Grass", WATER: "Water", STONE: "Stone" };

const CanvasGame: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const playerSprite = useRef<HTMLImageElement | null>(null);
    const animationFrameId = useRef<number | null>(null);
    const keys = useRef<Record<string, boolean>>({});
    const bgImage = useRef<HTMLImageElement | null>(null);
    const stepSound = useRef<HTMLAudioElement | null>(null);
    const waterStepSound = useRef<HTMLAudioElement | null>(null);
    const collisionSound = useRef<HTMLAudioElement | null>(null);
    const [terrain, setTerrain] = useState(TERRAIN_TYPES.GRASS);

    const positionRef = useRef(STARTING_POSITION);
    const directionRef = useRef(0);

    const [frameIndex, setFrameIndex] = useState(0);
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
    const [isInCollision, setIsInCollision] = useState(false);

    // on initial load
    useEffect(() => {
        // load sound effects
        stepSound.current = new Audio("/footsteps_2.mp3");
        stepSound.current.loop = false; // Enable loop while moving
        stepSound.current.volume = 0.5; // Set footstep volume to 50%
        stepSound.current.playbackRate = 2;

        waterStepSound.current = new Audio("/water_footsteps.mp3");
        waterStepSound.current.loop = false; // Enable loop while moving
        waterStepSound.current.volume = 0.25; // Set footstep volume to 50%
        waterStepSound.current.playbackRate = 1.5;

        collisionSound.current = new Audio("/collision.mp3");
        collisionSound.current.loop = false; // Enable loop while colliding
        collisionSound.current.volume = 0.25; // Set collision volume to 50%
        collisionSound.current.playbackRate = 1.25;

        // load images
        const playerImg = new Image();
        playerImg.src = "/player.png";
        playerImg.onload = () => {
            playerSprite.current = playerImg;
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

            // Start water footsteps sound if not already playing (and terran is set as water)
            if (terrain === TERRAIN_TYPES.WATER && waterStepSound.current && MOVEMENT_KEYS.includes(event.key) && waterStepSound.current.paused) {
                waterStepSound.current.play().catch((err: Error) => console.error("Error playing footsteps sound:", err));
            }

            if (isInCollision && collisionSound.current && MOVEMENT_KEYS.includes(event.key) && collisionSound.current.paused) {
                collisionSound.current && collisionSound.current.play().catch((err: Error) => console.error("Error playing collision sound: ", err));
            }
        };
        const handleKeyUp = (event: KeyboardEvent) => {
            keys.current[event.key] = false;

            // Stop step sound when no movement keys are pressed
            if (stepSound.current && MOVEMENT_KEYS.includes(event.key) && !stepSound.current.paused) {
                stepSound.current.pause();
                stepSound.current.currentTime = 0;
            }

            if (isInCollision && collisionSound.current && MOVEMENT_KEYS.includes(event.key) && !collisionSound.current.paused) {
                collisionSound.current.pause();
                collisionSound.current.currentTime = 0;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [isInCollision, terrain]);

    const detectCollision = (x: number, y: number): boolean => {
        const isInCollision: boolean = x < 0 || x + PLAYER_WIDTH > CANVAS_DEFAULT_WIDTH || y < 0 || y + PLAYER_HEIGHT > CANVAS_DEFAULT_HEIGHT;
        setIsInCollision(isInCollision);
        return isInCollision;
    };

    useEffect(() => {
        if (positionRef.current && positionRef.current.y >= 308 && positionRef.current.y <= 340) {
            setTerrain(TERRAIN_TYPES.WATER);
        } else {
            setTerrain(TERRAIN_TYPES.GRASS);
        }
    }, [positionRef.current]);

    useEffect(() => {
        let frameCounter = 0;

        const updatePosition = () => {
            let isMoving = false;
            let { x, y } = positionRef.current;
            let moveSpeed = keys.current["Shift"] ? SPEED + FF_SPEED : SPEED;

            let newDirection = directionRef.current;

            if (keys.current["ArrowRight"]) {
                x += moveSpeed;
                newDirection = 2; // Right
                isMoving = true;
            }
            if (keys.current["ArrowLeft"]) {
                x -= moveSpeed;
                newDirection = 1; // Left
                isMoving = true;
            }
            if (keys.current["ArrowUp"]) {
                y -= moveSpeed;
                newDirection = 3; // Up
                isMoving = true;
            }
            if (keys.current["ArrowDown"]) {
                y += moveSpeed;
                newDirection = 0; // Down
                isMoving = true;
            }

            directionRef.current = newDirection;

            if (!detectCollision(x, y)) {
                positionRef.current = { x, y };
            }

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
                    directionRef.current * PLAYER_HEIGHT,
                    PLAYER_WIDTH,
                    PLAYER_HEIGHT,
                    positionRef.current.x,
                    positionRef.current.y,
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
    }, [positionRef.current, frameIndex, directionRef.current]);

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
