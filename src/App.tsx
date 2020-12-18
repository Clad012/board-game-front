import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MainView from "./views/Main";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <Router>
      <MainView />
    </Router>
  );
}

export default App;
