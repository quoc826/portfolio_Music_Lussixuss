import { useState, useEffect, useRef } from "react";
import nightImg from "../assets/imageMusic/night.jpg";
import SEOHead from "./SEOHead";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { optimizeCloudinaryUrl } from "../cloudinary";
import 'animate.css';
import "../CSS/Home.css";

// Default fallback data
const DEFAULT_SONG = {
    id: 1,
    title: "Night",
    image: nightImg,
    spotify: "https://open.spotify.com/artist/3tF1oOHGJrAnPkHSYK3J1w",
    appleMusic: "https://music.apple.com/us/artist/lussixuss/1788668585",
    youtubeMusic: "https://music.youtube.com/@Lussixuss",
    soundcloud: "https://soundcloud.com/lussixuss",
};

function Home() {
    const [song, setSong] = useState(DEFAULT_SONG);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // Toggle Play/Pause
    const togglePlay = () => {
        if (!song.audio) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Reset play state and reload track when audio URL changes
    useEffect(() => {
        setIsPlaying(false);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.load();
        }
    }, [song.audio]);

    // Listen to Firestore for real-time updates
    useEffect(() => {
        const unsubscribe = onSnapshot(
            doc(db, "settings", "homeSong"),
            (docSnap) => {
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setSong({
                        id: 1,
                        title: data.title || DEFAULT_SONG.title,
                        image: data.imageUrl ? optimizeCloudinaryUrl(data.imageUrl, 600) : DEFAULT_SONG.image,
                        audio: data.audioUrl || "", // Fetch audioUrl from Firestore
                        spotify: data.spotify || DEFAULT_SONG.spotify,
                        appleMusic: data.appleMusic || DEFAULT_SONG.appleMusic,
                        youtubeMusic: data.youtubeMusic || DEFAULT_SONG.youtubeMusic,
                        soundcloud: data.soundcloud || DEFAULT_SONG.soundcloud,
                    });
                }
            },
            (error) => {
                console.log("Firestore listener error (using defaults):", error.message);
            }
        );
        return () => unsubscribe();
    }, []);

    return (
        <>
            <SEOHead
                title="Lussixuss – Lofi Music Artist | Night Vibes & Chill Beats"
                description="Lussixuss is a lofi music producer creating chill beats, night vibes, and relaxing lo-fi tracks. Listen to Lussixuss Night, Lussixuss Rent, and more on Spotify, Apple Music, YouTube & SoundCloud."
                path="/"
            />
            <div className="home-container">
                <div className="home-wrapper">
                    <article className="home-card" itemScope itemType="https://schema.org/MusicRecording">

                        <div className="img-container animate__animated animate__backInDown" style={{ position: "relative" }}>
                            <img
                                src={song.image}
                                alt={`${song.title} - Lussixuss lofi music track`}
                                itemProp="image"
                                fetchpriority="high"
                                loading="eager"
                                decoding="async"
                            />
                            {isPlaying && (
                                <div className="soundcloud-wave">
                                    {[...Array(45)].map((_, i) => {
                                        const dist = Math.abs(22 - i);
                                        const baseHeight = Math.max(8, 48 - dist * 1.8);
                                        return (
                                            <div 
                                                key={i} 
                                                className="wave-bar" 
                                                style={{
                                                    height: `${baseHeight}px`,
                                                    animationDelay: `${(i % 9) * 0.12}s`,
                                                    animationDuration: `${0.5 + (i % 5) * 0.15}s`
                                                }}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Audio track play control */}
                        {song.audio && (
                            <>
                                <audio ref={audioRef} src={song.audio} loop />
                                <button 
                                    className="play-btn animate__animated animate__zoomIn" 
                                    onClick={togglePlay}
                                    aria-label={isPlaying ? "Pause music" : "Play music"}
                                >
                                    {isPlaying ? "⏸" : "▶"}
                                </button>
                            </>
                        )}

                        <div className="platforms-container animate__animated animate__fadeInUp">
                            {/* Spotify */}
                            <a href={song.spotify} target="_blank" rel="noreferrer" className="platform-btn platform-spotify" aria-label="Listen on Spotify">
                                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                                </svg>
                            </a>

                            {/* Apple Music */}
                            <a href={song.appleMusic} target="_blank" rel="noreferrer" className="platform-btn platform-apple" aria-label="Listen on Apple Music">
                                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043A5.022 5.022 0 0 0 19.7.263C18.96.1 18.21.035 17.45.01 17.176 0 16.9 0 16.627 0H7.37c-.276 0-.55 0-.826.01C5.78.035 5.03.1 4.29.263A5.023 5.023 0 0 0 2.423.89C1.304 1.624.56 2.624.24 3.934a9.23 9.23 0 0 0-.24 2.19C0 6.4 0 6.676 0 6.95v10.1c0 .273 0 .55.01.824.01.756.074 1.51.24 2.252.317 1.31 1.063 2.31 2.183 3.043.493.323 1.036.554 1.617.688.757.164 1.53.236 2.304.26.276.012.552.012.828.012h9.258c.276 0 .55 0 .826-.012.775-.024 1.547-.096 2.304-.26a5.023 5.023 0 0 0 1.617-.688c1.12-.733 1.866-1.733 2.184-3.043.165-.742.228-1.496.24-2.252.01-.274.01-.55.01-.824V6.95c-.002-.274-.002-.55-.012-.826zM17.507 17.81c0 .294-.042.59-.124.872-.343 1.13-1.24 1.834-2.4 1.882-.478.02-.954-.08-1.398-.282-.652-.296-1.306-.59-1.96-.883a.565.565 0 0 1-.364-.527V8.776c0-.2.105-.38.276-.484a.555.555 0 0 1 .56-.04l4.658 2.093c.456.205.752.65.752 1.147v6.318zm-4.11-8.108v-.012l.004.012h-.003z"/>
                                </svg>
                            </a>

                            {/* YouTube Music */}
                            <a href={song.youtubeMusic} target="_blank" rel="noreferrer" className="platform-btn platform-youtube" aria-label="Listen on YouTube Music">
                                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228 18.228 15.432 18.228 12 15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z"/>
                                </svg>
                            </a>

                            {/* SoundCloud */}
                            <a href={song.soundcloud} target="_blank" rel="noreferrer" className="platform-btn platform-soundcloud" aria-label="Listen on SoundCloud">
                                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.06-.05-.1-.1-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.172 1.308c.013.06.045.094.104.094.057 0 .09-.038.103-.094l.2-1.308-.2-1.332c-.013-.057-.046-.094-.103-.094m1.8-1.143c-.066 0-.108.046-.114.11l-.2 2.46.2 2.395c.006.06.048.106.114.106.064 0 .107-.046.114-.11l.227-2.39-.227-2.46c-.007-.065-.05-.11-.114-.11m.88-.348c-.069 0-.116.047-.12.115l-.178 2.81.178 2.61c.004.07.051.115.12.115s.116-.045.12-.115l.2-2.61-.2-2.81c-.004-.068-.051-.115-.12-.115m.9-.182c-.074 0-.123.05-.127.122l-.157 2.99.157 2.735c.004.074.053.122.127.122.073 0 .122-.048.127-.122l.177-2.735-.177-2.99c-.005-.072-.054-.122-.127-.122m.905-.132c-.08 0-.13.054-.136.131l-.138 3.12.138 2.785c.006.08.056.131.136.131.078 0 .129-.051.135-.131l.156-2.785-.156-3.12c-.006-.077-.057-.131-.135-.131m.906-.12c-.085 0-.139.058-.143.14l-.12 3.24.12 2.826c.004.084.058.14.143.14.083 0 .138-.056.143-.14l.136-2.826-.136-3.24c-.005-.082-.06-.14-.143-.14m.917-.032c-.088 0-.145.06-.148.148l-.104 3.272.104 2.847c.003.088.06.148.148.148.086 0 .145-.06.148-.148l.118-2.847-.118-3.272c-.003-.088-.062-.148-.148-.148m.92.009c-.093 0-.15.064-.154.155l-.088 3.263.088 2.847c.004.09.061.155.154.155.09 0 .15-.065.154-.155l.1-2.847-.1-3.263c-.005-.09-.064-.155-.155-.155m.924.077c-.096 0-.157.067-.16.163l-.072 3.186.072 2.837c.003.096.064.163.16.163.094 0 .157-.067.16-.163l.082-2.837-.082-3.186c-.003-.096-.066-.163-.16-.163m.94.007c-.1 0-.163.07-.167.17l-.06 3.18.06 2.82c.004.1.067.17.168.17.098 0 .163-.07.167-.17l.068-2.82-.068-3.18c-.004-.1-.069-.17-.168-.17m.937-.068c-.104 0-.17.074-.174.178l-.044 3.247.044 2.81c.004.104.07.178.174.178.103 0 .17-.074.174-.178l.05-2.81-.05-3.247c-.004-.104-.07-.178-.174-.178m.942-.023c-.11 0-.177.078-.18.187l-.03 3.27.03 2.79c.003.11.07.187.18.187.108 0 .177-.077.18-.187l.034-2.79-.034-3.27c-.003-.11-.072-.187-.18-.187m.948.005c-.114 0-.183.08-.186.194l-.017 3.265.017 2.78c.003.114.072.194.186.194.112 0 .182-.08.186-.194l.02-2.78-.02-3.265c-.004-.114-.074-.194-.186-.194m1.68.471c-.39 0-.76.07-1.1.2-.23-2.61-2.44-4.65-5.13-4.65-1.32 0-2.52.51-3.42 1.35-.34.31-.54.76-.54 1.22v8.04c.01.45.38.81.84.82h9.35c1.98 0 3.58-1.6 3.58-3.58s-1.6-3.58-3.58-3.58"/>
                                </svg>
                            </a>
                        </div>

                        <meta itemProp="name" content={`${song.title} - Lussixuss`} />
                        <meta itemProp="byArtist" content="Lussixuss" />
                        <meta itemProp="genre" content="Lofi" />
                    </article>
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