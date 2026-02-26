import { Link } from "react-router-dom";
import { FaSpotify, FaYoutube, FaSoundcloud, FaApple } from "react-icons/fa";
import "../CSS/Header.css";

function Header() {
    return (
        <header className="header-container">
           
            <div className="Logo">
                <ul>
                    <li>
                        <a href="https://open.spotify.com/artist/3tF1oOHGJrAnPkHSYK3J1w" target="_blank" rel="noreferrer">
                            <FaSpotify size={20} />
                        </a>
                    </li>
                    <li>
                        <a href="https://music.apple.com/us/artist/lussixuss/1788668585" target="_blank" rel="noreferrer">
                            <FaApple size={20} />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.youtube.com/@Lussixuss/videos" target="_blank" rel="noreferrer">
                            <FaYoutube size={20} />
                        </a>
                    </li>
                    <li>
                        <a href="https://soundcloud.com/lussixuss" target="_blank" rel="noreferrer">
                            <FaSoundcloud size={20} />
                        </a>
                    </li>
                </ul>
            </div>

            <div className="Name">
                <h3>Lussixuss</h3>
            </div>

            <div className="Information">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/release">Release</Link></li>
                    <li><Link to="/contact">Infor</Link></li>
                </ul>
            </div>
        </header>
    );
}

export default Header;