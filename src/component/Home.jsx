import { useRef, useState } from "react";
import nightImg from "../assets/imageMusic/night.jpg";
import nightAudio from "../assets/audio/nightAudio.mp3";
import SEOHead from "./SEOHead";
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
        <>
            <SEOHead
                title="Lussixuss – Lofi Music Artist | Night Vibes & Chill Beats"
                description="Lussixuss is a lofi music producer creating chill beats, night vibes, and relaxing lo-fi tracks. Listen to Lussixuss Night, Lussixuss Rent, and more on Spotify, Apple Music, YouTube & SoundCloud."
                path="/"
            />
            <div className="home-container">
                <div className="home-wrapper">
                    {song.map((song) => (
                        <article className="home-card" key={song.id} itemScope itemType="https://schema.org/MusicRecording">

                            <div className="img-container  animate__animated animate__backInDown">
                                <img 
                                    src={song.image} 
                                    alt={`${song.title} - Lussixuss lofi music track`} 
                                    itemProp="image" 
                                    fetchpriority="high"
                                    loading="eager"
                                    decoding="async"
                                />
                            </div>

                            <div className="controls-container">

                                <button className="play-btn animate__animated animate__bounceIn" onClick={togglePlay} aria-label={`Play ${song.title} by Lussixuss`}>
                                    {isPlaying ? "⏸" : "▶"}
                                </button>


                                <a href={song.link} target="_blank" rel="noreferrer" className="start-btn" itemProp="url" aria-label={`Stream ${song.title} by Lussixuss on all platforms`}>
                                    Start
                                </a>

                            </div>

                            <meta itemProp="name" content={`${song.title} - Lussixuss`} />
                            <meta itemProp="byArtist" content="Lussixuss" />
                            <meta itemProp="genre" content="Lofi" />
                            <audio ref={audioRef} src={song.audio} loop></audio>
                        </article>
                    ))}
                </div>

                {/* SEO Content - hidden visually, readable by search engines */}
                <section className="sr-only" aria-label="About Lussixuss">
                    <h1>Lussixuss – Lofi Music Artist</h1>
                    <p>
                        Lussixuss is a lofi music producer and artist known for creating
                        relaxing night vibes and chill beats. Discover tracks like Lussixuss Night,
                        Lussixuss Rent, and more dreamy lo-fi soundscapes perfect for studying,
                        relaxing, and late-night listening sessions.
                    </p>
                    <p>
                        Stream Lussixuss music on Spotify, Apple Music, YouTube, and SoundCloud.
                    </p>
                </section>
            </div>
        </>
    );
}


export default Home;