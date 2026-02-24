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
import imsoTiredImg from "../assets/imageMusic/imsoTired.jpg";
import ifTheWorldEndsImg from "../assets/imageMusic/ifTheWorldEnds.jpg";
import summerFlowersImg from "../assets/imageMusic/summerFlowers.jpg";
import frierensLoveImg from "../assets/imageMusic/frierensLove.jpg";
import nazettoNoKiboImg from "../assets/imageMusic/nazettoNoKibo.jpg";
import aloneImg from "../assets/imageMusic/alone.jpg";
import pastImg from "../assets/imageMusic/past.jpg";
import maidCoffeeImg from "../assets/imageMusic/maidCoffee.jpg";
import windImg from "../assets/imageMusic/wind.jpg";
import natureImg from "../assets/imageMusic/nature.jpg";
import memoryImg from "../assets/imageMusic/memory.jpg";
import ChildhoodImg from "../assets/imageMusic/Childhood.jpg";
import tempusDreamImg from "../assets/imageMusic/tempusDreamImg.jpg";
import journeyImg from "../assets/imageMusic/journey.jpg";
import trainImg from "../assets/imageMusic/train.jpg";
import endlessDreamImg from "../assets/imageMusic/endlessDream.jpg";
import fantasyImg from "../assets/imageMusic/fantasy.jpg";
import iJustWanttoBeAloneImg from "../assets/imageMusic/iJustWanttoBeAlone.jpg";
import himeImg from "../assets/imageMusic/hime.jpg";



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
        {
            id: 10,
            title: "I'msoTired",
            image: imsoTiredImg,
            link: "https://social.tunecore.com/linkShare?linkid=J5onOn4Qp1Cy19la1EU7nA"
        },
        {
            id: 100,
            title: "IftheWorldEnds",
            image: ifTheWorldEndsImg,
            link: "https://social.tunecore.com/linkShare?linkid=O-puizwiPMfojKSCAxK4kg"
        },
        {
            id: 11,
            title: "SummerFlowers",
            image: summerFlowersImg,
            link: "https://social.tunecore.com/linkShare?linkid=K-GrA2FZ16AaQv34P8u-xA"
        },
        {
            id: 12,
            title: "FrierensLove",
            image: frierensLoveImg,
            link: "https://social.tunecore.com/linkShare?linkid=4gRRBPk8o5SxeYOQJT8LCQ"
        },
        {
            id: 13,
            title: "NazettoNoKibo",
            image: nazettoNoKiboImg,
            link: "https://social.tunecore.com/linkShare?linkid=jRlzp5jOU_gZITpRO_qEHw"
        },
        {
            id: 15,
            title: "Past",
            image: pastImg,
            link: "https://social.tunecore.com/linkShare?linkid=a-t33wlJNx5S5fdpxmYHow"
        },
        {
            id: 16,
            title: "MaidCoffee",
            image: maidCoffeeImg,
            link: "https://social.tunecore.com/linkShare?linkid=fgzKIGPTyeA5-70MlVZJzg"
        },
        {
            id: 17,
            title: "Alone",
            image: aloneImg,
            link: "https://social.tunecore.com/linkShare?linkid=EswdeQu7Oc8_ZeLkznT6uQ"
        },
        {
            id: 18,
            title: "Wind",
            image: windImg,
            link: "https://social.tunecore.com/linkShare?linkid=Z0YL-CfmKRUJ8s3D9PJsVw"
        },
        {
            id: 19,
            title: "Nature",
            image: natureImg,
            link: "https://social.tunecore.com/linkShare?linkid=5B0lWq6bxzuk1mmFdBE_bQ"
        },
        {
            id: 20,
            title: "Memory",
            image: memoryImg,
            link: "https://social.tunecore.com/linkShare?linkid=MX1-R5iF88FPgvAtD24gIQ"
        },
        {
            id: 21,
            title: "Childhood",
            image: ChildhoodImg,
            link: "https://social.tunecore.com/linkShare?linkid=GF2gGI6MYC-nauuazZaCLg"
        },
        {
            id: 22,
            title: "TempusDream",
            image: tempusDreamImg,
            link: "https://social.tunecore.com/linkShare?linkid=uiY5SNgTE6bL8QKFqoUyIA"
        },
        {
            id: 23,
            title: "Journey",
            image: journeyImg,
            link: "https://social.tunecore.com/linkShare?linkid=cjgUBg-BtlCHKNLvUXMNxg"
        },
        {
            id: 24,
            title: "Train",
            image: trainImg,
            link: "https://social.tunecore.com/linkShare?linkid=b9acF9KBZECJW2FRi1NZxg"
        },
        {
            id: 25,
            title: "EndlessDream",
            image: endlessDreamImg,
            link: "https://social.tunecore.com/linkShare?linkid=_VNojT7eroauUaMTJ1m_rw"
        },
        {
            id: 26,
            title: "Fantasy",
            image: fantasyImg,
            link: "https://social.tunecore.com/linkShare?linkid=nCRW0TEeXp1gA-FrCM98bA"
        },
        {
            id: 27,
            title: "IJustWanttoBeAlone",
            image: iJustWanttoBeAloneImg,
            link: "https://social.tunecore.com/linkShare?linkid=GIodo7PBVsYnNtQZv5hbyQ"
        },
        {
            id: 28,
            title: "Hime",
            image: himeImg,
            link: "https://social.tunecore.com/linkShare?linkid=9kNdXkHPo753A_HvIr5igA"
        },
    ])

    return (
        <>
            <div className="release-container">
                <div className="release-wrapper ">
                    {songs.map((song) =>
                        <div className="song-card" key={song.id}>
                            <img className="animate__animated animate__fadeInUp" src={song.image} alt={song.title} />

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