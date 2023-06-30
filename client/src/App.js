import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Login from './components/Login';
import Form from "./components/Form";
import Admin from "./components/Admin";


function App() {
  return (
    <div className="App">
    
    <Router>
            
            

            <div className="container">
              <Routes>
                
                <Route path="/" element={<Login />} />
                <Route path="/form" element={<Form />} />
                
                <Route path="/admin" element={<Admin />} />
                
                
                
                

              </Routes>
            </div>
          </Router>
          
          
      
    </div>
  );
}

export default App;
