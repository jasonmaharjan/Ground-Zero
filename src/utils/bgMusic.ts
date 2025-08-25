import bgMusic1 from "@/assets/sounds/bg_music_1.mp3";
import bgMusic2 from "@/assets/sounds/bg_music_2.mp3";
import bgMusic3 from "@/assets/sounds/bg_music_3.mp3";
import bgMusic4 from "@/assets/sounds/bg_music_4.mp3";
import bgMusic5 from "@/assets/sounds/bg_music_5.mp3";
import bgMusic6 from "@/assets/sounds/bg_music_6.mp3";
import bgMusic7 from "@/assets/sounds/bg_music_7.mp3";
import bgMusic8 from "@/assets/sounds/bg_music_8.mp3";
import bgMusic9 from "@/assets/sounds/bg_music_9.mp3";
import bgMusic10 from "@/assets/sounds/bg_music_10.mp3";

const tracks = [
    { musicSrc: bgMusic1, message: "Go to Hill and Go Down, it creates such good luck, and you'll smell bad" },
    { musicSrc: bgMusic2, message: "Chase your dreams, do not chase your goals, much easier!" },
    { musicSrc: bgMusic3, message: "The marvelous thing about a joke with a double meaning is that it can only mean 1 thing." },
    { musicSrc: bgMusic4, message: "Look at this photograph, graph, gra, gr, gre?? When's the date? When are we doing it? ;-;" },
    {
        musicSrc: bgMusic5,
        message: "To look beyond the observable universe, Stand on the head of giants, not on their shoulders. You'll see even more.",
    },
    { musicSrc: bgMusic6, message: "Sike! That's the right number! It was the right number all along...Now call her, you dimwit..." },
    { musicSrc: bgMusic7, message: "My warframe is strong. You are not. JK. My warframe and you both are strong (not). It is a weak world." },
    {
        musicSrc: bgMusic8,
        message: "Time is short they said...so just...let your dreams be dreams. Felt good reading that? Ediot, go chase it now.",
    },
    { musicSrc: bgMusic9, message: "Watahh she waahh kitabb!?? Proceeds to hurl a book at you and yell 'Padhaaaa!'" },
    { musicSrc: bgMusic10, message: "Ah... Nostalgia.. The good ole days.. Now look at you, what even happened to you? Why did you grow up?" },
    { musicSrc: bgMusic1, message: "If you are here, stay here, its cozy and comfy :-)" },
];

export const randomizeRadio = () => {
    const randomIndex = Math.floor(Math.random() * 10) + 1;
    return tracks[randomIndex];
};
