import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Signup from './pages/Signup/Signup'
import './App.css';

function App() {
  return (
    <Router className="App">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
