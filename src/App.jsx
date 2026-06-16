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

function App() {
  const [bgUrl, setBgUrl] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "settings", "background"), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.imageUrl) {
          // Optimize background to 1920px max width to load fast
          setBgUrl(optimizeCloudinaryUrl(data.imageUrl, 1920));
        } else {
          setBgUrl("");
        }
      } else {
        setBgUrl("");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      if (bgUrl) {
        root.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${bgUrl})`;
      } else {
        root.style.backgroundImage = ""; // Revert to CSS default
      }
    }
  }, [bgUrl]);
  return (
    <AuthProvider>
      <div className="app-container">
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