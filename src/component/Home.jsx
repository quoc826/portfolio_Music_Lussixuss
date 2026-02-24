import { useRef, useState } from "react";
import nightImg from "../assets/imageMusic/night.jpg";
import nightAudio from "../assets/audio/nightAudio.mp3";
import 'animate.css';
import "../CSS/Home.css";

function Home() {

    const [song] = useState([
        {
            id: 1,
            title: "Night",
            image: nightImg,
            link: "https://social.tunecore.com/linkShare?linkid=GA6i9wxuXTjXwRTKxaR9_A",
            audio: nightAudio
        }
    ])

    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }

    return (
        <div className="home-container">
            <div className="home-wrapper">
                {song.map((song) => (
                    <div className="home-card" key={song.id}>

                        <div className="img-container  animate__animated animate__backInDown">
                            <img src={song.image} alt={song.title} />
                        </div>

                        <div className="controls-container">

                            <button className="play-btn animate__animated animate__bounceIn" onClick={togglePlay}>
                                {isPlaying ? "⏸" : "▶"}
                            </button>


                            <a href={song.link} target="_blank" rel="noreferrer" className="start-btn">
                                Start
                            </a>

                        </div>

                        <audio ref={audioRef} src={song.audio} loop></audio>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default Home;