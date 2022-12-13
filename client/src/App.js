import React from 'react';
import Navbar from './Components/Navbar';
import AnimatedRoutes from './Components/AnimatedRoutes';
import { BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import './Components/Footer.css'


function App() {
 
  return (
    <div className="App">
      <Router>
      <Navbar />      
        <AnimatedRoutes/>
      </Router>
    </div>
  );
}

export default App;
