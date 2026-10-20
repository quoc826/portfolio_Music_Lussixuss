import PortfolioVideo from './PortfolioVideo';
import '../CSS/SoundDesign.css';

function SoundDesign() {
    return (
        <div className="sound-design-container">
            <h1 className="sd-title">Sound Designer</h1>
            <p className="sd-subtitle">Explore the audio remakes and soundscapes</p>
            
            <section className="sd-section">
                <div className="sd-grid">
                    {/* Genshin */}
                    <div className="sd-card">
                        <PortfolioVideo className="sd-video" controls playsInline preload="metadata">
                            <source src="/videoSoundDesin/GAME/genshin.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </PortfolioVideo>
                        <h3>Genshin</h3>
                        <p>Remake of Genshin Impact sound design</p>
                    </div>

                    <div className="sd-card">
                        <PortfolioVideo className="sd-video" controls playsInline preload="metadata" aria-label="I Am Atomic - Sound Redesign">
                            <source src="/videoSoundDesin/GAME/I%20Am%20Atomic%20-%20Sound%20Redesign.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </PortfolioVideo>
                        <h3>I Am Atomic</h3>
                        <p>I Am Atomic - Sound Redesign</p>
                    </div>

                    {/* Wuthering Waves (WWW) */}
                    <div className="sd-card">
                        <PortfolioVideo className="sd-video" controls preload="metadata">
                            <source src="/videoSoundDesin/GAME/ww.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </PortfolioVideo>
                        <h3>Wuthering Waves</h3>
                        <p>Remake of Wuthering Waves sound design</p>
                    </div>

                    {/* LoL */}
                    <div className="sd-card">
                        <PortfolioVideo className="sd-video" controls preload="metadata">
                            <source src="/videoSoundDesin/GAME/LoL.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </PortfolioVideo>
                        <h3>League of Legends</h3>
                        <p>Remake of LoL sound design</p>
                    </div>
                </div>
            </section>

            <section className="sd-section">
                <div className="sd-grid">
                    {/* Frieren */}
                    <div className="sd-card">
                        <PortfolioVideo className="sd-video" controls preload="metadata">
                            <source src="/videoSoundDesin/video/frieren.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </PortfolioVideo>
                        <h3>Frieren</h3>
                        <p>Sound design for Frieren</p>
                    </div>

                    {/* Rurina (Furina?) */}
                    <div className="sd-card">
                        <PortfolioVideo className="sd-video" controls preload="metadata">
                            <source src="/videoSoundDesin/video/rurina.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </PortfolioVideo>
                        <h3>Rurina</h3>
                        <p>Sound design for Rurina</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SoundDesign;
