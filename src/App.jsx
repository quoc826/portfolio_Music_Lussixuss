import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { optimizeCloudinaryUrl } from './cloudinary';
import Header from './component/Header';
import Footer from './component/Footer';
import Home from './component/Home';
import Release from './component/Release';
import ContactForm from './component/Infor';
import Social from './component/Social';
import AdminPanel from './component/AdminPanel';
import './App.css';
import defaultBg from './assets/BgInfor.jpg';

function App() {
  const [loadedBg, setLoadedBg] = useState(defaultBg);
  const [showVideoBg, setShowVideoBg] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "settings", "background"),
      (docSnap) => {
        let targetUrl = defaultBg;
        let isCustom = false;
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.imageUrl) {
            targetUrl = optimizeCloudinaryUrl(data.imageUrl, 1920);
            isCustom = true;
          }
        }

        if (!isCustom) {
          setLoadedBg(defaultBg);
          setShowVideoBg(true);
          return;
        }

        // Pre-load the custom background image
        const img = new Image();
        img.src = targetUrl;
        img.onload = () => {
          setLoadedBg(targetUrl);
          setShowVideoBg(false);
        };
        img.onerror = () => {
          setLoadedBg(defaultBg);
          setShowVideoBg(true);
        };
      },
      (error) => {
        console.error("Firestore background listener error:", error.message);
        setLoadedBg(defaultBg); // Use default background on error
        setShowVideoBg(true);
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      if (showVideoBg) {
        root.style.backgroundImage = "none";
      } else if (loadedBg) {
        root.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${loadedBg})`;
      }
    }
  }, [loadedBg, showVideoBg]);
  return (
    <AuthProvider>
      <div className="app-container">
        {showVideoBg && (
          <>
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="video-background"
            >
              <source src="/lonely-night-train-moewalls-com.mp4" type="video/mp4" />
            </video>
            <div className="video-overlay" />
          </>
        )}
        <Header />
        
        <main className="main-content">
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/release' element={<Release/>} />
            <Route path='/contact' element={<ContactForm />} />
            <Route path='/social' element={<Social />} />
            <Route path='/admin' element={<AdminPanel />} />
          </Routes>
        </main>

        <Footer/>
      </div>
    </AuthProvider>
  )
}

export default App;