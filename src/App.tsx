import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MainView from "./views/Main";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <Router>
      <MainView />
      <footer className="footer">
        <div className="container">
          <span className="text-muted">
            Made with 💛 By{" "}
            <a href="https://achraf-chaibi.tn/">Achraf Chaibi</a> .
          </span>
        </div>
      </footer>
    </Router>
  );
}

export default App;
