import { Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import Home from './component/Home';
import Release from './component/Release';
import ContactForm from './component/Infor'; // Thay đổi theo tên file của bạn
import './App.css'; // Import file CSS tổng

function App() {
  return (
    <div className="app-container">
      <Header />
      
      <main className="main-content">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/release' element={<Release/>} />
          <Route path='/contact' element={<ContactForm />} />
        </Routes>
      </main>

      <Footer/>
    </div>
  )
}

export default App;