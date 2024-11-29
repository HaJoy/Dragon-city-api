import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from "./layout/Navbar";
import Home from "./layout/Home"
import Dragons from "./layout/Dragons";
import Docs from "./layout/Docs";


function App() {


  return (
    <Router>
      
      <Navbar />
      <div className='container'>
        
        
        
        <Routes>
          {/* <Route path='*' element={<Error/>} /> */}
          <Route path='/' element={<Home />} />
          <Route path='/dragons' element={<Dragons />} />
          <Route path='/docs' element={<Docs />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
