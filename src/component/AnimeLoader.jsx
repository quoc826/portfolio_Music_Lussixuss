import "../CSS/AnimeLoader.css";

export default function AnimeLoader() {
    return (
        <div className="anime-loader-container">
            <dotlottie-wc 
                src="https://lottie.host/a2cd38f3-acc1-445b-9d60-1da06ad0c078/zSjZuNS6MU.lottie" 
                style={{ width: "300px", height: "300px" }} 
                autoplay 
                loop
            />
        </div>
    );
}
