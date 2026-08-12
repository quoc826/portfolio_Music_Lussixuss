import React from 'react';
import '../CSS/SoundDesign.css';

function SoundDesign() {
    return (
        <div className="sound-design-container">
            <h1 className="sd-title">Sound Design</h1>
            <p className="sd-subtitle">Explore the audio remakes and soundscapes</p>
            
            <section className="sd-section">
                <h2 className="sd-section-title">Remake Sound Game</h2>
                <div className="sd-grid">
                    {/* Genshin */}
                    <div className="sd-card">
                        <video className="sd-video" controls preload="metadata">
                            <source src="/videoSoundDesin/GAME/genshin.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <h3>Genshin</h3>
                        <p>Remake of Genshin Impact sound design</p>
                    </div>

                    {/* Saber - Explosion Sound Design */}
                    <div className="sd-card">
                        <video className="sd-video" controls preload="metadata">
                            <source src="/videoSoundDesin/GAME/0812.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <h3>Saber - Explosion</h3>
                        <p>Remake of Saber explosion sound design</p>
                    </div>

                    {/* Wuthering Waves (WWW) */}
                    <div className="sd-card">
                        <video className="sd-video" controls preload="metadata">
                            <source src="/videoSoundDesin/GAME/ww.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <h3>Wuthering Waves</h3>
                        <p>Remake of Wuthering Waves sound design</p>
                    </div>

                    {/* LoL */}
                    <div className="sd-card">
                        <video className="sd-video" controls preload="metadata">
                            <source src="/videoSoundDesin/GAME/LoL.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <h3>League of Legends</h3>
                        <p>Remake of LoL sound design</p>
                    </div>
                </div>
            </section>

            <section className="sd-section">
                <h2 className="sd-section-title">Sound Movie</h2>
                <div className="sd-grid">
                    {/* Frieren */}
                    <div className="sd-card">
                        <video className="sd-video" controls preload="metadata">
                            <source src="/videoSoundDesin/video/frieren.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <h3>Frieren</h3>
                        <p>Sound design for Frieren</p>
                    </div>

                    {/* Rurina (Furina?) */}
                    <div className="sd-card">
                        <video className="sd-video" controls preload="metadata">
                            <source src="/videoSoundDesin/video/rurina.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <h3>Rurina</h3>
                        <p>Sound design for Rurina</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SoundDesign;
