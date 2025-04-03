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

export const randomizeRadio = () => {
    const randomIndex = Math.floor(Math.random() * 10) + 1;
    switch (randomIndex) {
        case 0:
            return { musicSrc: bgMusic1, message: "Go to Hill and Go Down, it's good luck :-)" };
        case 1:
            return { musicSrc: bgMusic2, message: "Chase your dreams, do not chase your goals!" };
        case 2:
            return { musicSrc: bgMusic3, message: "The marvelous thing about a joke with a double meaning is that it can only mean 1 thing." };
        case 3:
            return { musicSrc: bgMusic4, message: "Look at this photograph, graph, gra, gr, gre?? When's the date ;-;" };
        case 4:
            return { musicSrc: bgMusic5, message: "To look beyond the observable universe, Stand on the head of giants, not on their shoulders" };
        case 5:
            return { musicSrc: bgMusic6, message: "Sike! That's the right number! It was all along...Now go call her, you dimwit..." };
        case 6:
            return { musicSrc: bgMusic7, message: "My warframe is strong. You are not. JK. My warframe and you both are strong (not)" };
        case 7:
            return { musicSrc: bgMusic8, message: "Ohnoo Time is short...so just...let your dreams be dreams. Ez :-)" };
        case 8:
            return { musicSrc: bgMusic9, message: "Watahh she waahh kitabb!?? Proceeds to hurl a book at you" };
        case 9:
            return { musicSrc: bgMusic10, message: "Ah... Nostalgia.. The good ole days.. Now look at you, what even happened to you? Why did you grow up?" };
        default:
            return { musicSrc: bgMusic1, message: "Go to Hill and Go Down, it's good luck :-)" };
    }
};
