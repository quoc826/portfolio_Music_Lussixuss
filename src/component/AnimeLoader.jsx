import "../CSS/AnimeLoader.css";

export default function AnimeLoader() {
    return (
        <div className="anime-loader-container">
            <div className="anime-dot-loader">
                <span className="loader-text">Loading</span>
                <span className="bounce-dot">.</span>
                <span className="bounce-dot">.</span>
                <span className="bounce-dot">.</span>
            </div>
            <p className="anime-loader-subtitle">読み込み中</p>
        </div>
    );
}
