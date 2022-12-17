import "./App.css";
import Navbar from "./Components/Navbar";
import Notestate from "./context/notes/Notestate";
// import notestate from './context/notes/notestate';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./Components/About";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
function App() {
  return (
    <>
      <Notestate>
        <Router>
          <Navbar />

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </Notestate>
    </>
  );
}

export default App;
