import { useState } from "react";
import "../CSS/Release.css";

import nightImg from "../assets/imageMusic/night.jpg";
import lightImg from "../assets/imageMusic/ligth.jpg";
import nightLightImg from "../assets/imageMusic/nightLight.jpg";
import tempusImg from "../assets/imageMusic/tempusImg.jpg";
import homeNightImg from "../assets/imageMusic/homeNight.jpg";
import warmWinterImg from "../assets/imageMusic/warmWinter.jpg";
import wayfarerImg from "../assets/imageMusic/wayfarer.jpg";
import nightCoffeImg from "../assets/imageMusic/nightCoffe.jpg";


function Release() {
    const [songs] = useState([
        {
            id: 1,
            title: "Night",
            image: nightImg,
            link: "https://social.tunecore.com/linkShare?linkid=GA6i9wxuXTjXwRTKxaR9_A"
        },
        {
            id: 2,
            title: "Light",
            image: lightImg,
            link: "https://social.tunecore.com/linkShare?linkid=B1eAd2h9nbgGnfNU_SauQA"
        },
        {
            id: 3,
            title: "Night Light",
            image: nightLightImg,
            link: "https://social.tunecore.com/linkShare?linkid=nVykxYjeotVIwwNuGaFLmg"
        },
        {
            id: 4,
            title: "Tempus",
            image: tempusImg,
            link: "https://social.tunecore.com/linkShare?linkid=aW6w-UThLqemmCcaffTThQ"
        },
        {
            id: 5,
            title: "homeNight",
            image: homeNightImg,
            link: "https://social.tunecore.com/linkShare?linkid=GE42QUWmbWZGH1ZcYLrP5Q"
        },
        {
            id: 6,
            title: "WarmWinter",
            image: warmWinterImg,
            link: "https://social.tunecore.com/linkShare?linkid=S0BhC296BC4yx7E7WAjBCA"
        },
        {
            id: 7,
            title: "wayfarer",
            image: wayfarerImg,
            link: "https://social.tunecore.com/linkShare?linkid=-V22ZzKNbLI2k8DA56f9DQ"
        },
        {
            id: 9,
            title: "NightCoffe",
            image: nightCoffeImg,
            link: "https://social.tunecore.com/linkShare?linkid=KOhU9RvrIWFYcKPLnj4qaw"
        },



    ])

    return (
        <>
            <div className="release-container">
                <div className="release-wrapper">
                    {songs.map((song) =>
                        <div className="song-card" key={song.id}>
                            <img src={song.image} alt={song.title} />

                            <a href={song.link} target="_blank" rel="noreferrer" className="song-overlay">
                                Start
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Release;