import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Home, BlogList, Blog } from "./Home";
import { Register, Login, } from "./Container";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route exact path="/register"
            element={<Register />} />

          <Route exact path="/login"
            element={<Login />} />

          <Route path="/"
            element={
              <PrivateRoutes><Home /></PrivateRoutes>
            } />

          <Route path="/blogs"
            element={
              <PrivateRoutes><BlogList /></PrivateRoutes>
            } />

          <Route path="/blogs/:id"
            element={
              <PrivateRoutes><Blog /></PrivateRoutes>
            } />

        </Routes>
      </Router>
    </div>
  );
}


function PrivateRoutes({
  children,
  ...rest
}) {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
}

export default App;
